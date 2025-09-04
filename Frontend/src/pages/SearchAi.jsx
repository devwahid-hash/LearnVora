import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { serverUrl } from "../main";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import start from "../assets/start.mp3"

const SearchAi = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const startSound=new Audio(start)

  // ✅ Voice Search
  const handleVoiceSearch = () => {
    
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search not supported in this browser.");
      return;
    }
    startSound.play()
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
      handleSearch(text);
    };
    recognition.start();
  };

  const handleSearch = async (query) => {
    const searchText = query || input;
    if (!searchText.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/course/searchai`,
        { input: searchText },
        { withCredentials: true }
      );
      setResults(res.data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Search Courses with AI
        </h1>
        <p className="text-gray-500 text-center mb-10">
          Type or use voice to find your desired courses instantly.
        </p>

        {/* Search Bar */}
        <div className="flex items-center max-w-2xl mx-auto mb-10 gap-0.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. WEB Development, APP Development, DataBase Hacking"
            className="flex-1 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-indigo-600 text-white px-5 py-4 hover:bg-indigo-700 transition flex items-center gap-2 cursor-pointer"
          >
            <FaSearch />
          </button>
          <button
            onClick={handleVoiceSearch}
            className="bg-gray-200 text-gray-700 px-4 py-4 rounded-r-lg hover:bg-gray-300 transition cursor-pointer "
          >
            <FaMicrophone fill="purple"/>
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-10">
            <ClipLoader size={40} color="#4f46e5" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
              >
                {/* Image */}
                <div className="w-full h-40 bg-gray-200">
                  <img
                    src={
                      course.thumbnail ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-indigo-600 font-medium">
                      {course.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {course.enrolledStudents?.length || 0} students
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          input && (
            <p className="text-center text-gray-600">No results found.</p>
          )
        )}
      </motion.div>
    </div>
  );
};

export default SearchAi;
