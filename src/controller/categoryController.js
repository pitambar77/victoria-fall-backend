import Category from "../models/Category.js";

// Create
export const createCategory = async (req, res) => {
  try {
    const { name, destination } = req.body;
    if (!name || !destination) return res.status(400).json({ message: "Name and destination required" });
    const bannerImage = req.file?.path || "";
    const category = await Category.create({ name, destination, bannerImage });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get by Destination
export const getCategoriesByDestination = async (req, res) => {
  try {
    const categories = await Category.find({ destination: req.params.destinationId });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.name = req.body.name || category.name;
    if (req.file?.path) category.bannerImage = req.file.path;

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
