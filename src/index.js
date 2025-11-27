// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import connectDB from './db/index.js'
// import authRoutes from "./routes/AuthRoute/authRoutes.js";

// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import propertyRoutes from "./routes/PropertyRoutes/properties.js";
// import restaurantRoutes from "./routes/RestaurantRoutes/restaurantRoutes.js";

// dotenv.config()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express()

// app.use(cors())

// app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// app.use(helmet());

// app.use(morgan("dev"));

// app.use(express.urlencoded({ extended: true })); // for form bodies

// // Serve uploaded files statically
// const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
// app.use("/uploads", express.static(path.join(__dirname, "..", UPLOAD_DIR)));

// // Routes
// app.use("/api/properties", propertyRoutes);
// app.use("/api/restaurants", restaurantRoutes);
// // Basic root route
// app.get("/", (req, res) => {
//   res.json({ status: "ok", message: "Properties API" });
// });

// app.use("/api/auth", authRoutes);

// connectDB()
// const PORT = process.env.PORT || 8000
// app.listen(PORT, () => console.log(`Server running on ${PORT}`))

// old comment code

// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import connectDB from './db/index.js'
// import authRoutes from "./routes/AuthRoute/authRoutes.js"
// import helmet from "helmet"
// import morgan from "morgan"
// import path from "path"
// import { fileURLToPath } from "url"
// import propertyRoutes from "./routes/PropertyRoutes/properties.js"
// import restaurantRoutes from "./routes/RestaurantRoutes/restaurantRoutes.js"

// dotenv.config()

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const app = express()

// // CORS for APIs
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))

// // JSON + urlencoded
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // Security + logging
// app.use(helmet())
// app.use(morgan("dev"))

// // ✅ Serve uploads with proper CORS
// app.use(
//   "/uploads",
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
//   express.static(path.join(__dirname, "uploads"))
// )

// // Routes
// app.use("/api/properties", propertyRoutes)
// app.use("/api/restaurants", restaurantRoutes)
// app.use("/api/auth", authRoutes)

// // Root
// app.get("/", (req, res) => {
//   res.json({ status: "ok", message: "Properties API" })
// })

// connectDB()
// const PORT = process.env.PORT || 8000
// app.listen(PORT, () => console.log(`Server running on ${PORT}`))

// new code for cloudinary

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

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});
