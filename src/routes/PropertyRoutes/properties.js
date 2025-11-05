import express from "express";
import upload from "../../middleware/upload.js";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../../controller/PropertyController/propertyController.js";

const router = express.Router();

// file fields:
// - bannerImage : single
// - gallery : array of files
const cpUpload = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
]);


// Create
router.post("/", cpUpload, createProperty);

// Read all (pagination)
router.get("/", getProperties);

// Read one
router.get("/:id", getPropertyById);

// Update (multipart allowed)
router.put("/:id", cpUpload, updateProperty);

// Delete
router.delete("/:id", deleteProperty);

export default router;
