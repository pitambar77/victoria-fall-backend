import mongoose from "mongoose";
import slugify from "slugify";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // ✅ ADD SLUG
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    overview:{type:String},
    bannerImage: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

/* ================= SLUG GENERATION ================= */
destinationSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  let baseSlug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Destination.findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

export default mongoose.model("Destination", destinationSchema);
