// import mongoose from "mongoose";

// const activitySchema = new mongoose.Schema(
//   {
//     destination: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Destination",
//       required: true,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     locationName: { type: String },
//     activityName: { type: String, required: true },
//     bannerImage: { type: String },
//     galleryImages: [{ type: String }],
//     overview: { type: String },
//     subDescription: { type: String },
//     pricePerPerson: { type: Number },
//     minPerson: { type: Number },

//     // Service & Facilities Section
//     facilities: [
//       {
//         icon: String,
//         title: String,
//         description: String,
//       },
//     ],

//     highlights: [String],
//     fullDescription: [String],
//     include: [String],
//     exclude: [String],
//     importantInfo: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Activity", activitySchema);

import mongoose from "mongoose";
import slugify from "slugify";

const contentBlockSchema = new mongoose.Schema({
  type: { type: String, enum: ["header", "paragraph", "list"], required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
});

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
    // ✅ SLUG
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    overviewImage: { type: String },
    galleryImages: [{ type: String }],
    overview: { type: String },
    subDescription: { type: String },
    pricePerPerson: { type: Number },
    minPerson: { type: Number },
    duration: { type: String },
    content: { type: String },

    banner: [
      {
        title: { type: String },
        subTitle: { type: String },
        bannerImage: { type: String },
      },
    ],
    overviewInfo: [
      {
        title: { type: String },
        description: [String],
      },
    ],
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
    // importantInfo: { type: String },
    importantInfo: [contentBlockSchema],
  },
  { timestamps: true }
);


/* ================= SLUG GENERATOR ================= */
// activitySchema.pre("save", async function (next) {
//   if (!this.isModified("activityName")) return next();

//   let baseSlug = slugify(this.activityName, {
//     lower: true,
//     strict: true,
//   });

//   let slug = baseSlug;
//   let count = 1;

//   while (
//     await mongoose.models.Activity.findOne({
//       slug,
//       _id: { $ne: this._id },
//     })
//   ) {
//     slug = `${baseSlug}-${count++}`;
//   }

//   this.slug = slug;
//   next();
// });

/* ================= SLUG FROM BANNER TITLE ================= */

activitySchema.pre("save", async function (next) {
  if (!this.banner?.length || !this.banner[0]?.title) return next();

  if (!this.isModified("banner") && this.slug) return next();

  const baseSlug = slugify(this.banner[0].title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Activity.findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

activitySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const banner = update.banner || update.$set?.banner;

  if (!banner?.length || !banner[0]?.title) return next();

  const baseSlug = slugify(banner[0].title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Activity.findOne({
      slug,
      _id: { $ne: this.getQuery()._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  if (update.$set) update.$set.slug = slug;
  else update.slug = slug;

  next();
});

export default mongoose.model("Activity", activitySchema);
