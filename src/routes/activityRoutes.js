
import express from "express";
import upload from "../middleware/upload.js";
import {
  createActivity,
  getAllActivities,
  getActivityById,
  getActivitiesByCategory,
  updateActivity,
  deleteActivity,
  getActivityBySlug,
  removeGalleryImage,
  addGalleryImage
} from "../controller/activityController.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "overviewImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
]);

router.post("/", uploadFields, createActivity);
router.get("/", getAllActivities);
router.get("/category/:categoryId", getActivitiesByCategory);
router.get("/slug/:slug", getActivityBySlug);
router.get("/:id", getActivityById);
router.put("/:id", uploadFields, updateActivity);
router.delete("/:id", deleteActivity);


/* ================= GALLERY ROUTES ================= */
// remove single image
router.put("/:id/gallery-image", removeGalleryImage);

// add single image
router.post(
  "/:id/gallery-image",
  upload.single("galleryImage"),
  addGalleryImage
);


export default router;
