import express, { Router } from "express"
import { googleAuth, loginContr,  logoutContr, registerContr, resetPassword, sentOtp, verifyOtp } from "../controllers/authContr.js";
import { auth } from "../../../Frontend/src/utils/GoogleAuth.js";

const authRouter= express.Router();

authRouter.post("/register",registerContr)
authRouter.post("/login",loginContr)
authRouter.get("/logout",logoutContr)

authRouter.post("/sentotp",sentOtp)
authRouter.post("/otpverify",verifyOtp)
authRouter.post("/resetpassword",resetPassword)

authRouter.post("/googleAuth",googleAuth)
export default authRouter