import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import svg from "../assets/default-avatar.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { setcourseData, setuserCourseData } from "../redux/courseSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const { userCourseData } = useSelector((state) => state.course);
  const courses = Array.isArray(userCourseData) ? userCourseData : (userCourseData ? [userCourseData] : []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
     if (!userData) return 
    const fetchCourses = async () => {
      try {
       
        const result = await axios.get(`${serverUrl}/course/usercourses`, {
          withCredentials: true,
        });
        dispatch(setuserCourseData(Array.isArray(result.data) ? result.data : [result.data]));
      } catch (error) {
        console.log(`error in getAllcourses component ${error}`);
      }
    };
    fetchCourses();
  }, [userData, dispatch]);

  //  Delete handler
  const deleteHandler = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${serverUrl}/course/removecourse/${courseId}`, {
        withCredentials: true,
      });
      toast.success("Course deleted successfully");
      dispatch(setuserCourseData(userCourseData.filter((c) => c._id !== courseId)));
      dispatch(setcourseData())
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting course");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-8">
      {/* ✅ Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={userData?.photoUrl || svg}
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-gray-600 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {userData?.fullName.toUpperCase() || userData?.userName}
            </h2>
            <p className="text-sm text-gray-400 gap-3">
              {userData?.role.toUpperCase() || "Educator"} • {userCourseData?.length || 0} Courses
            </p>
          </div>
        </div>

        {/* Create New Course Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/createcourse")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl shadow-lg text-white font-medium cursor-pointer"
        >
          <FaPlusCircle className="h-[22px] w-[22px]" /> Create New Course
        </motion.button>
      </div>

      {/* ✅ Courses Section */}
      <div>
        <h3 className="text-lg font-semibold mb-6">My Courses</h3>

        {/* Table for large screens */}
        <div className="hidden lg:block">
          <table className="w-full border border-gray-700 rounded-xl overflow-hidden shadow-xl">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Enrolled Students</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {userCourseData?.map((course) => (
                <tr key={course._id} className="hover:bg-gray-800/60">
                  <td className="p-4">
                    <img
                      src={course?.thumbnail}
                      alt="Course"
                      className="w-20 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{course?.title}</td>
                  <td className="p-4">{course?.enrolledStudents.length || 0}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/updatecourse/${course._id}`)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg text-sm cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteHandler(course._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {courses?.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={course?.thumbnail}
                alt="Course"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{course?.title}</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Enrolled Students:{" "}
                  <span className="text-white">{course?.enrolledStudents || 0}</span>
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/updatecourse/${course._id}`)}
                    className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteHandler(course._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
