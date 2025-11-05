// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
// const fullUploadPath = path.join(__dirname, "..", UPLOAD_DIR);

// // ensure upload dir exists
// if (!fs.existsSync(fullUploadPath)) fs.mkdirSync(fullUploadPath, { recursive: true });

// // storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, fullUploadPath);
//   },
//   filename: function (req, file, cb) {
//     // unique filename: timestamp-original
//     const ext = path.extname(file.originalname);
//     const name = `${Date.now()}-${file.fieldname}${ext}`;
//     cb(null, name);
//   },
// });

// // file filter (basic image check)
// function fileFilter(req, file, cb) {
//   const allowed = /jpeg|jpg|png|webp|gif/;
//   const ext = allowed.test(path.extname(file.originalname).toLowerCase());
//   const mime = allowed.test(file.mimetype);
//   if (ext && mime) cb(null, true);
//   else cb(new Error("Only image files are allowed"));
// }

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
// });

// export default upload;

// its working for properties

// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
// const fullUploadPath = path.join(__dirname, "..", UPLOAD_DIR);

// // ensure upload dir exists
// if (!fs.existsSync(fullUploadPath)) fs.mkdirSync(fullUploadPath, { recursive: true });

// // storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, fullUploadPath);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const name = `${Date.now()}-${file.fieldname}${ext}`;
//     cb(null, name);
//   },
// });

// // file filter (basic image check)
// function fileFilter(req, file, cb) {
//   const allowed = /jpeg|jpg|png|webp|gif/;
//   const ext = allowed.test(path.extname(file.originalname).toLowerCase());
//   const mime = allowed.test(file.mimetype);
//   if (ext && mime) cb(null, true);
//   else cb(new Error("Only image files are allowed"));
// }

// // main multer instance
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
// });

// // ✅ Specific fields for Restaurant: banner + gallery
// export const uploadRestaurant = upload.fields([
//   { name: "bannerImage", maxCount: 1 }, // single banner
//   { name: "gallery", maxCount: 10 },    // multiple gallery images
// ]);

// export default upload;


// new for cloudinary

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads",
    resource_type: "auto",
  }),
});

const upload = multer({ storage });

export default upload;
