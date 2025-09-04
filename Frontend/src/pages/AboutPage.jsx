import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="w-full py-16 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            About This Project
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Demonstrating technical expertise through a structured and
            professional implementation.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            This project has been developed with the sole purpose of showcasing
            professional expertise in the MERN stack and modern web development
            practices. It is{" "}
            <span className="font-semibold">not designed for production use</span>
            , but rather to serve as a practical demonstration of technical
            capability, attention to detail, and proficiency in building
            full-stack applications.
          </p>

          <p>
            Every feature, design choice, and implementation reflects a focus on
            best practices including clean architecture, responsive UI design,
            and seamless user interaction. The emphasis is on demonstrating the
            depth of understanding across both frontend and backend development.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-indigo-600 mt-1" />
              <span>Modern and professional user interface</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-indigo-600 mt-1" />
              <span>Scalable and maintainable code structure</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-indigo-600 mt-1" />
              <span>Integration of secure backend APIs</span>
            </li>
          </ul>

          <p>
            By presenting this project, the objective is to highlight a strong
            command over full-stack development, combined with a commitment to
            building solutions that are both technically sound and visually
            compelling.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-lg"
          >
            <FaLaptopCode className="text-2xl" />
            Showcasing Expertise in MERN Stack Development
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
