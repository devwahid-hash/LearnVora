import express from "express"
import { authUser } from "../middlewares/authMiddleware.js"
import { updateProfile, verifyUser } from "../controllers/userContr.js"
import upload from "../middlewares/multer.js"

const userRouter=express.Router()


userRouter.get("/verify",authUser,verifyUser)
userRouter.post("/updateprofile",authUser,upload.single("photoUrl"),updateProfile)

export default userRouter