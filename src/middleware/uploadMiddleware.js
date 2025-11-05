import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir("uploads/banners");
ensureDir("uploads/gallery");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "bannerImages") cb(null, "uploads/banners");
    else if (file.fieldname === "galleryImages") cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
