
// Route according to owner application

import express from "express";
import {
  createOwnerApplication,
  getAllOwnerApplications,
  getOwnerApplicationById,
} from "../../controller/OwnerApplicationController/ownerController.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// POST - Create new owner application
router.post(
  "/",
  upload.fields([
    // Property images
    { name: "heroImage", maxCount: 10 },
    { name: "bedroomImages", maxCount: 20 },
    { name: "bathroomImages", maxCount: 20 },
    { name: "kitchenImages", maxCount: 20 },
    { name: "outdoorImages", maxCount: 20 },

    // Restaurant images
    { name: "exteriorImages", maxCount: 20 },
    { name: "interiorImages", maxCount: 20 },
    { name: "restaurantKitchenImages", maxCount: 20 },
    { name: "diningImages", maxCount: 20 },

    // Activity images
    { name: "activityImages", maxCount: 20 },
    { name: "activityscImages", maxCount: 20 },
    { name:"tourism",maxCount:5}
  ]),
  createOwnerApplication
);

// GET - Fetch all owner applications
router.get("/", getAllOwnerApplications);

// GET - Fetch single application by ID
router.get("/:id", getOwnerApplicationById);

export default router;
