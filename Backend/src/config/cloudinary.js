import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
const cloudinaryUpload=async(filePath)=>{
   try {

        cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
if(!filePath){
    return null
}
const result=await cloudinary.uploader.upload(filePath,{resource_type:'auto'})
 fs.unlinkSync(filePath)
 return result.secure_url
   }catch (error) {
    fs.unlinkSync(filePath)
    console.log(`error in cloudinary configfile ${error}`)
   }
}
export default cloudinaryUpload