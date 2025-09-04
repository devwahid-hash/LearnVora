import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "./Card";
import { useNavigate } from "react-router-dom";


const CoursesGrid = () => {
  const { courseData } = useSelector((state) => state.course);
    const navigate=useNavigate()
  

 
const [popularCourses, setpopularCourses] = useState([])
useEffect(()=>{
  setpopularCourses(courseData.slice(0,8));
},[courseData])


  return (
    <div className="container mt-[10vh] mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Explore Popular Courses
      </h2>
      <div className="grid gap-8 mt-[5vh] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {popularCourses.map((course, index) => (
          <CourseCard
          
            key={index}
            title={course.title}
            image={course.thumbnail}
            students={course.enrolledStudents?.length}
             onClick={() => navigate(`/viewCourse/${course._id}`)} // ✅ works now
          
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
