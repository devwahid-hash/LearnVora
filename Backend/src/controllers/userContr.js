import cloudinaryUpload from "../config/cloudinary.js"
import User from "../models/userModel.js"

export const verifyUser=async (req,res)=>{
    const userId=req.userId
    try {
    const userCheck=await User.findById(userId).select("-password")
    if(!userCheck){
        return res.status(401).json({message:"unauthorized no token"})
    }
    return res.status(200).json(userCheck)
    } catch (error) {
        return res.status(500).json({message:`error in userContr${error}`})
    }
    
}

export const updateProfile=async(req,res)=>{
    try {
        
  
   const userId=req.userId
   const{fullName,role,description}=req.body
   let photoUrl
   if(req.file){
    photoUrl=await cloudinaryUpload(req.file.path)
   }
   const updateUser=await User.findByIdAndUpdate(userId,{fullName,role,description,photoUrl},{ new: true })
   if(!updateUser){
    return res.status(401).json({message:"user not found"})
   }
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updateUser,
    });
     } catch (error) {
         return res.status(500).json({message:`error in updateUser${error}`})
    }


}