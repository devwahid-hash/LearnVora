import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const CoursesPage = () => {
  const { courseData } = useSelector((state) => state.course);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate=useNavigate()
  const {courseId}=useParams

  const categories = [
    "All",
    "UI/UX Designing",
    "Web Development",
    "App Development",
    "Data Base",
    "Data Science",
    "Ai Tools",
    "Ethical Hacking",
  ];

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCourses(courseData);
    } else {
      setFilteredCourses(courseData.filter((c) => c.category === selectedCategory));
    }
  }, [selectedCategory, courseData]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Page Content */}
      <div className="pt-28 px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Explore Courses
          </h1>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <FaFilter className="text-purple-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-purple-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div  className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ scale: 1.03 }}
                onClick={()=>{
        navigate(`/viewCourse/${course._id}`)
          }}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-500">{course.category}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {course.enrolledStudents?.length} student enrolled
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-12">
            No courses found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
