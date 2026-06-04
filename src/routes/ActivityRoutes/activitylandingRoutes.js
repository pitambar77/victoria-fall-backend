import express from "express";
import upload from "../../middleware/upload.js";

import {
  createActivitylanding,
  getAllActivitylanding,
  getActivitylandingById,
  updateActivitylanding,
  deleteActivitylanding,
} from "../../controller/ActivityController/activitylandingController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    
  ]),
  createActivitylanding,
);

router.get("/", getAllActivitylanding);
router.get("/:id", getActivitylandingById);

router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    
  ]),
  updateActivitylanding,
);

router.delete("/:id", deleteActivitylanding);

export default router;
