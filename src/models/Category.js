import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    bannerImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
