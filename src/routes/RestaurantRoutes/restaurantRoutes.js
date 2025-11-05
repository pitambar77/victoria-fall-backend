import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  deleteBannerImage,
  deleteGalleryImage,
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../../controller/RestaurantController/restaurantController.js";

import { upload } from "../../middleware/uploadMiddleware.js";

const router = express.Router();

/* ===== RESTAURANT CRUD ===== */
router.post("/", upload.fields([
  { name: "bannerImages", maxCount: 5 },
  { name: "galleryImages", maxCount: 10 }
]), createRestaurant);

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

router.put("/:id", upload.fields([
  { name: "bannerImages", maxCount: 5 },
  { name: "galleryImages", maxCount: 10 }
]), updateRestaurant);

router.delete("/:id", deleteRestaurant);

/* ===== IMAGE DELETE ===== */
router.delete("/banner-image", deleteBannerImage);
router.delete("/gallery-image", deleteGalleryImage);

/* ===== MENU CATEGORY CRUD ===== */
router.post("/menu/category", addMenuCategory);
router.put("/menu/category", updateMenuCategory);
router.delete("/menu/category", deleteMenuCategory);

/* ===== MENU ITEM CRUD ===== */
router.post("/menu/item", addMenuItem);
router.put("/menu/item", updateMenuItem);
router.delete("/menu/item", deleteMenuItem);

export default router;
