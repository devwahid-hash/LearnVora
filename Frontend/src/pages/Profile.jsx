import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { serverUrl } from "../main";
import toast from "react-hot-toast";
import { setuserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
   const {userData}=useSelector(state=>state.user)
  const [previewImage, setpreviewImage] = useState(userData?.profileImage || null)
  const [fullName, setfullName] = useState(userData?.fullName || "")
  const [role, setrole] = useState(userData?.role || "")
  const [description, setdescription] = useState(userData?.description || "")
  const [backendImage, setbackendImage] = useState("")
  const [loading, setloading] = useState(null)
  const dispatch=useDispatch();
  const navigate =useNavigate()
  
  const handleFrontendImage=(e)=>{
  const file= e.target.files[0]
  
 setpreviewImage(URL.createObjectURL(file))
setbackendImage(file)
  }
  const formHandler=async()=>{
    try {
      setloading(true)
      const formdata=new FormData()
      
      formdata.append("fullName",fullName)
      formdata.append("role",role)
      formdata.append("description",description)
      if(backendImage){
        formdata.append("photoUrl",backendImage)
      }
      const response =await axios.post(`${serverUrl}/user/updateprofile`,formdata,{
        withCredentials:true,
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      if(response.status===(200)){
      toast.success(response.data.message )
      setloading(false)
      dispatch(setuserData(response.data))
      navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setloading(false)
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={(e)=>{
          e.preventDefault()
          formHandler()
        }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-white"
      >
        <button onClick={()=>{
          navigate("/")
        }} className="cursor-pointer"><FaArrowLeft className="h-[25px] w-[25px]"/></button>
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          
          <div className="relative w-28 h-28">
            <img
              src={previewImage || userData?.photoUrl}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
            />
            <label className="absolute bottom-1 right-1 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer text-sm">
              📷
              <input onChange={(e)=>{
                handleFrontendImage(e)
                
              }}  type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <h2 className="text-2xl font-bold mt-4">wahid123</h2>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

           {/* Name - Editable */}
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
            onChange={(e)=>{
              setfullName(e.target.value)
            }}
              type="text"
              value={fullName ?? ""}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-purple-500"
            />
          </div>

           {/* Role - Editable */}
          <div>
            <label className="block text-sm mb-2">Role</label>
            <select  onChange={(e)=>{
              setrole(e.target.value)
            }} value={role} className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-purple-500">
              <option value="student">Student</option>
              <option value="educator">Educator</option>
            </select>
          </div>


          {/* Username - Readonly */}
          <div>
            <label className="block text-sm mb-2">Username</label>
            <input
              type="text"
              value={userData?.userName || ""}
              readOnly
             disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300"
            />
              <small className="text-gray-300 text-xs">
            UserName cannot be changed
          </small>
          </div>

          {/* Email - Readonly */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={userData?.email}
              readOnly
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300"
            />
            <small className="text-gray-300 text-xs">
            Email cannot be changed
          </small>
          </div>

          {/* Password - Readonly */}
          <div>
            <label className="block text-sm mb-2">Password </label>
            <input
              type="password"
              value="********"
              readOnly
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300"
            />
              <small className="text-gray-300 text-xs">
            Password cannot be changed
          </small>
          </div>

         

         
          {/* Description - Editable */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2">Description</label>
            <textarea  onChange={(e)=>{
              setdescription(e.target.value)
            }}value={description}
              placeholder="Write something about yourself..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-purple-500"
              rows="4"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button type="submit" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition">
           {(loading)?<ClipLoader size={20} color="white"/>:"Update"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Profile;
