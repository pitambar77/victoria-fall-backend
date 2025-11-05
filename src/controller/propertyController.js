import Property from "../models/Property.js";
import cloudinary from "../config/cloudinary.js";

// Create property
export const createProperty = async (req, res) => {
  try {
    const { 
      name,
      shortTitle,
  propertyType,
      overview,
      subDescription,
      address1,
      address2,
      checkIn,
      checkOut,
      contactNumber,
      priceperPerson,
      facilities, // ✅ handle facilities from JSON string if sent
     } = req.body;
    const bannerImage = req.files?.bannerImage?.[0]?.path;
    const galleryImages = req.files?.galleryImages?.map((file) => file.path) || [];

    const property = new Property({
      name,
         shortTitle,
  propertyType,
      overview,
      subDescription,
      address1,
      address2,
      checkIn,
      checkOut,
      contactNumber,
      priceperPerson,
    
      bannerImage,
      galleryImages,
      facilities: facilities ? JSON.parse(facilities) : [],
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.files?.bannerImage?.[0]) {
      updateData.bannerImage = req.files.bannerImage[0].path;
    }
    if (req.files?.galleryImages) {
      updateData.galleryImages = req.files.galleryImages.map((file) => file.path);
    }
// facilites add here
    if (updateData.facilities) {
      updateData.facilities = JSON.parse(updateData.facilities);
    }

    const property = await Property.findByIdAndUpdate(id, updateData, { new: true });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add facility
// export const addFacility = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     property.facilities.push(req.body);
//     await property.save();
//     res.json(property);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Add facility
export const addFacility = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.facilities.push(req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    console.error("Error adding facility:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete facility

export const deleteFacility = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.facilities.id(req.params.facilityId)?.deleteOne();
    await property.save();
    res.json(property);
  } catch (error) {
    console.error("Error deleting facility:", error);
    res.status(500).json({ message: error.message });
  }

  
}