
// import mongoose from "mongoose";

// const menuItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   ingredients: { type: String },
//   price: { type: Number, required: true },
// });

// const menuCategorySchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   items: [menuItemSchema],
// });

// const facilitySchema = new mongoose.Schema({
//   name: String,
//   icon: String,
// });

// const restaurantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   overview: { type: String },
//   subDescription: { type: String },
//   address1: { type: String },
//   address2: { type: String },
//   openingTime: { type: String },
//   closingTime: { type: String },
//   contactNumber: { type: String },
//   priceperPerson:{type:String},
//   bannerImage: { type: String },
//   galleryImages: [String],
//   menu: [menuCategorySchema],
//   facilities: [facilitySchema],
// });

// export default mongoose.model("Restaurant", restaurantSchema);


import mongoose from "mongoose";
import slugify from "slugify";

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
    slug: {
    type: String,
    unique: true,
    index: true,
  },
  name: { type: String, required: true },
  shortTitle: {type:String}, // add new
  resturantType: {type:String}, // add new
  overviewTittle: {type:String}, // add new
  overview: { type: String },
  subDescription: { type: String },
  address1: { type: String },
  address2: { type: String },
  openingTime: { type: String },
  closingTime: { type: String },
  contactNumber: { type: String },
  priceperPerson:{type:String},
  bannerImage: { type: String },
  overviewImage: {type:String}, // add new
  galleryImages: [String],
  menu: [menuCategorySchema],
  facilities: [facilitySchema],
});

// slug create

restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  const baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Restaurant.findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

/* ================= UPDATE SLUG ================= */
restaurantSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update?.name) return next();

  const baseSlug = slugify(update.name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Restaurant.findOne({
      slug,
      _id: { $ne: this.getQuery()._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  update.slug = slug;
  next();
});


export default mongoose.model("Restaurant", restaurantSchema);



