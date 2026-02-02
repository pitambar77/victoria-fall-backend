


// import Restaurant from "../models/Restaurant.js";
// import cloudinary from "../config/cloudinary.js";

// const getPublicIdFromUrl = (url) => {
//   if (!url) return null;
//   const parts = url.split("/");
//   const filename = parts[parts.length - 1];
//   return filename.split(".")[0];
// };


// // ✅ Create Restaurant
// export const createRestaurant = async (req, res) => {
//   try {
//     const {
//       name,
//       overview,
//       subDescription,
//       address1,
//       address2,
//       openingTime,
//       closingTime,
//       contactNumber,
//       priceperPerson,
//       menu,
//     } = req.body;

//     const bannerImage = req.files?.bannerImage?.[0]?.path || null;
//     const galleryImages =
//       req.files?.galleryImages?.map((file) => file.path) || [];

//     const restaurant = new Restaurant({
//       name,
//       overview,
//       subDescription,
//       address1,
//       address2,
//       openingTime,
//       closingTime,
//       contactNumber,
//       priceperPerson,
//       bannerImage,
//       galleryImages,
//       menu: menu ? JSON.parse(menu) : [], // ✅ parse menu JSON
//     });

//     await restaurant.save();
//     res.status(201).json(restaurant);
//   } catch (error) {
//     console.error("Error creating restaurant:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get All
// export const getRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find();
//     res.json(restaurants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get One
// export const getRestaurantById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Update
// // export const updateRestaurant = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updateData = { ...req.body };

// //     if (req.files?.bannerImage?.[0]) {
// //       updateData.bannerImage = req.files.bannerImage[0].path;
// //     }

// //     if (req.files?.galleryImages) {
// //       updateData.galleryImages = req.files.galleryImages.map(
// //         (file) => file.path
// //       );
// //     }

// //        // ✅ parse menu if exists
// //     if (updateData.menu) {
// //       updateData.menu = JSON.parse(updateData.menu);
// //     }

// //     const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
// //       new: true,
// //     });

// //     if (!restaurant)
// //       return res.status(404).json({ message: "Restaurant not found" });

// //     res.json(restaurant);
// //   } catch (error) {
// //     console.error("Error updating restaurant:", error);
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const updateRestaurant = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = { ...req.body };

//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     /* ========= BANNER IMAGE ========= */
//     if (req.files?.bannerImage?.[0] && restaurant.bannerImage) {
//       const publicId = getPublicIdFromUrl(restaurant.bannerImage);
//       if (publicId) await cloudinary.uploader.destroy(publicId);

//       updateData.bannerImage = req.files.bannerImage[0].path;
//     }

//     /* ========= GALLERY IMAGES (replace only if new uploaded) ========= */
//     if (req.files?.galleryImages?.length) {
//       for (const img of restaurant.galleryImages) {
//         const publicId = getPublicIdFromUrl(img);
//         if (publicId) await cloudinary.uploader.destroy(publicId);
//       }

//       updateData.galleryImages = req.files.galleryImages.map(
//         (file) => file.path
//       );
//     }

//     /* ========= JSON FIELDS ========= */
//     if (updateData.menu) {
//       updateData.menu = JSON.parse(updateData.menu);
//     }

//     if (updateData.facilities) {
//       updateData.facilities = JSON.parse(updateData.facilities);
//     }

//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     res.json(updatedRestaurant);
//   } catch (error) {
//     console.error("Update restaurant error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const removeGalleryImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { image } = req.body;

//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     restaurant.galleryImages = restaurant.galleryImages.filter(
//       (img) => img !== image
//     );

//     const publicId = getPublicIdFromUrl(image);
//     if (publicId) await cloudinary.uploader.destroy(publicId);

//     await restaurant.save();
//     res.json(restaurant);
//   } catch (error) {
//     console.error("Remove gallery image error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const addGalleryImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!req.file)
//       return res.status(400).json({ message: "No image uploaded" });

//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     restaurant.galleryImages.push(req.file.path);
//     await restaurant.save();

//     res.json(restaurant);
//   } catch (error) {
//     console.error("Add gallery image error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


// // ✅ Delete
// // export const deleteRestaurant = async (req, res) => {
// //   try {
// //     const restaurant = await Restaurant.findById(req.params.id);
// //     if (!restaurant)
// //       return res.status(404).json({ message: "Restaurant not found" });

// //     await Restaurant.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Restaurant deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// export const deleteRestaurant = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     if (restaurant.bannerImage) {
//       const publicId = getPublicIdFromUrl(restaurant.bannerImage);
//       if (publicId) await cloudinary.uploader.destroy(publicId);
//     }

//     for (const img of restaurant.galleryImages) {
//       const publicId = getPublicIdFromUrl(img);
//       if (publicId) await cloudinary.uploader.destroy(publicId);
//     }

//     await Restaurant.findByIdAndDelete(req.params.id);
//     res.json({ message: "Restaurant deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//feb-2 changes

import Restaurant from "../models/Restaurant.js";
import cloudinary from "../config/cloudinary.js";

/* ================= UTIL ================= */
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return filename.split(".")[0];
};

