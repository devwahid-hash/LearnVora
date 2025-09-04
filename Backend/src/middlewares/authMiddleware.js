import jwt from "jsonwebtoken"

export const authUser=async(req,res,next)=>{
    try {
     const token=req.cookies.jwt
     if (!token){
        return res.status(401).json({message:"unauthorized no token"})
     }
     const verifyToken=jwt.verify(token,process.env.JWT_SECRET)
     req.userId =verifyToken.userId
     next()
     } catch (error) {
        return res.status(401).json({message:`error in authMiddleware${error}`})
     }
}