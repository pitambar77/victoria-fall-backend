import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    overview:{type:String},
    bannerImage: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
