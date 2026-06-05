import express from "express";
import upload from "../../middleware/upload.js";

import {
  createOwnerapplicationlanding,
  getAllOwnerapplicationlanding,
  getOwnerapplicationlandingById,
  updateOwnerapplicationlanding,
  deleteOwnerapplicationlanding,
} from "../../controller/OwnerApplicationController/ownerapplicationlandingController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    
  ]),
  createOwnerapplicationlanding,
);

router.get("/", getAllOwnerapplicationlanding);
router.get("/:id", getOwnerapplicationlandingById);

router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    
  ]),
  updateOwnerapplicationlanding,
);

router.delete("/:id", deleteOwnerapplicationlanding);

export default router;
