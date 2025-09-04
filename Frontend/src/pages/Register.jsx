import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaBookOpen } from "react-icons/fa"; // LMS Icon
import { useState } from "react";
import axios from "axios"
import { serverUrl } from "../main";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/GoogleAuth";
import { useDispatch } from "react-redux";
import { setuserData } from "../redux/userSlice";
import { Link } from "react-router-dom";


const Register = () => {

  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("")
  const [role, setrole] = useState("")
  const [password, setpassword] = useState("")
   const dispatch= useDispatch();
  const formHandler=async(e)=>{
 e.preventDefault()
 const newUser={
  userName,
  email,
  role,
  password
 }
 try {
  const response=await axios.post(`${serverUrl}/auth/register`,newUser,{
    withCredentials:true
  })
  if(response.status===201 || response.status ===200){
    toast.success("Successfully Registerd")
  }
  console.log(response.data)
  dispatch(setuserData(response.data))
  setuserName(""),
  setemail(""),
  setrole(""),
  setpassword("")
 } catch (error) {
  toast.error(error.response?.data?.message ||"error in registration")
  console.log(error)
 }
  }

    const googleSignIn=async()=>{
  try {
    const response=await signInWithPopup(auth,provider)
    let user=response.user
    let userName=user.displayName
    let email=user.email
    const result=await axios.post(`${serverUrl}/auth/googleAuth`,{email,userName},
      {withCredentials:true})
      if(result.status===201 || result.status===200){
        toast.success(result.data.message || "Success")
        dispatch(setuserData(result.data))
      }
      console.log(result)
  } catch (error) {
     toast.error(error.response?.data?.message ||"error in LogIn")
    console.log(error)
  }
    }
 
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-sm sm:max-w-md"
      >
        {/* Glowing Gradient Border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4 }}
          className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-lg"
        />

        {/* Form Card */}
        <div className="relative bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-xl px-5 sm:px-6 py-5 sm:py-6 text-white overflow-hidden">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg shadow-lg">
              <FaBookOpen className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
          >
            Join Our LMS
          </motion.h2>
          <p className="mt-1 text-center text-gray-400 text-xs">
            Start your learning journey 📚
          </p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-4 space-y-3"
            onSubmit={(e)=>{
        formHandler(e)
            }}
          >
            {/* Username */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Username</label>
              <input
              onChange={(e)=>{
             setuserName(e.target.value)
              }}
                type="text"
                value={userName}
                placeholder="Enter username"
                className="w-full px-3 py-3 rounded-md bg-gray-800/60 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 outline-none text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Email</label>
              <input
              onChange={(e)=>{
            setemail(e.target.value)
              }}
              value={email}
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-3 rounded-md bg-gray-800/60 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-400 outline-none text-base"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Role</label>
              <select className="w-full px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-400 outline-none text-base cursor-pointer" onChange={(e)=>{
              setrole( e.target.value)
              }}>
                <option value="">Select your role</option>
                <option value="student">🎓 Student</option>
                <option value="educator">👨‍🏫 Educator</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Password</label>
              <input
              onChange={(e)=>{
              setpassword(e.target.value)
              }}
                type="password"
                value={password}
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 outline-none text-base"
              />
            
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-md font-semibold text-base shadow-md hover:shadow-pink-500/30 transition-all duration-300 cursor-pointer"
            >
              Register
            </motion.button>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-900 px-2 text-gray-400">or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={()=>{
                  googleSignIn()
              }}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-md border border-gray-700 bg-gray-800/60 hover:bg-gray-700 transition-all duration-300 shadow-md text-base cursor-pointer"
            >
              <FcGoogle size={18} />
              <span className="font-medium text-white">Sign in with Google</span>
            </motion.button>
          </motion.form>

          {/* Footer */}
          <p className="mt-4 text-center text-gray-400 text-xs">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-400 hover:text-pink-400 transition-colors text-sm cursor-pointer"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
