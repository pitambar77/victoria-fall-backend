// import Activity from "../models/Activity.js";
// import cloudinary from "../config/cloudinary.js";

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

//     const bannerImage = req.files?.bannerImage?.[0]?.path;
//     const galleryImages = req.files?.galleryImages?.map((f) => f.path) || [];

//     const newActivity = new Activity({
//       destination,
//       category,
//       locationName,
//       activityName,
//       bannerImage,
//       galleryImages,
//       overview,
//       subDescription,
//       pricePerPerson,
//       minPerson,
//       facilities: facilities ? JSON.parse(facilities) : [],
//       highlights: highlights ? JSON.parse(highlights) : [],
//       fullDescription: fullDescription ? JSON.parse(fullDescription) : [],
//       include: include ? JSON.parse(include) : [],
//       exclude: exclude ? JSON.parse(exclude) : [],
//       importantInfo,
//     });

//     const saved = await newActivity.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getActivitiesByCategory = async (req, res) => {
//   try {
//     const activities = await Activity.find({ category: req.params.categoryId });
//     res.json(activities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // Update Activity
// export const updateActivity = async (req, res) => {
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

//     const activity = await Activity.findById(req.params.id);
//     if (!activity) return res.status(404).json({ message: "Activity not found" });

//     // Update fields
//     activity.destination = destination || activity.destination;
//     activity.category = category || activity.category;
//     activity.locationName = locationName || activity.locationName;
//     activity.activityName = activityName || activity.activityName;
//     activity.overview = overview || activity.overview;
//     activity.subDescription = subDescription || activity.subDescription;
//     activity.pricePerPerson = pricePerPerson || activity.pricePerPerson;
//     activity.minPerson = minPerson || activity.minPerson;
//     activity.facilities = facilities ? JSON.parse(facilities) : activity.facilities;
//     activity.highlights = highlights ? JSON.parse(highlights) : activity.highlights;
//     activity.fullDescription = fullDescription ? JSON.parse(fullDescription) : activity.fullDescription;
//     activity.include = include ? JSON.parse(include) : activity.include;
//     activity.exclude = exclude ? JSON.parse(exclude) : activity.exclude;
//     activity.importantInfo = importantInfo || activity.importantInfo;

//     // Images
//     if (req.files?.bannerImage?.[0]) activity.bannerImage = req.files.bannerImage[0].path;
//     if (req.files?.galleryImages) activity.galleryImages = req.files.galleryImages.map(f => f.path);

//     await activity.save();
//     res.json(activity);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Activity
// export const deleteActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id);
//     if (!activity) return res.status(404).json({ message: "Activity not found" });

//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ message: "Activity deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// import Activity from "../models/Activity.js";

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

//     const bannerImage = req.files?.bannerImage?.[0]?.path || null;
//     const galleryImages = req.files?.galleryImages?.map((f) => f.path) || [];

//     const newActivity = new Activity({
//       destination,
//       category,
//       locationName,
//       activityName,
//       bannerImage,
//       galleryImages,
//       overview,
//       subDescription,
//       pricePerPerson,
//       minPerson,
//       facilities: facilities ? JSON.parse(facilities) : [],
//       highlights: highlights ? JSON.parse(highlights) : [],
//       fullDescription: fullDescription ? JSON.parse(fullDescription) : [],
//       include: include ? JSON.parse(include) : [],
//       exclude: exclude ? JSON.parse(exclude) : [],
//       importantInfo,
//     });

//     const saved = await newActivity.save();
//     res.status(201).json(saved);
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
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update Activity
// export const updateActivity = async (req, res) => {
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

//     const activity = await Activity.findById(req.params.id);
//     if (!activity) return res.status(404).json({ message: "Activity not found" });

