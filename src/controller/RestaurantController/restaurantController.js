import Restaurant from "../../models/RestaurantModel/Restaurant.js";
import fs from "fs";

/* ===== RESTAURANT CRUD ===== */
export const createRestaurant = async (req, res) => {
  try {
    const { name, overview, subDescription, address1, address2, openingTime, closingTime, contactNumber, menu } = req.body;

    const bannerImages = req.files?.bannerImages?.map(f => f.path) || [];
    const galleryImages = req.files?.galleryImages?.map(f => f.path) || [];

    const restaurant = new Restaurant({
      name,
      overview,
      subDescription,
      address1,
      address2,
      openingTime,
      closingTime,
      contactNumber,
      bannerImages,
      galleryImages,
      menu: JSON.parse(menu || "[]"),
    });

    const saved = await restaurant.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { name, overview, subDescription, address1, address2, openingTime, closingTime, contactNumber, menu } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    if (req.files?.bannerImages) restaurant.bannerImages.push(...req.files.bannerImages.map(f => f.path));
    if (req.files?.galleryImages) restaurant.galleryImages.push(...req.files.galleryImages.map(f => f.path));

    restaurant.name = name || restaurant.name;
    restaurant.overview = overview || restaurant.overview;
    restaurant.subDescription = subDescription || restaurant.subDescription;
    restaurant.address1 = address1 || restaurant.address1;
    restaurant.address2 = address2 || restaurant.address2;
    restaurant.openingTime = openingTime || restaurant.openingTime;
    restaurant.closingTime = closingTime || restaurant.closingTime;
    restaurant.contactNumber = contactNumber || restaurant.contactNumber;
    if (menu) restaurant.menu = JSON.parse(menu);

    const updated = await restaurant.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ===== IMAGE DELETE ===== */
export const deleteBannerImage = async (req, res) => {
  try {
    const { restaurantId, imagePath } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    restaurant.bannerImages = restaurant.bannerImages.filter(img => img !== imagePath);
    await restaurant.save();

    // Delete file from server
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    res.status(200).json({ message: "Banner image removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { restaurantId, imagePath } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    restaurant.galleryImages = restaurant.galleryImages.filter(img => img !== imagePath);
    await restaurant.save();

    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    res.status(200).json({ message: "Gallery image removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ===== MENU CATEGORY CRUD ===== */
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
