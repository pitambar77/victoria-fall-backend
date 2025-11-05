// import mongoose from "mongoose";

// const OwnerApplicationSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   roleType: { type: String, required: true },

//   // Business Info
//   brandName: String,
//   category: String,
//   address: String,
//   location: String,
//   subunit: String,
//   propertyType: String,
//   numRooms: Number,
//   cuisineType: String,
//   seatingCapacity: Number,
//   activityType: String,
//   duration: String,
//   pricePerPerson: Number,

//   // Legal Info
//   licenseNo: String,
//   taxId: String,
//   licenseFile: String, // Cloudinary URL
//   bankDetails: String,

//   // Media
//   logo: String, // Cloudinary URL
//   banner: String, // Cloudinary URL
//   description: String,

//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("OwnerApplication", OwnerApplicationSchema);




// according to owner application form


import mongoose from "mongoose";

const OwnerApplicationSchema = new mongoose.Schema({
  // Basic Info
  fullName: { type: String, required: true },
  businessName: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  wpnumber: { type: String },
  roleType: {
    type: String,
    required: true,
    enum: ["Property Owner", "Restaurant Owner", "Activity/Experience Provider"],
  },

  // ===============================
  // PROPERTY OWNER FIELDS
  // ===============================
  propertyName: { type: String },
  address: { type: String },
  mapLink: { type: String },
  propertyType: { type: String, enum: ["Villa", "Townhouse", "Cottage", "Apartment", "Room", "Other"] },
  rooms: { type: Number },
  bathrooms: { type: Number },
  loungs: { type: Number },
  kitchen: { type: Number },
  dining: { type: Number },
  outdoor: { type: Number },
  capacity: { type: Number },

  wifi: { type: Boolean, default: false },
  tv: { type: Boolean, default: false },
  security: { type: Boolean, default: false },
  laundry: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  staff: { type: Boolean, default: false },
  ac: { type: Boolean, default: false },

  kitchenFacilities: { type: String },
  selfCatering: { type: String, enum: ["Self-Catering", "Serviced"] },
  cleaningDetails: { type: String },
  description: { type: String },

  // Property Legal Info
  zimraBP: { type: String },
  ztaMembership: { type: String },
  tradingLicense: { type: String },
  insuranceDetails: { type: String },

  // Property Banking Info
  bankName: { type: String },
  branchName: { type: String },
  branchAddress: { type: String },
  accountName: { type: String },
  accountNumber: { type: String },
  swiftCode: { type: String },

  // Property Media & Rates
  seasonalRates: { type: String, enum: ["Yes", "No"] },
  rateType: { type: String, enum: ["Recommended Selling Price", "Reseller Net Price"] },
  rateBasis: { type: String, enum: ["Per Property", "Per Person", "Per Room"] },
  rateInclusions: { type: String },
  heroImage: { type: String },
  bedroomImages: [{ type: String }],
  bathroomImages: [{ type: String }],
  kitchenImages: [{ type: String }],
  outdoorImages: [{ type: String }],

  // ===============================
  // RESTAURANT OWNER FIELDS
  // ===============================
  restaurantName: { type: String },
  category: { type: String },
  seatingCapacity: { type: Number },
  mealavailable: { type: String },
  licenseNo: { type: String },
  restaurantDescription: { type: String },
  exteriorImages: [{ type: String }],
  interiorImages: [{ type: String }],
  restaurantKitchenImages: [{ type: String }],
  diningImages: [{ type: String }],

  // ===============================
  // ACTIVITY / EXPERIENCE PROVIDER FIELDS
  // ===============================
  activityName: { type: String },
  activityType: { type: String, enum: ["Adventure", "Cultural", "Nature", "Water"] },
  duration: { type: String },
  pricePerPerson: { type: Number },
  tourism: [{ type: String }], // upload file link
  activityDescription: { type: String },
  activityImages: [{ type: String }],
  activityscImages: [{ type: String }],

  // Common Media
  heroImageAlt: { type: String },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("OwnerApplication", OwnerApplicationSchema);
