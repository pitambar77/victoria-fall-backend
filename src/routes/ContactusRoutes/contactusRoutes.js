import express from "express";
import { createBooking, getAllBookings } from "../../controller/ContactusController/contactusController.js";

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post("/", createBooking);

// GET /api/bookings - Fetch all bookings
router.get("/", getAllBookings);

export default router;