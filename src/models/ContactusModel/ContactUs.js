import mongoose from "mongoose";

const ContactusSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    
    subject: {
  type: String,
  required: true
},
message:{
    type:String
}
  },
  { timestamps: true }
);

const Contactus = mongoose.model("Contactus", ContactusSchema);
export default Contactus;