//     // Update fields
//     activity.destination = destination || activity.destination;
//     activity.category = category || activity.category;
//     activity.locationName = locationName || activity.locationName;
//     activity.activityName = activityName || activity.activityName;
//     activity.overview = overview || activity.overview;
//     activity.subDescription = subDescription || activity.subDescription;
//     activity.pricePerPerson = pricePerPerson || activity.pricePerPerson;
//     activity.minPerson = minPerson || activity.minPerson;
//     activity.facilities = facilities ? JSON.parse(facilities) : activity.facilities;
//     activity.highlights = highlights ? JSON.parse(highlights) : activity.highlights;
//     activity.fullDescription = fullDescription ? JSON.parse(fullDescription) : activity.fullDescription;
//     activity.include = include ? JSON.parse(include) : activity.include;
//     activity.exclude = exclude ? JSON.parse(exclude) : activity.exclude;
//     activity.importantInfo = importantInfo || activity.importantInfo;

//     // Update images if uploaded
//     if (req.files?.bannerImage?.[0]) activity.bannerImage = req.files.bannerImage[0].path;
//     if (req.files?.galleryImages) activity.galleryImages = req.files.galleryImages.map(f => f.path);

//     const updated = await activity.save();
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Activity
// export const deleteActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findById(req.params.id);
//     if (!activity) return res.status(404).json({ message: "Activity not found" });

//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ message: "Activity deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


import Activity from "../models/Activity.js";

const parseJSON = (value) => {
  if (!value) return [];
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return [];
  }
};

// Create Activity
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
      facilities,
      highlights,
      fullDescription,
      include,
      exclude,
      importantInfo,
    } = req.body;

    if (!destination || !category || !activityName) {
      return res.status(400).json({ message: "Destination, Category and Activity Name are required" });
    }

    const bannerImage = req.files?.bannerImage?.[0]?.path || "";
    const galleryImages = req.files?.galleryImages?.map(f => f.path) || [];

    const newActivity = new Activity({
      destination,
      category,
      locationName,
      activityName,
      bannerImage,
      galleryImages,
      overview,
      subDescription,
      pricePerPerson: pricePerPerson || 0,
      minPerson: minPerson || 0,
      facilities: parseJSON(facilities),
      highlights: parseJSON(highlights),
      fullDescription: parseJSON(fullDescription),
      include: parseJSON(include),
      exclude: parseJSON(exclude),
      importantInfo,
    });

    const saved = await newActivity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all Activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
    .populate("destination", "name")  // ✅ populate destination name
    .populate("category", "name");       // ✅ populate category name
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get Activities by Category
export const getActivitiesByCategory = async (req, res) => {
  try {
    const activities = await Activity.find({ category: req.params.categoryId });
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update Activity
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    const {
      destination,
      category,
      locationName,
      activityName,
      overview,
      subDescription,
      pricePerPerson,
      minPerson,
      facilities,
      highlights,
      fullDescription,
      include,
      exclude,
      importantInfo,
    } = req.body;

    activity.destination = destination || activity.destination;
    activity.category = category || activity.category;
    activity.locationName = locationName || activity.locationName;
    activity.activityName = activityName || activity.activityName;
    activity.overview = overview || activity.overview;
    activity.subDescription = subDescription || activity.subDescription;
    activity.pricePerPerson = pricePerPerson || activity.pricePerPerson;
    activity.minPerson = minPerson || activity.minPerson;
    activity.facilities = parseJSON(facilities) || activity.facilities;
    activity.highlights = parseJSON(highlights) || activity.highlights;
    activity.fullDescription = parseJSON(fullDescription) || activity.fullDescription;
    activity.include = parseJSON(include) || activity.include;
    activity.exclude = parseJSON(exclude) || activity.exclude;
    activity.importantInfo = importantInfo || activity.importantInfo;

    if (req.files?.bannerImage?.[0]) activity.bannerImage = req.files.bannerImage[0].path;
    if (req.files?.galleryImages) activity.galleryImages = req.files.galleryImages.map(f => f.path);

    await activity.save();
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete Activity
export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
