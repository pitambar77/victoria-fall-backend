// bellow is working code

// import Activity from "../models/Activity.js";

// const parseJSON = (value) => {
//   if (!value) return [];
//   try {
//     return typeof value === "string" ? JSON.parse(value) : value;
//   } catch {
//     return [];
//   }
// };

// // Create Activity
// export const createActivity = async (req, res) => {
//   try {
//     const {
//       destination,
//       category,
//       locationName,
//       activityName,
//       overview,
//       subDescription,
//       pricePerPerson,
//       minPerson,
//       facilities,
//       highlights,
//       fullDescription,
//       include,
//       exclude,
//       importantInfo,
//     } = req.body;

//     if (!destination || !category || !activityName) {
//       return res.status(400).json({ message: "Destination, Category and Activity Name are required" });
//     }

//     const bannerImage = req.files?.bannerImage?.[0]?.path || "";
//     const galleryImages = req.files?.galleryImages?.map(f => f.path) || [];

//     const newActivity = new Activity({
//       destination,
//       category,
//       locationName,
//       activityName,
//       bannerImage,
//       galleryImages,
//       overview,
//       subDescription,
//       pricePerPerson: pricePerPerson || 0,
//       minPerson: minPerson || 0,
//       facilities: parseJSON(facilities),
//       highlights: parseJSON(highlights),
//       fullDescription: parseJSON(fullDescription),
//       include: parseJSON(include),
//       exclude: parseJSON(exclude),
//       importantInfo,
//     });

//     const saved = await newActivity.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Get all Activities
// export const getAllActivities = async (req, res) => {
//   try {
//     const activities = await Activity.find();
//     res.json(activities);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Get Activity by ID
// export const getActivityById = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id)
//     .populate("destination", "name")  // ✅ populate destination name
//     .populate("category", "name");       // ✅ populate category name
//     if (!activity) return res.status(404).json({ message: "Activity not found" });
//     res.json(activity);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get Activities by Category
// export const getActivitiesByCategory = async (req, res) => {
//   try {
//     const activities = await Activity.find({ category: req.params.categoryId });
//     res.json(activities);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update Activity
// export const updateActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id);
//     if (!activity) return res.status(404).json({ message: "Activity not found" });

//     const {
//       destination,
//       category,
//       locationName,
//       activityName,
//       overview,
//       subDescription,
//       pricePerPerson,
//       minPerson,
//       facilities,
//       highlights,
//       fullDescription,
//       include,
//       exclude,
//       importantInfo,
//     } = req.body;

//     activity.destination = destination || activity.destination;
//     activity.category = category || activity.category;
//     activity.locationName = locationName || activity.locationName;
//     activity.activityName = activityName || activity.activityName;
//     activity.overview = overview || activity.overview;
//     activity.subDescription = subDescription || activity.subDescription;
//     activity.pricePerPerson = pricePerPerson || activity.pricePerPerson;
//     activity.minPerson = minPerson || activity.minPerson;
//     activity.facilities = parseJSON(facilities) || activity.facilities;
//     activity.highlights = parseJSON(highlights) || activity.highlights;
//     activity.fullDescription = parseJSON(fullDescription) || activity.fullDescription;
//     activity.include = parseJSON(include) || activity.include;
//     activity.exclude = parseJSON(exclude) || activity.exclude;
//     activity.importantInfo = importantInfo || activity.importantInfo;

//     if (req.files?.bannerImage?.[0]) activity.bannerImage = req.files.bannerImage[0].path;
//     if (req.files?.galleryImages) activity.galleryImages = req.files.galleryImages.map(f => f.path);

//     await activity.save();
//     res.json(activity);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Activity
// export const deleteActivity = async (req, res) => {
//   try {
//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ message: "Activity deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

import Activity from "../models/Activity.js";
import cloudinary from "../config/cloudinary.js";


const parseJSON = (value, fallback = []) => {
  if (!value) return fallback;
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return fallback;
  }
};

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return filename.split(".")[0];
};

const normalizeImportantInfo = (value) => {
  const parsed = parseJSON(value, []);

  if (!Array.isArray(parsed)) return [];

  return parsed
    .filter(
      (block) =>
        block &&
        typeof block.type === "string" &&
        block.content !== undefined &&
        block.content !== null &&
        block.content !== ""
    )
    .map((block) => ({
      type: block.type,
      content: block.content,
    }));
};


/* ================= CREATE ================= */
export const createActivity = async (req, res) => {
  try {
    const {
      destination,
      category,
      locationName,
      activityName,
      overview,
      subDescription,
      pricePerPerson,
      minPerson,
      duration,
      content,
      facilities,
      highlights,
      fullDescription,
      include,
      exclude,
      importantInfo,
      overviewInfo,
      banner,
    } = req.body;

    if (!destination || !category || !activityName) {
      return res.status(400).json({
        message: "Destination, Category & Activity Name are required",
      });
    }

    const overviewImage = req.files?.overviewImage?.[0]?.path || "";
    const galleryImages =
      req.files?.galleryImages?.map((f) => f.path) || [];

    const bannerImage = req.files?.bannerImage?.[0]?.path || "";

    // const parsedBanner = parseJSON(banner);
    // if (bannerImage) {
    //   parsedBanner.unshift({
    //     title: parsedBanner?.[0]?.title || "",
    //     subTitle: parsedBanner?.[0]?.subTitle || "",
    //     bannerImage,
    //   });
    // }

    const parsedBanner = parseJSON(banner, []);

const bannerObject = {
  title: parsedBanner?.[0]?.title || "",
  subTitle: parsedBanner?.[0]?.subTitle || "",
  bannerImage: bannerImage || "",
};

    const activity = new Activity({
      destination,
      category,
      locationName,
      activityName,
      overviewImage,
      galleryImages,
      overview,
      subDescription,
      pricePerPerson,
      minPerson,
      duration,
      content,
      facilities: parseJSON(facilities),
      highlights: parseJSON(highlights),
      fullDescription: parseJSON(fullDescription),
      include: parseJSON(include),
      exclude: parseJSON(exclude),
      // importantInfo,
      overviewInfo: parseJSON(overviewInfo),
        // ✅ FIX
  importantInfo: normalizeImportantInfo(importantInfo),

      // banner: parsedBanner,
      banner: [bannerObject], // ✅ ALWAYS ONE OBJECT
    });

    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL ================= */
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("destination", "name")
      .populate("category", "name");

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate("destination", "name")
      .populate("category", "name");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY Glug ================= */
export const getActivityBySlug = async (req, res) => {
  try {
    const activity = await Activity.findOne({ slug: req.params.slug })
      .populate("destination", "name")
      .populate("category", "name");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY CATEGORY ================= */
export const getActivitiesByCategory = async (req, res) => {
  try {
    const activities = await Activity.find({
      category: req.params.categoryId,
    }).populate("destination", "name");

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* ================= UPDATE ================= */
// export const updateActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id);
//     if (!activity) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     const updatableFields = [
//       "destination",
//       "category",
//       "locationName",
//       "activityName",
//       "overview",
//       "subDescription",
//       "pricePerPerson",
//       "minPerson",
//       "duration",
//       "content",
//       "importantInfo",
//     ];

//     updatableFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         activity[field] = req.body[field];
//       }
//     });

//     if (req.body.facilities)
//       activity.facilities = parseJSON(req.body.facilities, activity.facilities);

//     if (req.body.highlights)
//       activity.highlights = parseJSON(req.body.highlights, activity.highlights);

//     if (req.body.fullDescription)
//       activity.fullDescription = parseJSON(
//         req.body.fullDescription,
//         activity.fullDescription
//       );

//     if (req.body.include)
//       activity.include = parseJSON(req.body.include, activity.include);

//     if (req.body.exclude)
//       activity.exclude = parseJSON(req.body.exclude, activity.exclude);

//     if (req.body.overviewInfo)
//       activity.overviewInfo = parseJSON(
//         req.body.overviewInfo,
//         activity.overviewInfo
//       );

//     // if (req.body.banner)
//     //   activity.banner = parseJSON(req.body.banner, activity.banner);
// //     if (req.body.banner) {
// //   activity.banner = parseJSON(req.body.banner, activity.banner);
// //   activity.markModified("banner"); // ✅ ensures slug updates
// // }

// if (req.body.banner) {
//   const incomingBanner = parseJSON(req.body.banner, []);

//   if (!activity.banner.length) activity.banner = [{}];

//   activity.banner[0] = {
//     ...activity.banner[0],      // keep bannerImage if exists
//     ...incomingBanner[0],       // update title & subtitle
//   };

//   activity.markModified("banner");
// }



//     if (req.files?.overviewImage?.[0]) {
//       activity.overviewImage = req.files.overviewImage[0].path;
//     }

//     // if (req.files?.galleryImages) {
//     //   activity.galleryImages = req.files.galleryImages.map((f) => f.path);
//     // }

//     // if (req.files?.bannerImage?.[0]) {
//     //   const bannerImage = req.files.bannerImage[0].path;
//     //   activity.banner = [
//     //     {
//     //       title: activity.banner?.[0]?.title || "",
//     //       subTitle: activity.banner?.[0]?.subTitle || "",
//     //       bannerImage,
//     //     },
//     //   ];
//     // }

// //     if (req.files?.bannerImage?.[0]) {
// //   const bannerImage = req.files.bannerImage[0].path;

// //   if (!activity.banner.length) activity.banner = [{}];

// //   activity.banner[0] = {
// //     ...activity.banner[0],
// //     bannerImage,
// //   };

// //   activity.markModified("banner"); // ✅ ensure slug logic consistency
// // }

// if (req.files?.bannerImage?.[0]) {
//   const newImage = req.files.bannerImage[0].path;

//   const oldImage = activity.banner?.[0]?.bannerImage;
//   if (oldImage) {
//     const publicId = getPublicIdFromUrl(oldImage);
//     if (publicId) {
//       await cloudinary.uploader.destroy(publicId);
//     }
//   }

//   if (!activity.banner.length) activity.banner = [{}];

//   activity.banner[0] = {
//     ...activity.banner[0],
//     bannerImage: newImage,
//   };

//   activity.markModified("banner");
// }



//     await activity.save();
//     res.json(activity);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
/* ================= UPDATE ================= */
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    /* ========== BASIC FIELDS ========== */
    const updatableFields = [
      "destination",
      "category",
      "locationName",
      "activityName",
      "overview",
      "subDescription",
      "pricePerPerson",
      "minPerson",
      "duration",
      "content",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        activity[field] = req.body[field];
      }
    });

    /* ========== JSON FIELDS ========== */
    if (req.body.facilities)
      activity.facilities = parseJSON(req.body.facilities, activity.facilities);

    if (req.body.highlights)
      activity.highlights = parseJSON(req.body.highlights, activity.highlights);

    if (req.body.fullDescription)
      activity.fullDescription = parseJSON(
        req.body.fullDescription,
        activity.fullDescription
      );

    if (req.body.include)
      activity.include = parseJSON(req.body.include, activity.include);

    if (req.body.exclude)
      activity.exclude = parseJSON(req.body.exclude, activity.exclude);

    if (req.body.overviewInfo)
      activity.overviewInfo = parseJSON(
        req.body.overviewInfo,
        activity.overviewInfo
      );

      /* ✅ IMPORTANT INFO (CONTENT BLOCKS) */
if (req.body.importantInfo !== undefined) {
  activity.importantInfo = normalizeImportantInfo(req.body.importantInfo);
}


    /* ==================================================
       ✅ BANNER (SINGLE OBJECT – ALWAYS)
    ================================================== */

    const incomingBanner = parseJSON(req.body.banner, []);
    const existingBanner = activity.banner?.[0] || {};

    activity.banner = [
      {
        title:
          incomingBanner?.[0]?.title !== undefined
            ? incomingBanner[0].title
            : existingBanner.title || "",

        subTitle:
          incomingBanner?.[0]?.subTitle !== undefined
            ? incomingBanner[0].subTitle
            : existingBanner.subTitle || "",

        bannerImage: existingBanner.bannerImage || "",
      },
    ];

    /* ===== Banner Image Update ===== */
    if (req.files?.bannerImage?.[0]) {
      const newImage = req.files.bannerImage[0].path;

      // remove old image from Cloudinary
      if (existingBanner.bannerImage) {
        const publicId = getPublicIdFromUrl(existingBanner.bannerImage);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      activity.banner[0].bannerImage = newImage;
    }

    activity.markModified("banner");

    /* ========== OVERVIEW IMAGE ========== */
    if (req.files?.overviewImage?.[0]) {
      activity.overviewImage = req.files.overviewImage[0].path;
    }

    await activity.save();
    res.json(activity);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE Gallery Images ================= */
export const removeGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const activity = await Activity.findById(id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    activity.galleryImages = activity.galleryImages.filter(
      (img) => img !== image
    );

    const publicId = getPublicIdFromUrl(image);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await activity.save();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADD Gallery Images ================= */

export const addGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const activity = await Activity.findById(id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    activity.galleryImages.push(req.file.path);
    await activity.save();

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
