import {v2 as cloudinary} from 'cloduinary';
import fs from 'fs';

cloudinary.confing({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File has been uploaded successfully", response.url)
        return response
    } catch (error) {
        fs.link(localFilePath)
    }
}