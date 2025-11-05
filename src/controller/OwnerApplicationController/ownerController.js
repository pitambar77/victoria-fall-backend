

// // According to owner applicatio


import OwnerApplication from "../../models/OwnerApplicationModel/OwnerApplication.js";

export const createOwnerApplication = async (req, res) => {
  try {
    const { files = {} } = req;
    const data = req.body;

    // Parse checkboxes or booleans coming as strings ("true"/"false")
    const parseBoolean = (value) =>
      value === "true" || value === true ? true : false;

    // Create new application object
    const newApplication = new OwnerApplication({
      // Common fields
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      phone: data.phone,
      wpnumber: data.wpnumber,
      roleType: data.roleType,

      // -----------------------------
      // PROPERTY OWNER FIELDS
      // -----------------------------
      propertyName: data.propertyName,
      address: data.address,
      mapLink: data.mapLink,
      propertyType: data.propertyType,
      rooms: data.rooms,
      bathrooms: data.bathrooms,
      loungs: data.loungs,
      kitchen: data.kitchen,
      dining: data.dining,
      outdoor: data.outdoor,
      capacity: data.capacity,

      wifi: parseBoolean(data.wifi),
      tv: parseBoolean(data.tv),
      security: parseBoolean(data.security),
      laundry: parseBoolean(data.laundry),
      parking: parseBoolean(data.parking),
      pool: parseBoolean(data.pool),
      staff: parseBoolean(data.staff),
      ac: parseBoolean(data.ac),

      kitchenFacilities: data.kitchenFacilities,
      selfCatering: data.selfCatering,
      cleaningDetails: data.cleaningDetails,
      description: data.description,

      zimraBP: data.zimraBP,
      ztaMembership: data.ztaMembership,
      tradingLicense: data.tradingLicense,
      insuranceDetails: data.insuranceDetails,

      bankName: data.bankName,
      branchName: data.branchName,
      branchAddress: data.branchAddress,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      swiftCode: data.swiftCode,

      seasonalRates: data.seasonalRates,
      rateType: data.rateType,
      rateBasis: data.rateBasis,
      rateInclusions: data.rateInclusions,

      heroImage: files.heroImage?.[0]?.path || "",
      bedroomImages: files.bedroomImages?.map((f) => f.path) || [],
      bathroomImages: files.bathroomImages?.map((f) => f.path) || [],
      kitchenImages: files.kitchenImages?.map((f) => f.path) || [],
      outdoorImages: files.outdoorImages?.map((f) => f.path) || [],

      // -----------------------------
      // RESTAURANT OWNER FIELDS
      // -----------------------------
      restaurantName: data.restaurantName,
      category: data.category,
      seatingCapacity: data.seatingCapacity,
      mealavailable: data.mealavailable,
      licenseNo: data.licenseNo,
      restaurantDescription: data.description, // for restaurant desc
      exteriorImages: files.exteriorImages?.map((f) => f.path) || [],
      interiorImages: files.interiorImages?.map((f) => f.path) || [],
      restaurantKitchenImages: files.kitchenImages?.map((f) => f.path) || [],
      diningImages: files.diningImages?.map((f) => f.path) || [],

      // -----------------------------
      // ACTIVITY / EXPERIENCE PROVIDER FIELDS
      // -----------------------------
      activityName: data.activityName,
      activityType: data.activityType,
      duration: data.duration,
      pricePerPerson: data.pricePerPerson,
      tourism: files.tourism?.[0]?.path || data.tourism || "",
      activityDescription: data.description, // for activity desc
      activityImages: files.activityImages?.map((f) => f.path) || [],
      activityscImages: files.activityscImages?.map((f) => f.path) || [],
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error creating owner application:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ===============================================
// Get All Owner Applications
// ===============================================
export const getAllOwnerApplications = async (req, res) => {
  try {
    const applications = await OwnerApplication.find().sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ===============================================
// Get Single Owner Application by ID
// ===============================================
export const getOwnerApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await OwnerApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// // role based

// import OwnerApplication from "../../models/OwnerApplicationModel/OwnerApplication.js";

// export const createOwnerApplication = async (req, res) => {
//   try {
//     const { files = {} } = req;
//     const data = req.body;
//     const { roleType } = data;

//     // Parse boolean checkbox values
//     const parseBoolean = (value) =>
//       value === "true" || value === true ? true : false;

//     // Base object (common fields)
//     const newApplicationData = {
//       fullName: data.fullName,
//       businessName: data.businessName,
//       email: data.email,
//       phone: data.phone,
//       wpnumber: data.wpnumber,
//       roleType,
//     };

//     // ===========================
//     // PROPERTY OWNER FIELDS
//     // ===========================
//     if (roleType === "property") {
//       Object.assign(newApplicationData, {
//         propertyName: data.propertyName,
//         address: data.address,
//         mapLink: data.mapLink,
//         propertyType: data.propertyType,
//         rooms: data.rooms,
//         bathrooms: data.bathrooms,
//         loungs: data.loungs,
//         kitchen: data.kitchen,
//         dining: data.dining,
//         outdoor: data.outdoor,
//         capacity: data.capacity,

//         wifi: parseBoolean(data.wifi),
//         tv: parseBoolean(data.tv),
//         security: parseBoolean(data.security),
//         laundry: parseBoolean(data.laundry),
//         parking: parseBoolean(data.parking),
//         pool: parseBoolean(data.pool),
//         staff: parseBoolean(data.staff),
//         ac: parseBoolean(data.ac),

//         kitchenFacilities: data.kitchenFacilities,
//         selfCatering: data.selfCatering,
//         cleaningDetails: data.cleaningDetails,
//         description: data.description,

//         zimraBP: data.zimraBP,
//         ztaMembership: data.ztaMembership,
//         tradingLicense: data.tradingLicense,
//         insuranceDetails: data.insuranceDetails,

//         bankName: data.bankName,
//         branchName: data.branchName,
//         branchAddress: data.branchAddress,
//         accountName: data.accountName,
//         accountNumber: data.accountNumber,
//         swiftCode: data.swiftCode,

//         seasonalRates: data.seasonalRates,
//         rateType: data.rateType,
//         rateBasis: data.rateBasis,
//         rateInclusions: data.rateInclusions,

//         heroImage: files.heroImage?.[0]?.path || "",
//         bedroomImages: files.bedroomImages?.map((f) => f.path) || [],
//         bathroomImages: files.bathroomImages?.map((f) => f.path) || [],
//         kitchenImages: files.kitchenImages?.map((f) => f.path) || [],
//         outdoorImages: files.outdoorImages?.map((f) => f.path) || [],
//       });
//     }

//     // ===========================
//     // RESTAURANT OWNER FIELDS
//     // ===========================
//     if (roleType === "restaurant") {
//       Object.assign(newApplicationData, {
//         restaurantName: data.restaurantName,
//         category: data.category,
//         seatingCapacity: data.seatingCapacity,
//         mealavailable: data.mealavailable,
//         licenseNo: data.licenseNo,
//         restaurantDescription: data.description,
//         licenseFile: files.licenseFile?.[0]?.path || "",
//         logo: files.logo?.[0]?.path || "",
//         banner: files.banner?.[0]?.path || "",
//         exteriorImages: files.exteriorImages?.map((f) => f.path) || [],
//         interiorImages: files.interiorImages?.map((f) => f.path) || [],
//         restaurantKitchenImages: files.restaurantKitchenImages?.map((f) => f.path) || [],
//         diningImages: files.diningImages?.map((f) => f.path) || [],
//       });
//     }

//     // ===========================
//     // ACTIVITY / EXPERIENCE PROVIDER FIELDS
//     // ===========================
//     if (roleType === "activity") {
//       Object.assign(newApplicationData, {
//         activityName: data.activityName,
//         activityType: data.activityType,
//         duration: data.duration,
//         pricePerPerson: data.pricePerPerson,
//         tourism: files.tourism?.[0]?.path || data.tourism || "",
//         activityDescription: data.description,
//         activityImages: files.activityImages?.map((f) => f.path) || [],
//         activityscImages: files.activityscImages?.map((f) => f.path) || [],
//       });
//     }

//     // ===========================
//     // Save to DB
//     // ===========================
//     const newApplication = new OwnerApplication(newApplicationData);
//     await newApplication.save();

//     res.status(201).json({
//       message: "Application submitted successfully",
//       application: newApplication,
//     });
//   } catch (error) {
//     console.error("❌ Error creating owner application:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// // ===============================================
// // Get All Owner Applications
// // ===============================================
// export const getAllOwnerApplications = async (req, res) => {
//   try {
//     const applications = await OwnerApplication.find().sort({ createdAt: -1 });
//     res.status(200).json({ applications });
//   } catch (error) {
//     console.error("❌ Error fetching applications:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// // ===============================================
// // Get Single Owner Application by ID
// // ===============================================
// export const getOwnerApplicationById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const application = await OwnerApplication.findById(id);
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }
//     res.status(200).json({ application });
//   } catch (error) {
//     console.error("❌ Error fetching application:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };
