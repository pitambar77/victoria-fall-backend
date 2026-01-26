

// bellow working code

import mongoose from "mongoose";
import slugify from "slugify";

const facilitySchema = new mongoose.Schema({
  facilityName: String,
  icon: String, // image upload field
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const propertySchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    index: true,
  },

  name: { type: String, required: true },
  shortTitle: String,
  propertyType: String,
  overviewTittle: String,
  overview: String,
  subDescription: String,
  address1: String,
  address2: String,
  checkIn: String,
  checkOut: String,
  contactNumber: Number,
  priceperPerson: Number,
  map:String,
  bannerImage: String,
  overviewImage: String, 
  galleryImages: [String],
  facilities: [facilitySchema],
  faqs: [faqSchema],
},
{ timestamps: true } 
);

/* ================= CREATE SLUG ================= */
propertySchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  const baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Property.findOne({
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
propertySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update?.name) return next();

  const baseSlug = slugify(update.name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Property.findOne({
      slug,
      _id: { $ne: this.getQuery()._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  update.slug = slug;
  next();
});

export default mongoose.model("Property", propertySchema);
