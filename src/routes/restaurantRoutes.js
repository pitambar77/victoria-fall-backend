import express from "express";
import upload from "../middleware/upload.js";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantBySlug, // ✅ ADD THIS
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  removeGalleryImage,
  addGalleryImage,
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controller/restaurantController.js";

const router = express.Router();

/* ================= RESTAURANT CRUD ================= */

router.post(
  "/",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createRestaurant
);

router.get("/", getRestaurants);
// ✅ SLUG ROUTE — MUST BE BEFORE `/:id`
router.get("/slug/:slug", getRestaurantBySlug);
router.get("/:id", getRestaurantById);

router.put(
  "/:id",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateRestaurant
);

router.delete("/:id", deleteRestaurant);

/* ================= GALLERY ================= */
router.put("/:id/gallery-image", removeGalleryImage);
router.post(
  "/:id/gallery-image",
  upload.single("galleryImage"),
  addGalleryImage
);

/* ================= MENU CATEGORY ================= */
router.post("/menu/category", addMenuCategory);
router.put("/menu/category", updateMenuCategory);
router.delete("/menu/category", deleteMenuCategory);

/* ================= MENU ITEM ================= */
router.post("/menu/item", addMenuItem);
router.put("/menu/item", updateMenuItem);
router.delete("/menu/item", deleteMenuItem);

export default router;
