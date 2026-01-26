

import express from "express";
import upload from "../middleware/upload.js";
import {
  createProperty,
  getProperties,
  getPropertyById,
  getPropertyBySlug,
  updateProperty,
  deleteProperty,
  addFacility,
  updateFacility,
  deleteFacility,
  removeGalleryImage,
  
  addGalleryImage,
} from "../controller/propertyController.js";

const router = express.Router();

/* PROPERTY */
router.post(
  "/",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createProperty
);

router.get("/", getProperties);
router.get("/slug/:slug", getPropertyBySlug);
router.get("/:id", getPropertyById);

router.put(
  "/:id",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateProperty
);

router.delete("/:id", deleteProperty);

/* FACILITY */
router.post("/:id/facility", upload.single("icon"), addFacility);
router.put(
  "/:id/facility/:facilityId",
  upload.single("icon"),
  updateFacility
);
router.delete("/:id/facility/:facilityId", deleteFacility);

/* GALLERY */
router.put("/:id/gallery-image", removeGalleryImage);
router.post(
  "/:id/gallery-image",
  upload.single("galleryImage"),
  addGalleryImage
);

export default router;
