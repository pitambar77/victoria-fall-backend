// import Property from "../../models/PropertyModel/Property.js";

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create property
// export const createProperty = async (req, res) => {
//   try {
//     // multer puts files on req.files and req.file
//     // We expect:
//     // - bannerImage: single file field named "bannerImage"
//     // - gallery: multiple files field named "gallery" (0..n)
//     // Other form fields in req.body
//     const {
//       name,
//       subDescription,
//       overviewContent,
//       description,
//       propertyType,
//       checkIn,
//       checkOut,
//       address1,
//       address2,
//       services // expected as JSON string or comma-separated
//     } = req.body;

//     if (!name) return res.status(400).json({ message: "Property name is required" });

//     const bannerImage = req.files && req.files["bannerImage"] ? req.files["bannerImage"][0].filename : undefined;
//     const gallery = (req.files && req.files["gallery"]) ? req.files["gallery"].map(f => f.filename) : [];

//     // parse services (allow JSON array, comma-separated, or single string)
//     let servicesArr = [];
//     if (services) {
//       if (typeof services === "string") {
//         try {
//           const parsed = JSON.parse(services);
//           if (Array.isArray(parsed)) servicesArr = parsed;
//           else servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
//         } catch {
//           servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
//         }
//       } else if (Array.isArray(services)) {
//         servicesArr = services;
//       }
//     }

//     const prop = new Property({
//       name,
//       subDescription,
//       overviewContent,
//       description,
//       propertyType,
//       checkIn,
//       checkOut,
//       bannerImage: bannerImage ? `/uploads/${bannerImage}` : undefined,
//       address: { address1, address2 },
//       gallery: gallery.map(f => `/uploads/${f}`),
//       services: servicesArr
//     });

//     const saved = await prop.save();
//     return res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Get all properties (with basic pagination)
// export const getProperties = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page || "1");
//     const limit = parseInt(req.query.limit || "20");
//     const skip = (page - 1) * limit;

//     const [items, total] = await Promise.all([
//       Property.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
//       Property.countDocuments().exec(),
//     ]);

//     return res.json({ items, total, page, limit });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const getPropertyById = async (req, res) => {
//   try {
//     const prop = await Property.findById(req.params.id);
//     if (!prop) return res.status(404).json({ message: "Property not found" });
//     return res.json(prop);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Update property (supports new uploads for banner and gallery)
// export const updateProperty = async (req, res) => {
//   try {
//     const prop = await Property.findById(req.params.id);
//     if (!prop) return res.status(404).json({ message: "Property not found" });

//     const {
//       name,
//       subDescription,
//       overviewContent,
//       description,
//       propertyType,
//       checkIn,
//       checkOut,
//       address1,
//       address2,
//       services,
//       removeGallery // optional array of filenames to remove from gallery (expects JSON array or CSV)
//     } = req.body;

//     if (name) prop.name = name;
//     if (subDescription) prop.subDescription = subDescription;
//     if (overviewContent) prop.overviewContent = overviewContent;
//     if (description) prop.description = description;
//     if (propertyType) prop.propertyType = propertyType;
//     if (checkIn) prop.checkIn = checkIn;
//     if (checkOut) prop.checkOut = checkOut;

//     if (address1 !== undefined) prop.address.address1 = address1;
//     if (address2 !== undefined) prop.address.address2 = address2;

//     // services parsing same as create
//     if (services !== undefined) {
//       let servicesArr = [];
//       if (typeof services === "string") {
//         try {
//           const parsed = JSON.parse(services);
//           if (Array.isArray(parsed)) servicesArr = parsed;
//           else servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
//         } catch {
//           servicesArr = services.split(",").map(s => s.trim()).filter(Boolean);
//         }
//       } else if (Array.isArray(services)) {
//         servicesArr = services;
//       }
//       prop.services = servicesArr;
//     }

//     // file uploads
//     if (req.files && req.files["bannerImage"]) {
//       const bannerFilename = req.files["bannerImage"][0].filename;
//       prop.bannerImage = `/uploads/${bannerFilename}`;
//     }
//     if (req.files && req.files["gallery"]) {
//       // append new gallery images
//       const newFiles = req.files["gallery"].map(f => `/uploads/${f.filename}`);
//       prop.gallery = (prop.gallery || []).concat(newFiles);
//     }

//     // removeGallery handling (optional)
//     if (removeGallery) {
//       let removal = [];
//       if (typeof removeGallery === "string") {
//         try {
//           const parsed = JSON.parse(removeGallery);
//           if (Array.isArray(parsed)) removal = parsed;
//           else removal = removeGallery.split(",").map(s => s.trim()).filter(Boolean);
//         } catch {
//           removal = removeGallery.split(",").map(s => s.trim()).filter(Boolean);
//         }
//       } else if (Array.isArray(removeGallery)) {
//         removal = removeGallery;
//       }

