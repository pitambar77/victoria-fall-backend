// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["superadmin", "owner", "user"],
      default: "superadmin",
    }, // role includes superadmin
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
