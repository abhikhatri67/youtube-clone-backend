import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("localFilePath from utils: ", localFilePath);

    // Upload file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("response: ", response);

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary", response.url);

    // Remove the locally saved file as the upload failed
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log("Error during upload:", error);

    // Remove the locally saved file as the upload failed
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (unlinkError) {
      console.error("Failed to delete local file:", unlinkError);
    }

    return null;
  }
};

export { uploadOnCloudinary };
