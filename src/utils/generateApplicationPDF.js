

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import axios from "axios";
// import sharp from "sharp";

// export const generateApplicationPDF = async (application) => {
//   const filePath = `./uploads/application-${application._id}.pdf`;

//   const doc = new PDFDocument({ size: "A4", margin: 40 });

//   doc.pipe(fs.createWriteStream(filePath));

//   // ===============================
//   // HEADER
//   // ===============================

//   doc.fontSize(22).text("Property Owner Application", { align: "center" });
//   doc.moveDown();

//   // ===============================
//   // OWNER DETAILS
//   // ===============================

//   doc.fontSize(16).text("Owner Information");
//   doc.moveDown(0.5);

//   doc.fontSize(12).text(`Name: ${application.fullName}`);
//   doc.text(`Email: ${application.email}`);
//   doc.text(`Phone: ${application.phone}`);
//   doc.text(`Business: ${application.businessName || "N/A"}`);
//   doc.text(`Role Type: ${application.roleType}`);

//   doc.moveDown();

//   // ===============================
//   // PROPERTY DETAILS
//   // ===============================

//   doc.fontSize(16).text("Property Details");
//   doc.moveDown(0.5);

//   doc.fontSize(12).text(`Property Name: ${application.propertyName || "N/A"}`);
//   doc.text(`Address: ${application.address || "N/A"}`);
//   doc.text(`Property Type: ${application.propertyType || "N/A"}`);
//   doc.text(`Rooms: ${application.rooms || 0}`);
//   doc.text(`Bathrooms: ${application.bathrooms || 0}`);
//   doc.text(`Capacity: ${application.capacity || 0}`);

//   doc.moveDown();

//   doc.fontSize(16).text("Description");
//   doc.fontSize(12).text(application.description || "N/A");

//   doc.addPage();

//   // ===============================
//   // IMAGE HANDLING FUNCTION
//   // ===============================

//   const addImage = async (url, title) => {
//     try {
//       const response = await axios.get(url, {
//         responseType: "arraybuffer",
//       });

//       const buffer = Buffer.from(response.data);

//       // convert any format → PNG
//       const pngBuffer = await sharp(buffer).png().toBuffer();

//       doc.addPage();

//       doc.fontSize(18).text(title, { align: "center" });
//       doc.moveDown();

//       doc.image(pngBuffer, {
//         fit: [450, 350],
//         align: "center",
//         valign: "center",
//       });
//     } catch (error) {
//       console.log("Skipping image:", url);
//     }
//   };

//   // ===============================
//   // HERO IMAGE
//   // ===============================

//   if (application.heroImage) {
//     await addImage(application.heroImage, "Hero Image");
//   }

//   // ===============================
//   // BEDROOM GALLERY
//   // ===============================

//   if (application.bedroomImages) {
//     for (const img of application.bedroomImages) {
//       await addImage(img, "Bedroom");
//     }
//   }

//   // ===============================
//   // BATHROOM GALLERY
//   // ===============================

//   if (application.bathroomImages) {
//     for (const img of application.bathroomImages) {
//       await addImage(img, "Bathroom");
//     }
//   }

//   // ===============================
//   // KITCHEN GALLERY
//   // ===============================

//   if (application.kitchenImages) {
//     for (const img of application.kitchenImages) {
//       await addImage(img, "Kitchen");
//     }
//   }

//   // ===============================
//   // OUTDOOR GALLERY
//   // ===============================

//   if (application.outdoorImages) {
//     for (const img of application.outdoorImages) {
//       await addImage(img, "Outdoor Area");
//     }
//   }

//   doc.end();

//   return filePath;
// };


import PDFDocument from "pdfkit";
import fs from "fs";
import axios from "axios";
import sharp from "sharp";

export const generateApplicationPDF = async (application) => {
  const filePath = `./uploads/application-${application._id}.pdf`;

  const doc = new PDFDocument({
    size: "A4",
    margin: 50
  });

  doc.pipe(fs.createWriteStream(filePath));

  /* -----------------------------
      HEADER
  ------------------------------*/

  doc
    .fontSize(22)
    .fillColor("#333")
    .text("Property Owner Application", { align: "center" });

  doc.moveDown(2);

  /* -----------------------------
      HELPER FUNCTIONS
  ------------------------------*/

  const sectionTitle = (title) => {
    doc.moveDown();
    doc.fontSize(16).fillColor("#333").text(title);
    doc
      .moveTo(doc.x, doc.y + 3)
      .lineTo(550, doc.y + 3)
      .strokeColor("#cccccc")
      .stroke();
    doc.moveDown();
  };

  const fieldRow = (label, value) => {
    doc
      .fontSize(12)
      .fillColor("#333")
      .text(label, 50, doc.y, { width: 200, continued: true })
      .text(value || "N/A", 250);
    doc.moveDown();
  };

  /* -----------------------------
      OWNER DETAILS
  ------------------------------*/

  sectionTitle("Owner Details");

  fieldRow("Name:", application.fullName);
  fieldRow("Email:", application.email);
  fieldRow("Phone:", application.phone);
  fieldRow("Business Name:", application.businessName || "N/A");

  /* -----------------------------
      PROPERTY DETAILS
  ------------------------------*/

  sectionTitle("Property Details");

  fieldRow("Property Type:", application.propertyType);
  fieldRow("Rooms:", application.rooms);
  fieldRow("Bathrooms:", application.bathrooms);
  fieldRow("Capacity:", `${application.capacity} Guests`);
  fieldRow("Address:", application.address);

  /* -----------------------------
      DESCRIPTION
  ------------------------------*/

  sectionTitle("Description");

  doc.fontSize(12).text(application.description || "N/A");

  /* -----------------------------
      IMAGE FUNCTIONS
  ------------------------------*/

  const getImageBuffer = async (url) => {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);

    return await sharp(buffer).png().toBuffer();
  };

  const addHeroImage = async (url) => {
    if (!url) return;

    const img = await getImageBuffer(url);

    sectionTitle("Hero Image");

    doc.image(img, {
      fit: [500, 300],
      align: "center"
    });
  };

  const addGallery = async (images, title) => {
    if (!images || images.length === 0) return;

    doc.addPage();

    sectionTitle(title);

    let x = 50;
    let y = doc.y;

    for (let i = 0; i < images.length; i++) {
      const img = await getImageBuffer(images[i]);

      doc.image(img, x, y, {
        width: 240,
        height: 160
      });

      if (x === 50) {
        x = 310;
      } else {
        x = 50;
        y += 180;
      }

      if (y > 700) {
        doc.addPage();
        x = 50;
        y = 50;
      }
    }

    doc.moveDown(2);
  };

  /* -----------------------------
      HERO IMAGE
  ------------------------------*/

  await addHeroImage(application.heroImage);

  /* -----------------------------
      IMAGE GALLERIES
  ------------------------------*/

  await addGallery(application.bedroomImages, "Bedroom Images");

  await addGallery(application.bathroomImages, "Bathroom Images");

  await addGallery(application.kitchenImages, "Kitchen Images");

  await addGallery(application.outdoorImages, "Outdoor Images");

  doc.end();

  return filePath;
};