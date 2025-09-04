import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand / Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">WahidDev</h2>
          <p className="text-sm leading-relaxed">
            Building modern web applications with a strong focus on clean
            architecture, performance, and professional design.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => navigate("/courses")}
                className="hover:text-indigo-400 transition"
              >
                Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-indigo-400 transition"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-indigo-400 transition"
              >
                Contact
              </button>
            </li>
            
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for latest updates.
          </p>
          <form className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-sm text-gray-200 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="pl-[10vw] mt-5"
        >
          <h3 className="text-lg font-semibold text-white mb-4 ">Follow Me</h3>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/wahid-ali-4b5bb830b/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/devwahid-hash"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition"
            >
              <FaGithub />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} WahidDev. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
