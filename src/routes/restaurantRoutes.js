import express from "express";
import upload from "../middleware/upload.js";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  // addMenuItem,
  // deleteMenuItem,
  addFacility,
  deleteFacility,
    addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controller/restaurantController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }]),
  createRestaurant
);

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.put(
  "/:id",
  upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }]),
  updateRestaurant
);
router.delete("/:id", deleteRestaurant);

// router.post("/:id/menu", addMenuItem);
// router.delete("/:id/menu/:menuId", deleteMenuItem);

router.post("/:id/facility", addFacility);
router.delete("/:id/facility/:facilityId", deleteFacility);

/* ===== MENU CATEGORY CRUD ===== */
router.post("/menu/category", addMenuCategory);
router.put("/menu/category", updateMenuCategory);
router.delete("/menu/category", deleteMenuCategory);

/* ===== MENU ITEM CRUD ===== */
router.post("/menu/item", addMenuItem);
router.put("/menu/item", updateMenuItem);
router.delete("/menu/item", deleteMenuItem);

export default router;
