import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    time: { type:String, required: true },
    bookingDate: { type: Date, required: true },
   
    guest: { type: Number, required: true },
  
    restaurant: {
      type: String,
    },
    message: { type: String },
  },
  { timestamps: true }
);

const RestauBooking = mongoose.model("RestauBooking", bookingSchema);
export default RestauBooking;
