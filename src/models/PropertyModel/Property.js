import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema({
  address1: { type: String },
  address2: { type: String }
}, { _id: false });

const PropertySchema = new Schema(
  {
    name: { type: String, required: true },
    subDescription: { type: String },       // short subtitle
    overviewContent: { type: String },      // overview
    description: { type: String },          // long description
    propertyType: { type: String },         // e.g., apartment, villa
    checkIn: { type: String },              // could be times or date strings
    checkOut: { type: String },
    bannerImage: { type: String },          // path to banner image
    address: AddressSchema,
    gallery: [{ type: String }],            // array of image paths
    services: [{ type: String }],           // array of strings like "TV", "WiFi", etc.
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
