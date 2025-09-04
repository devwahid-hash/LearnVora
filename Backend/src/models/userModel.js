import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },fullName:{
        type:String,
       default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["student","educator"],
    },
    description:{
        type:String
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrolledCoures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
        
    }]
    ,generateOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User=mongoose.model("User",userSchema)

export default User;