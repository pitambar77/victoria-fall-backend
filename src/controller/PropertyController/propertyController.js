import Property from "../../models/PropertyModel/Property.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create property
export const createProperty = async (req, res) => {
  try {
    // multer puts files on req.files and req.file
    // We expect:
    // - bannerImage: single file field named "bannerImage"
    // - gallery: multiple files field named "gallery" (0..n)
    // Other form fields in req.body
    const {
      name,
      subDescription,
      overviewContent,
      description,
      propertyType,
      checkIn,
      checkOut,
      address1,
      address2,
      services // expected as JSON string or comma-separated
    } = req.body;

    if (!name) return res.status(400).json({ message: "Property name is required" });

    const bannerImage = req.files && req.files["bannerImage"] ? req.files["bannerImage"][0].filename : undefined;
    const gallery = (req.files && req.files["gallery"]) ? req.files["gallery"].map(f => f.filename) : [];

    // parse services (allow JSON array, comma-separated, or single string)
    let servicesArr = [];
    if (services) {
      if (typeof services === "string") {
        try {
          const parsed = JSON.parse(services);
          if (Array.isArray(parsed)) servicesArr = parsed;
          else servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
        } catch {
          servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(services)) {
        servicesArr = services;
      }
    }

    const prop = new Property({
      name,
      subDescription,
      overviewContent,
      description,
      propertyType,
      checkIn,
      checkOut,
      bannerImage: bannerImage ? `/uploads/${bannerImage}` : undefined,
      address: { address1, address2 },
      gallery: gallery.map(f => `/uploads/${f}`),
      services: servicesArr
    });

    const saved = await prop.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all properties (with basic pagination)
export const getProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "20");
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Property.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      Property.countDocuments().exec(),
    ]);

    return res.json({ items, total, page, limit });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    return res.json(prop);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update property (supports new uploads for banner and gallery)
export const updateProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });

    const {
      name,
      subDescription,
      overviewContent,
      description,
      propertyType,
      checkIn,
      checkOut,
      address1,
      address2,
      services,
      removeGallery // optional array of filenames to remove from gallery (expects JSON array or CSV)
    } = req.body;

    if (name) prop.name = name;
    if (subDescription) prop.subDescription = subDescription;
    if (overviewContent) prop.overviewContent = overviewContent;
    if (description) prop.description = description;
    if (propertyType) prop.propertyType = propertyType;
    if (checkIn) prop.checkIn = checkIn;
    if (checkOut) prop.checkOut = checkOut;

    if (address1 !== undefined) prop.address.address1 = address1;
    if (address2 !== undefined) prop.address.address2 = address2;

    // services parsing same as create
    if (services !== undefined) {
      let servicesArr = [];
      if (typeof services === "string") {
        try {
          const parsed = JSON.parse(services);
          if (Array.isArray(parsed)) servicesArr = parsed;
          else servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
        } catch {
          servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(services)) {
        servicesArr = services;
      }
      prop.services = servicesArr;
    }

    // file uploads
    if (req.files && req.files["bannerImage"]) {
      const bannerFilename = req.files["bannerImage"][0].filename;
      prop.bannerImage = `/uploads/${bannerFilename}`;
    }
    if (req.files && req.files["gallery"]) {
      // append new gallery images
      const newFiles = req.files["gallery"].map(f => `/uploads/${f.filename}`);
      prop.gallery = (prop.gallery || []).concat(newFiles);
    }

    // removeGallery handling (optional)
    if (removeGallery) {
      let removal = [];
      if (typeof removeGallery === "string") {
        try {
          const parsed = JSON.parse(removeGallery);
          if (Array.isArray(parsed)) removal = parsed;
          else removal = removeGallery.split(",").map(s => s.trim()).filter(Boolean);
        } catch {
          removal = removeGallery.split(",").map(s => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(removeGallery)) {
        removal = removeGallery;
      }

      if (removal.length > 0) {
        prop.gallery = (prop.gallery || []).filter(img => !removal.includes(img));
      }
    }

    const updated = await prop.save();
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const prop = await Property.findByIdAndDelete(req.params.id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    return res.json({ message: "Property deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
