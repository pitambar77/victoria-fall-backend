import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    country: { type: String, required: true },
    activityDate: { type: Date, required: true },
    pickLocation: { type: String },
    adult: { type: Number, required: true },
    child: { type: Number, required: true },
    infant: { type: Number, required: true },
    activity: {
      type: String,
      required: true,
    },
    message: { type: String },
  },
  { timestamps: true }
);

const ActBooking = mongoose.model("ActBooking", bookingSchema);
export default ActBooking;
