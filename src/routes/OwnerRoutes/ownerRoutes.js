
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
    { name: "heroImage", maxCount: 1 },
    { name: "bedroomImages", maxCount: 10 },
    { name: "bathroomImages", maxCount: 10 },
    { name: "kitchenImages", maxCount: 10 },
    { name: "outdoorImages", maxCount: 10 },

    // Restaurant images
    { name: "exteriorImages", maxCount: 10 },
    { name: "interiorImages", maxCount: 10 },
    { name: "restaurantKitchenImages", maxCount: 10 },
    { name: "diningImages", maxCount: 10 },

    // Activity images
    { name: "activityImages", maxCount: 10 },
    { name: "activityscImages", maxCount: 10 },
    { name:"tourism",maxCount:5}
  ]),
  createOwnerApplication
);

// GET - Fetch all owner applications
router.get("/", getAllOwnerApplications);

// GET - Fetch single application by ID
router.get("/:id", getOwnerApplicationById);

export default router;
