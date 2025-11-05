


import express from "express";
import upload from "../middleware/upload.js";
import {
  createActivity,
  getAllActivities,
  getActivityById,
  getActivitiesByCategory,
  updateActivity,
  deleteActivity
} from "../controller/activityController.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
]);

router.post("/", uploadFields, createActivity);
router.get("/", getAllActivities); // GET all activities
router.get("/:id", getActivityById); // GET single activity by ID
router.get("/:categoryId", getActivitiesByCategory);
router.put("/:id", uploadFields, updateActivity);
router.delete("/:id", deleteActivity);

export default router;
