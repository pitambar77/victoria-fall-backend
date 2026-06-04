import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";

import restaurantRoutes from "./routes/restaurantRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

import activityRoutes from "./routes/activityRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bookingRoutes from "./routes/PropertyRoutes/bookingRoutes.js";
import actbookingRoutes from "./routes/ActivityRoutes/actbookingRoutes.js";
import restauBookingRoutes from "./routes/RestaurantRoutes/restauBookingRoutes.js";
import contactusRoutes from "./routes/ContactusRoutes/contactusRoutes.js";
import ownerRoutes from "./routes/OwnerRoutes/ownerRoutes.js";
import property from "./routes/PropertyRoutes/properties.js";
import homeRoutes from "./routes/HomeRoutes/homeRoutes.js"
import authRoutes from "./routes/AuthRoute/authRoutes.js"
import activitylandingRoutes from "./routes/ActivityRoutes/activitylandingRoutes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/properties", propertyRoutes);

app.use("/api/destinations", destinationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/activities", activityRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/actbookings", actbookingRoutes);
app.use("/api/restaubookings", restauBookingRoutes);
app.use("/api/contactus", contactusRoutes);

app.use("/api/owner-applications", ownerRoutes);

app.use("/api/property", property);

app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/activitylanding", activitylandingRoutes);

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});
