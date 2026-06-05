import Concierge from "../../models/ConciergeServiceModel/ConciergeModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= SAFE PARSE ================= */

const safeParse = (value) => {
  if (!value) return [];

  try {
    return JSON.parse(value);
  } catch {
    if (typeof value === "string") {
      return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }

    return [];
  }
};

const safeObjectParse = (value) => {
  if (!value) return {};

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

/* ================= CLEAN HTML ================= */

const cleanHTML = (html = "") => {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<xml[^>]*>[\s\S]*?<\/xml>/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "")
    .replace(/\sdir="[^"]*"/gi, "")
    .replace(/\srole="[^"]*"/gi, "")
    .replace(/\saria-[^=]*="[^"]*"/gi, "")
    .trim();
};

/* ================= FORMAT FAQ ================= */

const formatFaq = (faqData) => {
  return safeParse(faqData).map((section) => ({
    title: section.title || "",

    subtitle: section.subtitle || "",

    faqs: (section.faqs || []).map((item) => ({
      question: item.question || "",

      answer: cleanHTML(item.answer || ""),
    })),
  }));
};

/* ================= CREATE ================= */
export const createConcierge = async (req, res) => {
  try {
    const formDataParsed = JSON.parse(req.body.formData || "{}");

    const mainImage = req.files?.mainImage?.[0];

    const homeFiles = req.files?.homeServiceImages || [];
    const culturalFiles = req.files?.culturalServiceImages || [];
    const beautyFiles = req.files?.beautywellnesServiceImages || [];
    const privateeventFiles = req.files?.privateeventServiceImages || [];
    const foodFiles = req.files?.foodServiceImages || [];

    /* ================= OVERVIEW ================= */

    const overviewData = safeObjectParse(req.body.overviewinfo);

    const overviewinfo = {
      title: overviewData.title || "",
      description: cleanHTML(overviewData.description || ""),
    };

    /**************** HOME SERVICE ****************/

    const homeServiceSection = safeObjectParse(req.body.homeServiceSection);

    const homeService = safeParse(req.body.homeService).map((item, index) => ({
      title: item.title || "",
      description: cleanHTML(item.description || ""),
      image: homeFiles[index]?.path || item.image || "",
      imagePublicId: homeFiles[index]?.filename || item.imagePublicId || "",
    }));

    /**************** CULTURAL SERVICE ****************/

    const culturalServiceSection = safeObjectParse(
      req.body.culturalServiceSection
    );

    const culturalService = safeParse(req.body.culturalService).map(
      (item, index) => ({
        title: item.title || "",
        description: cleanHTML(item.description || ""),
        image: culturalFiles[index]?.path || item.image || "",
        imagePublicId:
          culturalFiles[index]?.filename || item.imagePublicId || "",
      })
    );

    /**************** BEAUTY SERVICE ****************/

    const beautywellnesServiceSection = safeObjectParse(
      req.body.beautywellnesServiceSection
    );

    const beautywellnesService = safeParse(req.body.beautywellnesService).map(
      (item, index) => ({
        title: item.title || "",
        description: cleanHTML(item.description || ""),
        image: beautyFiles[index]?.path || item.image || "",
        imagePublicId: beautyFiles[index]?.filename || item.imagePublicId || "",
      })
    );

    /**************** PRIVATE EVENT ****************/

    const privateeventServiceSection = safeObjectParse(
      req.body.privateeventServiceSection
    );

    const privateeventService = safeParse(req.body.privateeventService).map(
      (item, index) => ({
        title: item.title || "",
        description: cleanHTML(item.description || ""),
        image: privateeventFiles[index]?.path || item.image || "",
        imagePublicId:
          privateeventFiles[index]?.filename || item.imagePublicId || "",
      })
    );

    /**************** FOOD SERVICE ****************/

    const foodServiceSection = safeObjectParse(req.body.foodServiceSection);

    const foodService = safeParse(req.body.foodService).map((item, index) => ({
      title: item.title || "",
      description: cleanHTML(item.description || ""),
      image: foodFiles[index]?.path || item.image || "",
      imagePublicId: foodFiles[index]?.filename || item.imagePublicId || "",
    }));
    /* ================= FAQ ================= */

    const faq = formatFaq(req.body.faq);

    const newDoc = await Concierge.create({
      ...formDataParsed,

      image: mainImage?.path || "",
      imagePublicId: mainImage?.filename || "",

      overviewinfo,
      homeServiceSection,
      homeService,

      culturalServiceSection,
      culturalService,

      beautywellnesServiceSection,
      beautywellnesService,

      privateeventServiceSection,
      privateeventService,

      foodServiceSection,
      foodService,
      faq,
    });

    res.status(201).json({
      message: "Concierge created successfully",
      data: newDoc,
    });
  } catch (err) {
    console.error("❌ CREATE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= GET ALL ================= */

export const getAllConcierge = async (req, res) => {
  try {
    const data = await Concierge.find().sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching list",
      error: err.message,
    });
  }
};

/* ================= GET SINGLE ================= */

export const getConciergeById = async (req, res) => {
  try {
    const page = await Concierge.findById(req.params.id);

    if (!page) {
      return res.status(404).json({
        message: "Concierge page not found",
      });
    }

    res.json(page);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching page",
      error: err.message,
    });
  }
};

