// // import mongoose from "mongoose";

// // const { Schema } = mongoose;

// // const AddressSchema = new Schema({
// //   address1: { type: String },
// //   address2: { type: String }
// // }, { _id: false });

// // const PropertySchema = new Schema(
// //   {
// //     name: { type: String, required: true },
// //     subDescription: { type: String },       // short subtitle
// //     overviewContent: { type: String },      // overview
// //     description: { type: String },          // long description
// //     propertyType: { type: String },         // e.g., apartment, villa
// //     checkIn: { type: String },              // could be times or date strings
// //     checkOut: { type: String },
// //     bannerImage: { type: String },          // path to banner image
// //     address: AddressSchema,
// //     gallery: [{ type: String }],            // array of image paths
// //     services: [{ type: String }],           // array of strings like "TV", "WiFi", etc.
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("Property", PropertySchema);

// //=======================================================================================================================

// import mongoose from "mongoose";

// const contentBlockSchema = new mongoose.Schema({
//   type: { type: String, enum: ["header", "paragraph", "list"], required: true },
//   content: { type: mongoose.Schema.Types.Mixed, required: true },
// });

// const propertySchema = new mongoose.Schema(
//   {
//     overview: {
//       title: String,
//       subTitle: String,
//       landingsubcontent: String,
//       description: [contentBlockSchema],
//     },
//     slug: {
//       type: String,
//       unique: true,
//     },

//     highlights: [
//       {
//         icon: String,
//         title: String,
//         description: String,
//       },
//     ],

//     aminities: {
//       basic: [
//         {
//           icon: String,
//           aminityName: String,
//         },
//       ],
//       additional: [
//         {
//           icon: String,
//           aminityName: String,
//         },
//       ],
//     },
//     area: {
//       maplink: String,
//       locationname: String,
//       relatedactivity: [
//         {
//           icon: String,
//           title: String,
//           shortDescription: String,
//         },
//       ],
//     },
//     rooms: [
//       {
//         bedroomName: String,
//         icon: String,
//         bed: String,
//       },
//     ],
//     bathrooms: [
//       {
//         bathName: String,
//         icon: String,
//         name: String,
//       },
//     ],
//     space: [
//       {
//         icon: String,
//         title: String,
//       },
//     ],
//     houserule: {
//       checkIn: String,
//       checkOut: String,
//       content: String,
//       rule: [
//         {
//           icon: String,
//           title: String,
//           description: String,
//         },
//       ],
//     },
//     incidental: {
//       description: String, // multi para
//     },
//     information: {
//       info: [contentBlockSchema],
//     },
//     gallery: [
//       {
//         image: String,
//         imageName: String,
//         imageCategory: String,
//       },
//     ],
//     price: {
//       type: String,
//     },

//     rating: {
//       type: String,
//       default: 0,
//     },

//     reviews: {
//       type: String,
//       default: 0,
//     },
//     sleeps: {
//       type: String,
//     },

//     distance: {
//       type: String,
//     },

//     features: [
//       {
//         type: String,
//       },
//     ],

//     location: {
//       lat: {
//         type: Number,
//         required: true,
//       },
//       lng: {
//         type: Number,
//         required: true,
//       },
//     },

//     address: {
//       type: String,
//     },

//     city: {
//       type: String,
//       default: "Victoria Falls",
//     },

//     country: {
//       type: String,
//       default: "Zimbabwe",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Property", propertySchema);
