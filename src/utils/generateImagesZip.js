import fs from "fs";
import archiver from "archiver";
import axios from "axios";

export const generateImagesZip = async (application) => {
  const zipPath = `./uploads/images-${application._id}.zip`;

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip");

  archive.pipe(output);

  const addImages = async (images, folder) => {
    if (!images) return;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      const response = await axios.get(img, {
        responseType: "arraybuffer",
      });

      archive.append(response.data, {
        name: `${folder}-${i + 1}.jpg`,
      });
    }
  };

  if (application.heroImage) {
    const res = await axios.get(application.heroImage, {
      responseType: "arraybuffer",
    });

    archive.append(res.data, { name: "hero.jpg" });
  }

  await addImages(application.bedroomImages, "bedroom");
  await addImages(application.bathroomImages, "bathroom");
  await addImages(application.kitchenImages, "kitchen");
  await addImages(application.outdoorImages, "outdoor");

  await archive.finalize();

  return zipPath;
};