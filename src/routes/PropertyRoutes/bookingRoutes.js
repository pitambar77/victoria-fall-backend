// import express from "express";
// import { createBooking, getAllBookings } from "../../controller/PropertyController/bookingController.js";

// const router = express.Router();

// // POST /api/bookings - Create a new booking
// router.post("/", createBooking);

// // GET /api/bookings - Fetch all bookings
// router.get("/", getAllBookings);

// export default router;


import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../../controller/PropertyController/bookingController.js";

const router = express.Router();

router.post("/", createBooking);        // Create
router.get("/", getAllBookings);        // Get all
router.get("/:id", getBookingById);     // Get one
router.put("/:id", updateBooking);      // Update
router.delete("/:id", deleteBooking);   // Delete

export default router;
