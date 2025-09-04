import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaUpload, FaPlusCircle, FaVideo, FaTrash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../main";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

const LecturePage = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureFile, setLectureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

 
  const fetchLectures = async () => {
    try {
      const response = await axios.get(`${serverUrl}/course/getlecture/${courseId}`, {
        withCredentials: true,
      });
      setLectures(response.data.course.lectures || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching lectures");
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [courseId]);

  
  const createLectureHandler = async (e) => {
    e.preventDefault();
    if (!lectureTitle) {
      return toast.error("Please enter lecture title");
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      if (lectureFile) {
        formData.append("lectureUrl", lectureFile);
      }

      const response = await axios.post(
        `${serverUrl}/course/createlecture/${courseId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Lecture created successfully");
      setLectureTitle("");
      setLectureFile(null);
      fetchLectures();
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating lecture");
      setLoading(false);
    }
  };

 
  const deleteLectureHandler = async (lectureId) => {
    try {
      await axios.delete(`${serverUrl}/course/removelecture/${courseId}/${lectureId}`, {
        withCredentials: true,
      });
      toast.success("Lecture deleted");
      dispatch(setuserCourseData(null));
      fetchLectures();
    } catch (error) {
     navigate("/dashboard")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FaBook className="w-8 h-8 text-indigo-400" /> Manage Lectures
          </h1>
        </div>

       
        <form
          onSubmit={createLectureHandler}
          className="mb-10 bg-gray-900/60 border border-gray-700 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaPlusCircle className="text-green-400" /> Create New Lecture
          </h2>

          {/* Title */}
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter lecture title"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />

        
          <label
            htmlFor="fileInput"
            className="block border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition mb-4"
          >
            {lectureFile ? (
              <p className="text-green-400 font-medium">{lectureFile.name}</p>
            ) : (
              <>
                <FaUpload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-gray-300">Click to upload lecture video/file</p>
              </>
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setLectureFile(e.target.files[0])}
            />
          </label>

         
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-lg cursor-pointer"
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Create Lecture"}
          </motion.button>
        </form>

        {/* Existing Lectures List */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaVideo className="text-indigo-400" /> Existing Lectures
          </h2>

          {lectures.length === 0 ? (
            <p className="text-gray-400">No lectures added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {lectures.map((lec) => (
                <motion.div
                  key={lec._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-900/60 border border-gray-700 rounded-xl p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-white font-medium">{lec.lectureTitle}</h3>
                    {lec.lectureUrl && (
                      <a
                        href={lec.lectureUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 text-sm underline"
                      >
                        View Lecture
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => deleteLectureHandler(lec._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LecturePage;
