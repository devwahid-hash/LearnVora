// src/pages/ViewAllLectures.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import toast from "react-hot-toast";
import { FaPlayCircle } from "react-icons/fa";

const ViewAllLectures = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/course/getlecture/${courseId}`,
          { withCredentials: true }
        );
        setLectures(data.course?.lectures || []);
        if (data.lectures.length > 0) {
          setSelectedLecture(data.lectures[0]);
        }
      } catch (error) {
        console.error(error);
       
      }
    };

    fetchLectures();
  }, [courseId]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left side: video player */}
      <div className="md:col-span-3 bg-white shadow-lg rounded-2xl p-4">
        {selectedLecture ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {selectedLecture.lectureTitle}
            </h2>
            <video
              src={selectedLecture.lectureUrl}
              controls
              className="w-full rounded-lg"
            ></video>
          </div>
        ) : (
          <p className="text-gray-600">No lecture selected</p>
        )}
      </div>

      {/* Right side: lectures list */}
      <div className="bg-gray-50 shadow-lg rounded-2xl p-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3">All Lectures</h3>
        <ul className="space-y-3">
          {lectures.map((lec, index) => (
            <li
              key={lec._id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                selectedLecture?._id === lec._id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedLecture(lec)}
            >
              <FaPlayCircle className="text-blue-600" />
              <span>
                {index + 1}. {lec.lectureTitle}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAllLectures;