//       if (removal.length > 0) {
//         prop.gallery = (prop.gallery || []).filter(img => !removal.includes(img));
//       }
//     }

//     const updated = await prop.save();
//     return res.json(updated);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Delete property
// export const deleteProperty = async (req, res) => {
//   try {
//     const prop = await Property.findByIdAndDelete(req.params.id);
//     if (!prop) return res.status(404).json({ message: "Property not found" });
//     return res.json({ message: "Property deleted" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

//========================================================================================================================

import slugify from "slugify";
import Property from "../../models/PropertyModel/PropertySchema.js";
import cloudinary from "../../config/cloudinary.js";

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return filename.split(".")[0];
};

// export const createProperty = async (req, res) => {
//   try {
//     const property = new Property(req.body);

//     await property.save();

//     res.status(201).json(property);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createProperty = async (req, res) => {
  try {
    const data = req.body.property ? JSON.parse(req.body.property) : req.body;

    // AUTO SLUG
    data.slug = slugify(data.overview?.title || "property", {
      lower: true,
      strict: true,
    });

    /* =====================
       HIGHLIGHTS
    ===================== */

    if (req.files?.highlightIcons) {
      data.highlights = data.highlights.map((h, i) => ({
        ...h,
        icon: req.files.highlightIcons[i]?.path || "",
      }));
    }

    /* =====================
       GALLERY
    ===================== */

    if (req.files?.galleryImages) {
      data.gallery = data.gallery.map((g, i) => ({
        ...g,
        image: req.files.galleryImages[i]?.path || "",
      }));
    }

    /* =====================
       ROOMS
    ===================== */

    if (req.files?.roomIcons) {
      data.rooms = data.rooms.map((r, i) => ({
        ...r,
        icon: req.files.roomIcons[i]?.path || "",
      }));
    }


  /* =====================
   BATHROOM DETAILS
===================== */

if (req.files?.bathroomIcons) {

  let index = 0;

  data.bathrooms = data.bathrooms.map((bath) => ({

    ...bath,

    bathdetails: bath.bathdetails.map((detail) => ({
      ...detail,
      icon: req.files.bathroomIcons[index++]?.path || ""
    }))

  }));

}

    /* =====================
       SPACE
    ===================== */

    if (req.files?.spaceIcons) {
      data.space = data.space.map((s, i) => ({
        ...s,
        icon: req.files.spaceIcons[i]?.path || "",
      }));
    }

    /* =====================
       AMENITIES
    ===================== */

    if (req.files?.amenityIcons) {
      let index = 0;

      data.aminities.basic = data.aminities.basic.map((a) => ({
        ...a,
        icon: req.files.amenityIcons[index++]?.path || "",
      }));

      data.aminities.additional = data.aminities.additional.map((a) => ({
        ...a,
        icon: req.files.amenityIcons[index++]?.path || "",
      }));
    }

    /* =====================
   AREA ACTIVITIES
===================== */

    if (req.files?.activityIcons) {
      data.area.relatedactivity = data.area.relatedactivity.map((a, i) => ({
        ...a,
        icon: req.files.activityIcons[i]?.path || "",
      }));
    }

    /* =====================
       HOUSE RULES
    ===================== */

    if (req.files?.ruleIcons) {
      data.houserule.rule = data.houserule.rule.map((r, i) => ({
        ...r,
        icon: req.files.ruleIcons[i]?.path || "",
      }));
    }

    const property = new Property(data);

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const addOverviewBlock = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.overview.description.push(req.body);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOverviewMeta = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.overview.title = req.body.title || property.overview.title;

    property.overview.subTitle =
      req.body.subTitle || property.overview.subTitle;

    property.overview.landingsubcontent =
      req.body.landingsubcontent || property.overview.landingsubcontent;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOverview = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.overview = req.body.overview;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOverviewBlock = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.overview.description.id(req.params.blockId)?.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addHighlight = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const highlight = {
      icon: req.file ? req.file.path : "",
      title: req.body.title,
      description: req.body.description,
    };

    property.highlights.push(highlight);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHighlight = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const highlight = property.highlights.id(req.params.highlightId);

    if (!highlight)
      return res.status(404).json({ message: "Highlight not found" });

    highlight.title = req.body.title || highlight.title;
    highlight.description = req.body.description || highlight.description;

    if (req.file) {
      if (highlight.icon) {
        const publicId = getPublicIdFromUrl(highlight.icon);
        await cloudinary.uploader.destroy(publicId);
      }

      highlight.icon = req.file.path;
    }

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHighlight = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const highlight = property.highlights.id(req.params.highlightId);

    if (!highlight)
      return res.status(404).json({ message: "Highlight not found" });

    if (highlight.icon) {
      const publicId = getPublicIdFromUrl(highlight.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    highlight.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const image = {
      image: req.file.path,
      imageName: req.body.imageName,
      imageCategory: req.body.imageCategory,
    };

    property.gallery.push(image);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGalleryImage = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const image = property.gallery.id(req.params.imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    image.imageName = req.body.imageName || image.imageName;
    image.imageCategory = req.body.imageCategory || image.imageCategory;

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const image = property.gallery.id(req.params.imageId);

    if (!image) return res.status(404).json({ message: "Image not found" });

    const publicId = getPublicIdFromUrl(image.image);

    await cloudinary.uploader.destroy(publicId);

    image.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    for (const image of property.gallery) {
      const publicId = getPublicIdFromUrl(image.image);
      await cloudinary.uploader.destroy(publicId);
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBasicAmenity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const amenity = {
      icon: req.file ? req.file.path : "",
      aminityName: req.body.aminityName,
    };

    property.aminities.basic.push(amenity);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBasicAmenity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const amenity = property.aminities.basic.id(req.params.amenityId);
    if (!amenity) return res.status(404).json({ message: "Amenity not found" });

    amenity.aminityName = req.body.aminityName || amenity.aminityName;

    if (req.file) {
      if (amenity.icon) {
        const publicId = getPublicIdFromUrl(amenity.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      amenity.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBasicAmenity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const amenity = property.aminities.basic.id(req.params.amenityId);

    if (amenity.icon) {
      const publicId = getPublicIdFromUrl(amenity.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    amenity.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAdditionalAmenity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const amenity = {
      icon: req.file ? req.file.path : "",
      aminityName: req.body.aminityName,
    };

    property.aminities.additional.push(amenity);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdditionalAmenity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const amenity = property.aminities.additional.id(req.params.amenityId);
    if (!amenity) return res.status(404).json({ message: "Amenity not found" });

    amenity.aminityName = req.body.aminityName || amenity.aminityName;

    if (req.file) {
      if (amenity.icon) {
        const publicId = getPublicIdFromUrl(amenity.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      amenity.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdditionalAmenity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const amenity = property.aminities.additional.id(req.params.amenityId);

    if (!amenity) return res.status(404).json({ message: "Amenity not found" });

    if (amenity.icon) {
      const publicId = getPublicIdFromUrl(amenity.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    amenity.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRelatedActivity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const activity = {
      icon: req.file ? req.file.path : "",
      title: req.body.title,
      shortDescription: req.body.shortDescription,
    };

    property.area.relatedactivity.push(activity);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRelatedActivity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const activity = property.area.relatedactivity.id(req.params.activityId);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    activity.title = req.body.title || activity.title;
    activity.shortDescription =
      req.body.shortDescription || activity.shortDescription;

    if (req.file) {
      if (activity.icon) {
        const publicId = getPublicIdFromUrl(activity.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      activity.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRelatedActivity = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const activity = property.area.relatedactivity.id(req.params.activityId);

    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    if (activity.icon) {
      const publicId = getPublicIdFromUrl(activity.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    activity.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRoom = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const room = {
      bedroomName: req.body.bedroomName,
      bed: req.body.bed,
      icon: req.file ? req.file.path : "",
    };

    property.rooms.push(room);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const room = property.rooms.id(req.params.roomId);

    if (!room) return res.status(404).json({ message: "Room not found" });

    room.bedroomName = req.body.bedroomName || room.bedroomName;
    room.bed = req.body.bed || room.bed;

    if (req.file) {
      if (room.icon) {
        const publicId = getPublicIdFromUrl(room.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      room.icon = req.file.path;
    }

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const room = property.rooms.id(req.params.roomId);

    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.icon) {
      const publicId = getPublicIdFromUrl(room.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    room.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const addBathroom = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     const bathroom = {
//       bathName: req.body.bathName,
//       name: req.body.name,
//       icon: req.file ? req.file.path : "",
//     };

//     property.bathrooms.push(bathroom);

//     await property.save();

//     res.json(property);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const addBathroom = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const bathroom = {
      bathName: req.body.bathName,
      bathdetails: []
    };

    property.bathrooms.push(bathroom);

    await property.save();

    res.json(property);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBathroomDetail = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    const bathroom = property.bathrooms.id(req.params.bathroomId);

    if (!bathroom)
      return res.status(404).json({ message: "Bathroom not found" });

    const detail = {
      name: req.body.name,
      icon: req.file ? req.file.path : ""
    };

    bathroom.bathdetails.push(detail);

    await property.save();

    res.json(property);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBathroom = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const bathroom = property.bathrooms.id(req.params.bathroomId);
    if (!bathroom)
      return res.status(404).json({ message: "Bathroom not found" });

    bathroom.bathName = req.body.bathName || bathroom.bathName;
    bathroom.name = req.body.name || bathroom.name;

    if (req.file) {
      if (bathroom.icon) {
        const publicId = getPublicIdFromUrl(bathroom.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      bathroom.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBathroomDetail = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    const bathroom = property.bathrooms.id(req.params.bathroomId);

    if (!bathroom)
      return res.status(404).json({ message: "Bathroom not found" });

    const detail = bathroom.bathdetails.id(req.params.detailId);

    if (!detail)
      return res.status(404).json({ message: "Detail not found" });

    detail.name = req.body.name || detail.name;

    if (req.file) {

      if (detail.icon) {
        const publicId = getPublicIdFromUrl(detail.icon);
        await cloudinary.uploader.destroy(publicId);
      }

      detail.icon = req.file.path;
    }

    await property.save();

    res.json(property);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBathroom = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const bathroom = property.bathrooms.id(req.params.bathroomId);

    if (!bathroom)
      return res.status(404).json({ message: "Bathroom not found" });

    if (bathroom.icon) {
      const publicId = getPublicIdFromUrl(bathroom.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    bathroom.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBathroomDetail = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    const bathroom = property.bathrooms.id(req.params.bathroomId);

    const detail = bathroom.bathdetails.id(req.params.detailId);

    if (!detail)
      return res.status(404).json({ message: "Detail not found" });

    if (detail.icon) {
      const publicId = getPublicIdFromUrl(detail.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    detail.deleteOne();

    await property.save();

    res.json(property);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addSpace = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const space = {
      icon: req.file ? req.file.path : "",
      title: req.body.title,
    };

    property.space.push(space);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSpace = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const space = property.space.id(req.params.spaceId);
    if (!space) return res.status(404).json({ message: "Space not found" });

    space.title = req.body.title || space.title;

    if (req.file) {
      if (space.icon) {
        const publicId = getPublicIdFromUrl(space.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      space.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSpace = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const space = property.space.id(req.params.spaceId);

    if (!space) return res.status(404).json({ message: "Space not found" });

    if (space.icon) {
      const publicId = getPublicIdFromUrl(space.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    space.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addHouseRule = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const rule = {
      icon: req.file ? req.file.path : "",
      title: req.body.title,
      description: req.body.description,
    };

    property.houserule.rule.push(rule);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHouseRule = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const rule = property.houserule.rule.id(req.params.ruleId);
    if (!rule) return res.status(404).json({ message: "Rule not found" });

    rule.title = req.body.title || rule.title;
    rule.description = req.body.description || rule.description;

    if (req.file) {
      if (rule.icon) {
        const publicId = getPublicIdFromUrl(rule.icon);
        await cloudinary.uploader.destroy(publicId);
      }
      rule.icon = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHouseRule = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const rule = property.houserule.rule.id(req.params.ruleId);

    if (!rule) return res.status(404).json({ message: "Rule not found" });

    if (rule.icon) {
      const publicId = getPublicIdFromUrl(rule.icon);
      await cloudinary.uploader.destroy(publicId);
    }

    rule.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIncidental = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.incidental.description = req.body.description;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInformation = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.information.info = req.body.info;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePropertyBasic = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArea = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.area.maplink = req.body.maplink || property.area.maplink;
    property.area.locationname =
      req.body.locationname || property.area.locationname;

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFeature = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.features.push(req.body.feature);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFeature = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.features = property.features.filter((f) => f !== req.body.feature);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.location.lat = req.body.lat;
    property.location.lng = req.body.lng;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.address = req.body.address || property.address;
    property.city = req.body.city || property.city;
    property.country = req.body.country || property.country;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSlug = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.slug = req.body.slug;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addInformationBlock = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.information.info.push(req.body);

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInformationBlock = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const block = property.information.info.id(req.params.blockId);

    if (!block) return res.status(404).json({ message: "Block not found" });

    block.deleteOne();

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHouseRuleMeta = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    property.houserule.checkIn = req.body.checkIn || property.houserule.checkIn;

    property.houserule.checkOut =
      req.body.checkOut || property.houserule.checkOut;

    property.houserule.content = req.body.content || property.houserule.content;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFeature = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    const index = property.features.findIndex((f) => f === req.body.oldFeature);

    if (index === -1)
      return res.status(404).json({ message: "Feature not found" });

    property.features[index] = req.body.newFeature;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
