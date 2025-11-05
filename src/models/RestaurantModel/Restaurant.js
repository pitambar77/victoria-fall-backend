import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String },
  price: { type: Number, required: true },
});

const menuCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [menuItemSchema],
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  overview: { type: String },
  subDescription: { type: String },
  address1: { type: String },
  address2: { type: String },
  openingTime: { type: String },
  closingTime: { type: String },
  contactNumber: { type: String },
  bannerImages: [String],
  galleryImages: [String],
  menu: [menuCategorySchema],
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
