// import Restaurant from "../models/Restaurant.js";
// import cloudinary from "../config/cloudinary.js";

// // Create restaurant
// export const createRestaurant = async (req, res) => {
//   try {
//     const { name, overview, subDescription, address1, address2, openingTime, closingTime } = req.body;
//     const bannerImage = req.files?.bannerImage?.[0]?.path;
//     const galleryImages = req.files?.galleryImages?.map((file) => file.path) || [];

//     const restaurant = new Restaurant({
//       name,
//       overview,
//       subDescription,
//       address1,
//       address2,
//       openingTime,
//       closingTime,
//       bannerImage,
//       galleryImages,
//     });

//     await restaurant.save();
//     res.status(201).json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all
// export const getRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find();
//     res.json(restaurants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single
// export const getRestaurantById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update
// export const updateRestaurant = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     if (req.files?.bannerImage?.[0]) {
//       updateData.bannerImage = req.files.bannerImage[0].path;
//     }
//     if (req.files?.galleryImages) {
//       updateData.galleryImages = req.files.galleryImages.map((file) => file.path);
//     }

//     const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete
// export const deleteRestaurant = async (req, res) => {
//   try {
//     await Restaurant.findByIdAndDelete(req.params.id);
//     res.json({ message: "Restaurant deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add menu item
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

// // Delete menu item
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

// // Add facility
// export const addFacility = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     restaurant.facilities.push(req.body);
//     await restaurant.save();
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete facility
// export const deleteFacility = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     restaurant.facilities.id(req.params.facilityId).remove();
//     await restaurant.save();
//     res.json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Restaurant from "../models/Restaurant.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Restaurant
export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      overview,
      subDescription,
      address1,
      address2,
      openingTime,
      closingTime,
      contactNumber,
      priceperPerson,
      menu,
    } = req.body;

    const bannerImage = req.files?.bannerImage?.[0]?.path || null;
    const galleryImages =
      req.files?.galleryImages?.map((file) => file.path) || [];

    const restaurant = new Restaurant({
      name,
      overview,
      subDescription,
      address1,
      address2,
      openingTime,
      closingTime,
      contactNumber,
      priceperPerson,
      bannerImage,
      galleryImages,
      menu: menu ? JSON.parse(menu) : [], // ✅ parse menu JSON
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get One
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

// ✅ Update
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.files?.bannerImage?.[0]) {
      updateData.bannerImage = req.files.bannerImage[0].path;
    }

    if (req.files?.galleryImages) {
      updateData.galleryImages = req.files.galleryImages.map(
        (file) => file.path
      );
    }

       // ✅ parse menu if exists
    if (updateData.menu) {
      updateData.menu = JSON.parse(updateData.menu);
    }

    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted successfully" });
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