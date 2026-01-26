import Destination from "../models/Destination.js";

// Create
export const createDestination = async (req, res) => {
  try {
    const { name,overview } = req.body;
    const bannerImage = req.file?.path || "";
    const dest = await Destination.create({ name,overview, bannerImage });
    res.status(201).json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get All
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get One
export const getDestination = async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if (!dest) return res.status(404).json({ message: "Destination not found" });
    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get Destination by Slug
export const getDestinationBySlug = async (req, res) => {
  try {
    const dest = await Destination.findOne({ slug: req.params.slug });

    if (!dest) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Update
// export const updateDestination = async (req, res) => {
//   try {
//     const { name,overview } = req.body;
//     const bannerImage = req.file?.path;
//     const dest = await Destination.findByIdAndUpdate(
//       req.params.id,
//       { name,overview, ...(bannerImage && { bannerImage }) },
//       { new: true }
//     );
//     if (!dest) return res.status(404).json({ message: "Destination not found" });
//     res.json(dest);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

export const updateDestination = async (req, res) => {
  try {
    const { name, overview } = req.body;
    const bannerImage = req.file?.path;

    const dest = await Destination.findById(req.params.id);
    if (!dest) {
      return res.status(404).json({ message: "Destination not found" });
    }

    if (name) dest.name = name;
    if (overview) dest.overview = overview;
    if (bannerImage) dest.bannerImage = bannerImage;

    // ✅ THIS triggers slug generation
    await dest.save();

    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Delete
export const deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: "Destination deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
