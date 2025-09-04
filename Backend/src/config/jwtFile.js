
import jwt from "jsonwebtoken"

export const genToken=(userId,res)=>{
   const token= jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"3d"})
  res.cookie("jwt",token)
}