
import express from "express";
import upload from "../../middleware/upload.js";

import {
  createProperty,
  getProperties,
  getPropertyById,
  deleteProperty,
  addOverviewBlock,
  updateOverviewMeta,
  updateOverview,
  deleteOverviewBlock,
  addHighlight,
  updateHighlight,
  deleteHighlight,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  addBasicAmenity,
  updateBasicAmenity,
  deleteBasicAmenity,
  addAdditionalAmenity,
  updateAdditionalAmenity,
  deleteAdditionalAmenity,
  addRelatedActivity,
  updateRelatedActivity,
  deleteRelatedActivity,
  addRoom,
  updateRoom,
  deleteRoom,
  addBathroom,
  updateBathroom,
  deleteBathroom,
  addSpace,
  updateSpace,
  deleteSpace,
  addHouseRule,
  updateHouseRule,
  deleteHouseRule,
  updateHouseRuleMeta,
  updateIncidental,
  updateInformation,
  addInformationBlock,
  deleteInformationBlock,
  updatePropertyBasic,
  updateArea,
  addFeature,
  updateFeature,
  deleteFeature,
  updateLocation,
  updateAddress,
  updateSlug,
  deleteBathroomDetail,
  updateBathroomDetail,
  addBathroomDetail,
  getPropertyBySlug
} from "../../controller/PropertyController/propertyController.js";

const router = express.Router();

/* =========================================
   CREATE PROPERTY (ONE API WITH ALL FILES)
========================================= */

router.post(
  "/",
  upload.fields([
    { name: "highlightIcons", maxCount: 20 },
    { name: "galleryImages", maxCount: 50 },
    { name: "roomIcons", maxCount: 20 },
    { name: "bathroomIcons", maxCount: 20 },
    { name: "spaceIcons", maxCount: 20 },
    { name: "amenityIcons", maxCount: 50 },
    { name: "ruleIcons", maxCount: 20 },
    { name: "activityIcons", maxCount: 20 },
  ]),
  createProperty
);

/* =========================================
   PROPERTY BASIC
========================================= */

router.get("/", getProperties);
router.get("/slug/:slug", getPropertyBySlug);
router.get("/:id", getPropertyById);
router.delete("/:id", deleteProperty);

/* =========================================
   OVERVIEW
========================================= */

router.post("/:id/overview", addOverviewBlock);
router.put("/:id/overview/meta", updateOverviewMeta);
router.put("/:id/overview", updateOverview);
router.delete("/:id/overview/:blockId", deleteOverviewBlock);

/* =========================================
   HIGHLIGHTS
========================================= */

router.post("/:id/highlights", upload.single("icon"), addHighlight);
router.put(
  "/:id/highlights/:highlightId",
  upload.single("icon"),
  updateHighlight
);
router.delete("/:id/highlights/:highlightId", deleteHighlight);

/* =========================================
   GALLERY
========================================= */

router.post("/:id/gallery", upload.single("image"), addGalleryImage);
router.put("/:id/gallery/:imageId", updateGalleryImage);
router.delete("/:id/gallery/:imageId", deleteGalleryImage);

/* =========================================
   BASIC AMENITIES
========================================= */

router.post("/:id/amenities/basic", upload.single("icon"), addBasicAmenity);
router.put(
  "/:id/amenities/basic/:amenityId",
  upload.single("icon"),
  updateBasicAmenity
);
router.delete("/:id/amenities/basic/:amenityId", deleteBasicAmenity);

/* =========================================
   ADDITIONAL AMENITIES
========================================= */

router.post(
  "/:id/amenities/additional",
  upload.single("icon"),
  addAdditionalAmenity
);
router.put(
  "/:id/amenities/additional/:amenityId",
  upload.single("icon"),
  updateAdditionalAmenity
);
router.delete("/:id/amenities/additional/:amenityId", deleteAdditionalAmenity);

/* =========================================
   AREA
========================================= */

router.put("/:id/area", updateArea);

/* =========================================
   RELATED ACTIVITIES
========================================= */

router.post("/:id/activities", upload.single("icon"), addRelatedActivity);
router.put(
  "/:id/activities/:activityId",
  upload.single("icon"),
  updateRelatedActivity
);
router.delete("/:id/activities/:activityId", deleteRelatedActivity);

/* =========================================
   ROOMS
========================================= */

router.post("/:id/rooms", upload.single("icon"), addRoom);
router.put("/:id/rooms/:roomId", upload.single("icon"), updateRoom);
router.delete("/:id/rooms/:roomId", deleteRoom);

/* =========================================
   BATHROOMS
========================================= */

router.post("/:id/bathrooms", upload.single("icon"), addBathroom);
router.put("/:id/bathrooms/:bathroomId", upload.single("icon"), updateBathroom);
router.delete("/:id/bathrooms/:bathroomId", deleteBathroom);


router.post("/:id/bathrooms", addBathroom);
router.delete("/:id/bathrooms/:bathroomId", deleteBathroom);

router.post(
  "/:id/bathrooms/:bathroomId/details",
  upload.single("icon"),
  addBathroomDetail
);

router.put(
  "/:id/bathrooms/:bathroomId/details/:detailId",
  upload.single("icon"),
  updateBathroomDetail
);

router.delete(
  "/:id/bathrooms/:bathroomId/details/:detailId",
  deleteBathroomDetail
);
/* =========================================
   SPACE
========================================= */

router.post("/:id/space", upload.single("icon"), addSpace);
router.put("/:id/space/:spaceId", upload.single("icon"), updateSpace);
router.delete("/:id/space/:spaceId", deleteSpace);

/* =========================================
   HOUSE RULE META
========================================= */

router.put("/:id/house-rule/meta", updateHouseRuleMeta);

/* =========================================
   HOUSE RULE ITEMS
========================================= */

router.post("/:id/house-rule", upload.single("icon"), addHouseRule);
router.put("/:id/house-rule/:ruleId", upload.single("icon"), updateHouseRule);
router.delete("/:id/house-rule/:ruleId", deleteHouseRule);

/* =========================================
   INCIDENTAL
========================================= */

router.put("/:id/incidental", updateIncidental);

/* =========================================
   INFORMATION
========================================= */

router.post("/:id/information", addInformationBlock);
router.put("/:id/information", updateInformation);
router.delete("/:id/information/:blockId", deleteInformationBlock);

/* =========================================
   FEATURES
========================================= */

router.post("/:id/features", addFeature);
router.put("/:id/features", updateFeature);
router.delete("/:id/features", deleteFeature);

/* =========================================
   LOCATION
========================================= */

router.put("/:id/location", updateLocation);

/* =========================================
   ADDRESS
========================================= */

router.put("/:id/address", updateAddress);

/* =========================================
   SLUG
========================================= */

router.put("/:id/slug", updateSlug);

/* =========================================
   BASIC PROPERTY DATA
========================================= */

router.put("/:id/basic", updatePropertyBasic);

export default router;
