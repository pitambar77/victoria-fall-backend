import express from "express";
import upload from "../middleware/upload.js";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  addFacility,
  deleteFacility,
} from "../controller/propertyController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }]),
  createProperty
);

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.put(
  "/:id",
  upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }]),
  updateProperty
);
router.delete("/:id", deleteProperty);

// ✅ Facility routes
router.post("/:id/facility", upload.single("icon"), addFacility);
router.delete("/:id/facility/:facilityId", deleteFacility);


export default router;
