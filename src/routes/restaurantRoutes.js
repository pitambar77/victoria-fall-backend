// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   createRestaurant,
//   getRestaurants,
//   getRestaurantById,
//   updateRestaurant,
//   deleteRestaurant,
//   // addMenuItem,
//   // deleteMenuItem,
//   addFacility,
//   deleteFacility,
//     addMenuCategory,
//   updateMenuCategory,
//   deleteMenuCategory,
//   addMenuItem,
//   updateMenuItem,
//   deleteMenuItem
// } from "../controller/restaurantController.js";

// const router = express.Router();

// router.post(
//   "/",
//   upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }]),
//   createRestaurant
// );

// router.get("/", getRestaurants);
// router.get("/:id", getRestaurantById);
// router.put(
//   "/:id",
//   upload.fields([{ name: "bannerImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }]),
//   updateRestaurant
// );
// router.delete("/:id", deleteRestaurant);

// // router.post("/:id/menu", addMenuItem);
// // router.delete("/:id/menu/:menuId", deleteMenuItem);

// router.post("/:id/facility", addFacility);
// router.delete("/:id/facility/:facilityId", deleteFacility);




// /* ===== MENU CATEGORY CRUD ===== */
// router.post("/menu/category", addMenuCategory);
// router.put("/menu/category", updateMenuCategory);
// router.delete("/menu/category", deleteMenuCategory);

// /* ===== MENU ITEM CRUD ===== */
// router.post("/menu/item", addMenuItem);
// router.put("/menu/item", updateMenuItem);
// router.delete("/menu/item", deleteMenuItem);

// export default router;


// bellow code working

// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   createRestaurant,
//   getRestaurants,
//   getRestaurantById,
//   updateRestaurant,
//   deleteRestaurant,
//   addFacility,
//   deleteFacility,
//   addMenuCategory,
//   updateMenuCategory,
//   deleteMenuCategory,
//   addMenuItem,
//   updateMenuItem,
//   deleteMenuItem,
//   removeGalleryImage,
//   addGalleryImage,
// } from "../controller/restaurantController.js";

// const router = express.Router();

// /* ================= RESTAURANT CRUD ================= */

// router.post(
//   "/",
//   upload.fields([
//     { name: "bannerImage", maxCount: 1 },
//     { name: "galleryImages", maxCount: 10 },
//   ]),
//   createRestaurant
// );

// router.get("/", getRestaurants);
// router.get("/:id", getRestaurantById);

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "bannerImage", maxCount: 1 },
//     { name: "galleryImages", maxCount: 10 },
//   ]),
//   updateRestaurant
// );

// router.delete("/:id", deleteRestaurant);

// /* ================= FACILITY ================= */

// router.post("/:id/facility", addFacility);
// router.delete("/:id/facility/:facilityId", deleteFacility);

// /* ================= GALLERY ================= */

// // remove single image
// router.put("/:id/gallery-image", removeGalleryImage);

// // add single image
// router.post(
//   "/:id/gallery-image",
//   upload.single("galleryImage"),
//   addGalleryImage
// );

// /* ================= MENU CATEGORY ================= */

// router.post("/menu/category", addMenuCategory);
// router.put("/menu/category", updateMenuCategory);
// router.delete("/menu/category", deleteMenuCategory);

// /* ================= MENU ITEM ================= */

// router.post("/menu/item", addMenuItem);
// router.put("/menu/item", updateMenuItem);
// router.delete("/menu/item", deleteMenuItem);

// export default router;


import express from "express";
import upload from "../middleware/upload.js";
import {
  createRestaurant,
  getRestaurants,
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
