import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema({
  type: { type: String, enum: ["header", "paragraph", "list"], required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
});

const propertySchema = new mongoose.Schema(
  {
    overview: {
      title: String,
      subTitle: String,
      landingsubcontent: String,
      description: [contentBlockSchema],
    },
    slug: {
      type: String,
      unique: true,
    },

    highlights: [
      {
        icon: String,
        title: String,
        description: String,
      },
    ],

    aminities: {
      basic: [
        {
          icon: String,
          aminityName: String,
        },
      ],
      additional: [
        {
          icon: String,
          aminityName: String,
        },
      ],
    },
    area: {
      maplink: String,
      locationname: String,
      relatedactivity: [
        {
          icon: String,
          title: String,
          shortDescription: String,
        },
      ],
    },
    rooms: [
      {
        bedroomName: String,
        icon: String,
        bed: String,
      },
    ],
    bathrooms: [
      {
        bathName: String,
        bathdetails: [
          {
            icon: String,
            name: String,
          },
        ],
      },
    ],
    space: [
      {
        icon: String,
        title: String,
      },
    ],
    houserule: {
      checkIn: String,
      checkOut: String,
      content: String,
      rule: [
        {
          icon: String,
          title: String,
          description: String,
        },
      ],
    },
    incidental: {
      description: [contentBlockSchema],
    },
    information: {
      info: [contentBlockSchema],
    },
    gallery: [
      {
        image: String,
        imageName: String,
        imageCategory: String,
      },
    ],
    price: {
      type: String,
    },
    category: {
      type: String,
    },

    rating: {
      type: String,
      
    },

    reviews: {
      type: String,
      
    },
    sleeps: {
      type: String,
    },
    guest: {
      type: String,
    },

    distance: {
      type: String,
    },

    features: [
      {
        type: String,
      },
    ],

    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },

    address: {
      type: String,
    },

    city: {
      type: String,
      
    },

    country: {
      type: String,
      
    },
  },
  { timestamps: true }
);

export default mongoose.model("PropertySchema", propertySchema);
