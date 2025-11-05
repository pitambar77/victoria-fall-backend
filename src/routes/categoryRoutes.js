// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   createCategory,
//   getCategoriesByDestination,
//   updateCategory,
//   deleteCategory,
// } from "../controller/categoryController.js";

// const router = express.Router();

// // Create / Read
// router.post("/", upload.single("bannerImage"), createCategory);
// router.get("/:destinationId", getCategoriesByDestination);

// // Update / Delete
// router.put("/:id", upload.single("bannerImage"), updateCategory);
// router.delete("/:id", deleteCategory);

// export default router;


// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   createCategory,
//   getCategoriesByDestination,
//   updateCategory,
//   deleteCategory
// } from "../controller/categoryController.js";

// const router = express.Router();

// router.post("/", upload.single("bannerImage"), createCategory);
// router.get("/:destinationId", getCategoriesByDestination);
// router.put("/:id", upload.single("bannerImage"), updateCategory);
// router.delete("/:id", deleteCategory);




// export default router;


import express from "express";
import upload from "../middleware/upload.js";
import {
  createCategory,
  getCategoriesByDestination,
  updateCategory,
  deleteCategory
} from "../controller/categoryController.js";

const router = express.Router();

// Create
router.post("/", upload.single("bannerImage"), createCategory);

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await (await import("../models/Category.js")).default.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get categories by destination
router.get("/:destinationId", getCategoriesByDestination);

// Update / Delete
router.put("/:id", upload.single("bannerImage"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;

