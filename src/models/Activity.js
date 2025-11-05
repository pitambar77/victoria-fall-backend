import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    locationName: { type: String },
    activityName: { type: String, required: true },
    bannerImage: { type: String },
    galleryImages: [{ type: String }],
    overview: { type: String },
    subDescription: { type: String },
    pricePerPerson: { type: Number },
    minPerson: { type: Number },

    // Service & Facilities Section
    facilities: [
      {
        icon: String,
        title: String,
        description: String,
      },
    ],

    highlights: [String],
    fullDescription: [String],
    include: [String],
    exclude: [String],
    importantInfo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
