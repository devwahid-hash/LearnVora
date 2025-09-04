import React, { useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import toast from "react-hot-toast";
import { setuserData } from "../redux/userSlice";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const logOut = async () => {
    try {
      const response = await axios.get(`${serverUrl}/auth/logout`, {
        withCredentials: true,
      });
      toast.success(response?.data?.message || "Logged out successfully");
      dispatch(setuserData(null));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/about", label: "About" },
   
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 px-6 md:px-12 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-2xl font-extrabold flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaUserGraduate className="text-purple-400" />
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          LearnVora
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-19 text-lg font-medium">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-white hover:text-purple-400 transition duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side (Auth/Profile) */}
      <div className="hidden md:flex gap-4 items-center">
        {!userData ? (
          <>
            <Link
              to="/signin"
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:scale-105 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 border border-purple-400 text-purple-300 rounded-xl hover:bg-purple-500/30 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="profile"
                onClick={() => navigate("/profile")}
                className="rounded-full h-12 w-12 object-cover border-2 border-gray-500 cursor-pointer"
              />
            ) : (
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center justify-center text-2xl font-bold rounded-full h-12 w-12 cursor-pointer text-gray-200 bg-gray-400"
              >
                {userData?.userName?.slice(0, 1).toUpperCase()}
              </div>
            )}

            {userData.role === "educator" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2 border border-purple-400 text-purple-300 rounded-xl hover:bg-purple-500/30 transition cursor-pointer"
              >
                Dashboard
              </button>
            )}

            <button
              onClick={logOut}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:scale-105 transition cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-lg flex flex-col items-center gap-6 py-6 text-lg md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white hover:text-purple-400 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!userData ? (
            <>
              <Link
                to="/signin"
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 border border-purple-400 text-purple-300 rounded-xl hover:bg-purple-500/30"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="text-white hover:text-purple-400"
              >
                Profile
              </button>
              {userData.role === "educator" && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/dashboard");
                  }}
                  className="text-white hover:text-purple-400 "
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logOut();
                }}
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
