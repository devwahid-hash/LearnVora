import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaBookOpen, FaLayerGroup, FaFileAlt, FaGraduationCap } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setcourseData } from "../redux/courseSlice";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const { userCourseData } = useSelector((state) => state.course);
  const course = userCourseData?.find((c) => c._id === courseId);

  // ✅ Start with empty states
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [level, setlevel] = useState("");
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (course) {
      settitle(course.title || "");
      setcategory(course.category || "");
      setdescription(course.description || "");
      setlevel(course.level || "");
    }
  }, [course]);

  const formHandler = async () => {
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("category", category);
      formdata.append("description", description);
      formdata.append("level", level);
      if (image) {
        formdata.append("thumbnail", image);
      }

      const response = await axios.post(
        `${serverUrl}/course/updatecourse/${courseId}`,
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Course Updated Successfully");
        dispatch(setcourseData(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  
  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <FaBookOpen className="w-8 h-8 text-indigo-400" /> Update Course
            </h1>
            <p className="text-gray-300 mt-2">
              Update the details below to update your course
            </p>
          </div>

          {/* Add Lecture Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/createlecture/${courseId}`)}
            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg cursor-pointer"
          >
            + Add Lecture
          </motion.button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formHandler();
          }}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className=" text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
              <FaLayerGroup className="w-4 h-4 text-indigo-400" /> Course Title
            </label>
            <input
              onChange={(e) => settitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Enter course title"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className=" text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
              <FaGraduationCap className="w-4 h-4 text-indigo-400" /> Category
            </label>
            <select
              onChange={(e) => setcategory(e.target.value)}
              value={category}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Data Base">Data Base</option>
              <option value="UI/UX Designing">UI/UX Designing</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Ai Tools">Ai Tools</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Ai Tools">Ai Tools</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className=" text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
              <FaFileAlt className="w-4 h-4 text-indigo-400" /> Description
            </label>
            <textarea
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              placeholder="Write a short description..."
              rows="4"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Level */}
          <div>
            <label className=" text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
              <FaGraduationCap className="w-4 h-4 text-indigo-400" /> Level
            </label>
            <select
              onChange={(e) => setlevel(e.target.value)}
              value={level}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label
              htmlFor="imgInput"
              className="block border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mx-auto h-40 w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-3 text-gray-300">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </>
              )}

              {/* File input (hidden) */}
              <input
                onChange={(e) => setimage(e.target.files[0])}
                type="file"
                id="imgInput"
                name="imgInput"
                accept="image/*"
                className="hidden"
              />
            </label>
            <p className="mt-2 text-sm font-medium text-gray-200 flex items-center gap-2">
              <FaUpload className="w-4 h-4 text-indigo-400" /> Course Thumbnail
            </p>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-lg cursor-pointer"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Update Course"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCourse;
