// import mongoose from "mongoose";

// const menuSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   description: String,
// });

// const facilitySchema = new mongoose.Schema({
//   name: String,
//   icon: String,
// });

// const restaurantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   overview: String,
//   subDescription: String,
//   address1: String,
//   address2: String,
//   openingTime: String,
//   closingTime: String,
//   bannerImage: String,
//   galleryImages: [String],
//   menu: [menuSchema],
//   facilities: [facilitySchema],
// });

// export default mongoose.model("Restaurant", restaurantSchema);


// add menu with category


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

const facilitySchema = new mongoose.Schema({
  name: String,
  icon: String,
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
  priceperPerson:{type:String},
  bannerImage: { type: String },
  galleryImages: [String],
  menu: [menuCategorySchema],
  facilities: [facilitySchema],
});

export default mongoose.model("Restaurant", restaurantSchema);


