import mongoose from "mongoose";

const overviewinfoSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const qaSchema = new mongoose.Schema(
  {
    question: { type: String },

    answer: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const faqSectionSchema = new mongoose.Schema(
  {
    title: { type: String },

    subtitle: { type: String },

    faqs: {
      type: [qaSchema],
      default: [],
    },
  },
  { _id: false }
);

const homeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    imagePublicId: {
      type: String,
      default: "",
    },

    overviewinfo: overviewinfoSchema,

    servicesoverview: {
      title: { type: String },
      description: {
        type: String,
        default: "",
      },
    },
    propertyoverview: {
      title: { type: String },
      description: {
        type: String,
        default: "",
      },
    },
    reviews: [
      {
        name: { type: String },
        review: {
          type: String,
          default: "",
        },
      },
    ],

    faq: [faqSectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("HomePageModel", homeSchema);