/* ================= CREATE ================= */
export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      shortTitle,
      resturantType,
      overviewTittle,
      overview,
      subDescription,
      address1,
      address2,
      openingTime,
      closingTime,
      contactNumber,
      priceperPerson,
      menu,
      facilities,
    } = req.body;

    const bannerImage = req.files?.bannerImage?.[0]?.path || "";
    const overviewImage = req.files?.overviewImage?.[0]?.path || "";
    const galleryImages =
      req.files?.galleryImages?.map((file) => file.path) || [];

    const restaurant = new Restaurant({
      name,
      shortTitle,
      resturantType,
      overviewTittle,
      overview,
      subDescription,
      address1,
      address2,
      openingTime,
      closingTime,
      contactNumber,
      priceperPerson,
      bannerImage,
      overviewImage,
      galleryImages,
      menu: menu ? JSON.parse(menu) : [],
      facilities: facilities ? JSON.parse(facilities) : [],
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Create restaurant error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL ================= */
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ONE ================= */
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const restaurant = await Restaurant.findOne({ slug });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE ================= */
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    /* ===== Banner ===== */
    // if (req.files?.bannerImage?.[0] && restaurant.bannerImage) {
    //   const publicId = getPublicIdFromUrl(restaurant.bannerImage);
    //   if (publicId) await cloudinary.uploader.destroy(publicId);
    //   updateData.bannerImage = req.files.bannerImage[0].path;
    // }

    if (req.files?.bannerImage?.[0]) {
  if (restaurant.bannerImage) {
    const publicId = getPublicIdFromUrl(restaurant.bannerImage);
    if (publicId) await cloudinary.uploader.destroy(publicId);
  }
  updateData.bannerImage = req.files.bannerImage[0].path;
}


    /* ===== Overview Image ===== */
    // if (req.files?.overviewImage?.[0] && restaurant.overviewImage) {
    //   const publicId = getPublicIdFromUrl(restaurant.overviewImage);
    //   if (publicId) await cloudinary.uploader.destroy(publicId);
    //   updateData.overviewImage = req.files.overviewImage[0].path;
    // }

    if (req.files?.overviewImage?.[0]) {
  if (restaurant.overviewImage) {
    const publicId = getPublicIdFromUrl(restaurant.overviewImage);
    if (publicId) await cloudinary.uploader.destroy(publicId);
  }
  updateData.overviewImage = req.files.overviewImage[0].path;
}


    /* ===== Gallery ===== */
    if (req.files?.galleryImages?.length) {
      for (const img of restaurant.galleryImages) {
        const publicId = getPublicIdFromUrl(img);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      updateData.galleryImages = req.files.galleryImages.map(
        (file) => file.path
      );
    }

    /* ===== JSON ===== */
    if (updateData.menu)
      updateData.menu = JSON.parse(updateData.menu);

    if (updateData.facilities)
      updateData.facilities = JSON.parse(updateData.facilities);

    const updated = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    console.error("Update restaurant error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const images = [
      restaurant.bannerImage,
      restaurant.overviewImage,
      ...restaurant.galleryImages,
    ];

    for (const img of images) {
      const publicId = getPublicIdFromUrl(img);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GALLERY ================= */
export const removeGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    restaurant.galleryImages = restaurant.galleryImages.filter(
      (img) => img !== image
    );

    const publicId = getPublicIdFromUrl(image);
    if (publicId) await cloudinary.uploader.destroy(publicId);

    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    restaurant.galleryImages.push(req.file.path);
    await restaurant.save();

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// // ✅ Add Menu Item
// export const addMenuItem = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     restaurant.menu.push(req.body);
//     await restaurant.save();
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Delete Menu Item
// export const deleteMenuItem = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     restaurant.menu.id(req.params.menuId).remove();
//     await restaurant.save();
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// ✅ Add Facility
export const addFacility = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.facilities.push(req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Facility
export const deleteFacility = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.facilities.id(req.params.facilityId).remove();
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===== Menu Category ========

export const addMenuCategory = async (req, res) => {
  try {
    const { restaurantId, category } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    restaurant.menu.push({ category, items: [] });
    await restaurant.save();
    res.status(200).json({ message: "Category added", menu: restaurant.menu });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const updateMenuCategory = async (req, res) => {
  try {
    const { restaurantId, categoryId, newCategoryName } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const category = restaurant.menu.id(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.category = newCategoryName;
    await restaurant.save();
    res.status(200).json({ message: "Category updated", menu: restaurant.menu });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteMenuCategory = async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    restaurant.menu.id(categoryId).remove();
    await restaurant.save();
    res.status(200).json({ message: "Category deleted", menu: restaurant.menu });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ===== MENU ITEM CRUD ===== */
export const addMenuItem = async (req, res) => {
  try {
    const { restaurantId, categoryId, name, ingredients, price } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const category = restaurant.menu.id(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.items.push({ name, ingredients, price });
    await restaurant.save();
    res.status(200).json({ message: "Item added", items: category.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { restaurantId, categoryId, itemId, name, ingredients, price } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const category = restaurant.menu.id(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const item = category.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name || item.name;
    item.ingredients = ingredients || item.ingredients;
    item.price = price || item.price;

    await restaurant.save();
    res.status(200).json({ message: "Item updated", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, categoryId, itemId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const category = restaurant.menu.id(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.items.id(itemId).remove();
    await restaurant.save();
    res.status(200).json({ message: "Item deleted", items: category.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};