/* ================= UPDATE ================= */

export const updateConcierge = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = JSON.parse(req.body.formData || "{}");

    const homeFiles = req.files?.homeServiceImages || [];
    const culturalFiles = req.files?.culturalServiceImages || [];
    const beautyFiles = req.files?.beautywellnesServiceImages || [];
    const privateeventFiles = req.files?.privateeventServiceImages || [];
    const foodFiles = req.files?.foodServiceImages || [];

    /* ================= OVERVIEW ================= */

    const overviewData = safeObjectParse(req.body.overviewinfo);

    updateData.overviewinfo = {
      title: overviewData.title || "",
      description: cleanHTML(overviewData.description || ""),
    };

    updateData.homeServiceSection = safeObjectParse(
      req.body.homeServiceSection
    );

    updateData.homeService = safeParse(req.body.homeService).map(
      (item, index) => ({
        title: item.title || "",
        description: cleanHTML(item.description || ""),
        image: homeFiles[index]?.path || item.image || "",
        imagePublicId: homeFiles[index]?.filename || item.imagePublicId || "",
      })
    );

    updateData.culturalServiceSection = safeObjectParse(
      req.body.culturalServiceSection
    );

    updateData.culturalService = safeParse(req.body.culturalService).map(
      (item, index) => ({
        title: item.title || "",
        description: cleanHTML(item.description || ""),
        image: culturalFiles[index]?.path || item.image || "",
        imagePublicId:
          culturalFiles[index]?.filename || item.imagePublicId || "",
      })
    );

    updateData.beautywellnesServiceSection = safeObjectParse(
      req.body.beautywellnesServiceSection
    );

    updateData.beautywellnesService = safeParse(
      req.body.beautywellnesService
    ).map((item, index) => ({
      title: item.title || "",
      description: cleanHTML(item.description || ""),
      image: beautyFiles[index]?.path || item.image || "",
      imagePublicId: beautyFiles[index]?.filename || item.imagePublicId || "",
    }));

    updateData.privateeventServiceSection = safeObjectParse(
      req.body.privateeventServiceSection
    );

    updateData.privateeventService = safeParse(
      req.body.privateeventService
    ).map((item, index) => ({
      title: item.title || "",
      description: cleanHTML(item.description || ""),
      image: privateeventFiles[index]?.path || item.image || "",
      imagePublicId:
        privateeventFiles[index]?.filename || item.imagePublicId || "",
    }));

    updateData.foodServiceSection = safeObjectParse(
      req.body.foodServiceSection
    );

    updateData.foodService = safeParse(req.body.foodService).map(
      (item, index) => ({
        title: item.title || "",
        description: cleanHTML(item.description || ""),
        image: foodFiles[index]?.path || item.image || "",
        imagePublicId: foodFiles[index]?.filename || item.imagePublicId || "",
      })
    );
    /* ================= FAQ ================= */

    updateData.faq = formatFaq(req.body.faq);

    /* ================= IMAGE ================= */

    if (req.files?.mainImage?.length) {
      updateData.image = req.files.mainImage[0].path;
      updateData.imagePublicId = req.files.mainImage[0].filename;
    }

    const updated = await Concierge.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Concierge page not found",
      });
    }

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */

export const deleteConcierge = async (req, res) => {
  try {
    const doc = await Concierge.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        message: "Concierge page not found",
      });
    }

    if (doc.imagePublicId) {
      await cloudinary.uploader.destroy(doc.imagePublicId);
    }

    await Concierge.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting page",
      error: err.message,
    });
  }
};
