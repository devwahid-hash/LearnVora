import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../main";
import { FaUserGraduate, FaStar, FaPlayCircle, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false); // ✅ check enrollment state
  const { userData } = useSelector((state) => state.user);

  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/course/getcourse/${courseId}`,
          { withCredentials: true }
        );
        setCourse(res.data);
        setLectures(res.data.lectures || []);

        
        if (userData && res.data.enrolledStudents?.includes(userData._id)) {
          setIsEnrolled(true);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Failed to fetch course");
      }
    };
    fetchCourse();
  }, [courseId, userData]);

  // ✅ Handle enrollment
  const handleEnroll = async () => {
    if (!userData) {
      toast.error("You must sign in to enroll!");
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        `${serverUrl}/course/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Successfully Enrolled!");
      setIsEnrolled(true); // update state instantly
      navigate(`/lecture/${courseId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to enroll");
    }
  };

  // ✅ Handle watch
  const handleWatch = () => {
    navigate(`/lecture/${courseId}`);
  };

  if (loading)
    return <div className="text-center py-10 text-lg">Loading...</div>;
  if (!course)
    return <div className="text-center py-10 text-lg">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative w-full h-80">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover rounded-b-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black/50 rounded-b-3xl flex flex-col justify-center items-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-center"
          >
            {course.title}
          </motion.h1>
          <p className="mt-4 text-lg max-w-3xl text-center opacity-90">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-yellow-300" />
              <span>{course.enrolledStudents?.length || 0} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span>{course.rating || "4.5"} / 5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                {course.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About this course
          </h2>
          <p className="text-gray-600 leading-relaxed">{course.description}</p>

          {/* ✅ Show First Lecture Video */}
          {lectures.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Introduction Video
              </h3>
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={lectures[0].lectureUrl}
                />
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            Lectures
          </h3>
          <div className="space-y-3">
            {lectures.length > 0 ? (
              lectures.map((lec, index) => (
                <div
                  key={lec._id}
                  className="flex items-center justify-between bg-white shadow rounded-lg p-3 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    {index === 0 ? (
                      <FaPlayCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaLock  className="text-gray-400 text-xl" />
                    )}
                    <span className="text-gray-700 font-medium">
                      {lec.lectureTitle}
                    </span>
                    
                  </div>
                  {index === 0 ? (
                    
                    <button
                      onClick={handleWatch}
                      className="text-sm text-indigo-600 font-semibold hover:underline"
                    >
                      Watch
                    </button>
                   ) :(
                 <button
                      onClick={handleEnroll}
                      className="text-sm text-indigo-600 font-semibold hover:underline"
                    >
                    {isEnrolled?"Watch ": "Enroll "}
                    </button>
                   
                    )}
                </div>
                
              ))
            ) : (
              <p className="text-gray-500">No lectures available yet.</p>
            )}
           
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-24">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Course Details
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <span className="font-semibold">Category:</span> {course.category}
            </li>
            <li>
              <span className="font-semibold">Level:</span> {course.level}
            </li>
            <li>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(course.createdAt).toLocaleDateString()}
            </li>
            <li>
              <span className="font-semibold">Creator:</span> {course.creater?.fullName.toUpperCase()}
            </li>
          </ul>

          
          {isEnrolled ? (
            <button
              onClick={handleWatch}
              className="mt-8 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition cursor-pointer"
            >
              Watch Now
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition cursor-pointer"
            >
              Enroll Now
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
