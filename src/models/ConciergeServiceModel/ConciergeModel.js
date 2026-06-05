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

const conciergeSchema = new mongoose.Schema(
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

    homeServiceSection: {
      title: {
        type: String,
        default: "",
      },
    },

    homeService: [
      {
        title: String,
        description: String,
        image: String,
        imagePublicId: String,
      },
    ],

    culturalServiceSection: {
      title: {
        type: String,
        default: "",
      },
    },
    culturalService: [
      {
        title: { type: String },
        description: {
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
      },
    ],

    beautywellnesServiceSection: {
      title: {
        type: String,
        default: "",
      },
    },
    beautywellnesService: [
      {
        title: { type: String },
        description: {
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
      },
    ],
    privateeventServiceSection: {
      title: {
        type: String,
        default: "",
      },
    },
    privateeventService: [
      {
        title: { type: String },
        description: {
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
      },
    ],
    foodServiceSection: {
      title: {
        type: String,
        default: "",
      },
    },
    foodService: [
      {
        title: { type: String },
        description: {
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
      },
    ],

    faq: [faqSectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("ConciergeModel", conciergeSchema);
