import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate } from "react-icons/fa";


const CourseCard = ({ title, image, students ,onClick  }) => {

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="bg-white w-64 shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="h-36 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Details */}
      <div className="flex-1 p-4 flex flex-col justify-between text-center">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-3">
          <FaUserGraduate className="text-blue-500" />
          <span>{students} Students Enrolled</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
