import express from "express";
import upload from "../../middleware/upload.js";

import {
  createConcierge,
  getAllConcierge,
  getConciergeById,
  updateConcierge,
  deleteConcierge,
} from "../../controller/ConciergeController/conciergeController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },

    { name: "homeServiceImages", maxCount: 20 },

    { name: "culturalServiceImages", maxCount: 20 },

    { name: "beautywellnesServiceImages", maxCount: 20 },

    { name: "privateeventServiceImages", maxCount: 20 },

    { name: "foodServiceImages", maxCount: 20 },
  ]),
  createConcierge
);

router.get("/", getAllConcierge);
router.get("/:id", getConciergeById);

router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },

    { name: "homeServiceImages", maxCount: 20 },

    { name: "culturalServiceImages", maxCount: 20 },

    { name: "beautywellnesServiceImages", maxCount: 20 },

    { name: "privateeventServiceImages", maxCount: 20 },

    { name: "foodServiceImages", maxCount: 20 },
  ]),
  updateConcierge
);

router.delete("/:id", deleteConcierge);

export default router;
