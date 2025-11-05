import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../../controller/RestaurantController/bookingController.js";

const router = express.Router();

router.post("/", createBooking);        // Create
router.get("/", getAllBookings);        // Get all
router.get("/:id", getBookingById);     // Get one
router.put("/:id", updateBooking);      // Update
router.delete("/:id", deleteBooking);   // Delete

export default router;
