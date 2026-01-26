// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   createDestination,
//   getDestinations,
//   getDestination,
//   updateDestination,
//   deleteDestination,
// } from "../controller/destinationController.js";

// const router = express.Router();

// router.post("/", upload.single("bannerImage"), createDestination);
// router.get("/", getDestinations);
// router.get("/:id", getDestination);
// router.put("/:id", upload.single("bannerImage"), updateDestination);
// router.delete("/:id", deleteDestination);

// export default router;

import express from "express";
import upload from "../middleware/upload.js";
import {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
  getDestinationBySlug
} from "../controller/destinationController.js";

const router = express.Router();

router.post("/", upload.single("bannerImage"), createDestination);
router.get("/", getDestinations);
router.get("/slug/:slug", getDestinationBySlug);
router.get("/:id", getDestination);
router.put("/:id", upload.single("bannerImage"), updateDestination);
router.delete("/:id", deleteDestination);

export default router;

