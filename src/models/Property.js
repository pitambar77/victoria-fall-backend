import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  facilityName: String,
  icon: String,
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const propertySchema = new mongoose.Schema({

  // // added vender here
  //   vendorId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  // // added vender end

  

  name: { type: String, required: true },
  shortTitle:{type:String},
  propertyType:{type:String},
  overview: { type: String },
  subDescription: { type: String },
  address1: { type: String },
  address2: { type: String },
  checkIn: { type: String },
  checkOut: { type: String },
  contactNumber: { type: Number },
  priceperPerson:{type:Number},
  bannerImage: {type:String},
  galleryImages: [String],
  facilities: [facilitySchema],

  // ⬇️ New FAQ section
  faqs: [faqSchema],

});

export default mongoose.model("Property", propertySchema);
