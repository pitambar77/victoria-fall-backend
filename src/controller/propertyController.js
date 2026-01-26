

// new working code

import Property from "../models/Property.js";
import cloudinary from "../config/cloudinary.js";

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return filename.split(".")[0];
};


/* ================= CREATE PROPERTY ================= */
export const createProperty = async (req, res) => {
  try {
    const {
      name,
      shortTitle,
      propertyType,
      overviewTittle,
      overview,
      subDescription,
      address1,
      address2,
      checkIn,
      checkOut,
      contactNumber,
      priceperPerson,
      map, // ✅ TEXT VALUE
      faqs,
    } = req.body;

    const bannerImage = req.files?.bannerImage?.[0]?.path || "";
    const overviewImage = req.files?.overviewImage?.[0]?.path || "";
    const galleryImages =
      req.files?.galleryImages?.map((file) => file.path) || [];

    const property = new Property({
      name,
      shortTitle,
      propertyType,
      overviewTittle,
      overview,
      subDescription,
      address1,
      address2,
      checkIn,
      checkOut,
      contactNumber,
      priceperPerson,
      map, // ✅ TEXT VALUE
      bannerImage,
      overviewImage,
      galleryImages,
      // facilities: facilities ? JSON.parse(facilities) : [],
      faqs: faqs ? JSON.parse(faqs) : [],
      facilities: [], // ✅ ALWAYS EMPTY HERE

    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error("Create Property Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL PROPERTIES ================= */
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET PROPERTY BY ID ================= */
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET PROPERTY BY SLUG (SEO) ================= */
export const getPropertyBySlug = async (req, res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug });
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE PROPERTY ================= */
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Images
    if (req.files?.bannerImage?.[0]) {
      updateData.bannerImage = req.files.bannerImage[0].path;
    }

    if (req.files?.overviewImage?.[0]) {
      updateData.overviewImage = req.files.overviewImage[0].path;
    }

    if (req.files?.galleryImages) {
      updateData.galleryImages = req.files.galleryImages.map(
        (file) => file.path
      );
    }

    // JSON fields
    if (updateData.facilities) {
      updateData.facilities = JSON.parse(updateData.facilities);
    }

    if (updateData.faqs) {
      updateData.faqs = JSON.parse(updateData.faqs);
    }

    const property = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (error) {
    console.error("Update Property Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE PROPERTY ================= */
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADD FACILITY ================= */
// export const addFacility = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     if (!property)
//       return res.status(404).json({ message: "Property not found" });

//     property.facilities.push(req.body);
//     await property.save();

//     res.json(property);
//   } catch (error) {
//     console.error("Add Facility Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
export const addFacility = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const facility = {
      facilityName: req.body.facilityName,
      icon: req.file ? req.file.path : "", // ✅ IMAGE URL
    };



    property.facilities.push(facility);
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE FACILITY ================= */
export const updateFacility = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const facility = property.facilities.id(req.params.facilityId);
    if (!facility)
      return res.status(404).json({ message: "Facility not found" });

    if (req.body.facilityName) {
      facility.facilityName = req.body.facilityName;
    }

    if (req.file) {
      // delete old icon
      if (facility.icon) {
        const oldPublicId = getPublicIdFromUrl(facility.icon);
        await cloudinary.uploader.destroy(oldPublicId);
      }
      facility.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    console.error("Update Facility Error:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================= DELETE FACILITY ================= */
// export const deleteFacility = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     if (!property)
//       return res.status(404).json({ message: "Property not found" });

//     property.facilities.id(req.params.facilityId)?.deleteOne();
//     await property.save();

//     res.json(property);
//   } catch (error) {
//     console.error("Delete Facility Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
export const deleteFacility = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const facility = property.facilities.id(req.params.facilityId);
    if (!facility)
      return res.status(404).json({ message: "Facility not found" });

    // Optional: delete icon from cloudinary
    if (facility.icon) {
      const publicId = facility.icon.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    facility.deleteOne();
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE Gallery Images ================= */
export const removeGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Remove from DB
    property.galleryImages = property.galleryImages.filter(
      (img) => img !== image
    );

    // Remove from Cloudinary
    const publicId = getPublicIdFromUrl(image);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await property.save();
    res.json(property);
  } catch (error) {
    console.error("Remove gallery image error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= Add Single single Gallery Images ================= */
export const addGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // push single image
    property.galleryImages.push(req.file.path);
    await property.save();

    res.json(property);
  } catch (error) {
    console.error("Add gallery image error:", error);
    res.status(500).json({ message: error.message });
  }
};


