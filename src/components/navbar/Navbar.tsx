import React, { useRef, useState, useEffect } from "react";
import {
  FaUserCircle,
  FaCog,
  FaUpload,
  FaVideo,
  FaEnvelope,
  FaBell,
  FaSearch,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import logo from "../../images/logo.png";
import Stories from "../stories/Stories";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search submit here
  };

  return (
    <header
      className={`sticky w-full top-0 left-0 right-0 z-50 flex justify-between items-center py-3 px-6 bg-${
        isDarkMode ? "gray-800" : "white"
      } shadow-md col-span-3`}
    >
      <div className="flex items-center">
        <button
          className={`ml-4 focus:outline-none ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
          } py-2 px-3 rounded-lg`}
          title={`${isDarkMode ? "Switch to Light" : "Switch to Dark"} Mode`}
          onClick={handleToggleDarkMode}
        >
          {isDarkMode ? (
            <FaSun className="w-5 h-5 " />
          ) : (
            <FaMoon className="w-5 h-5" />
          )}
        </button>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            className={`py-2 pl-10 pr-4 rounded-lg border-2 focus:outline-none focus:border-${
              isDarkMode ? "gray-500" : "indigo-500"
            } ${
              isDarkMode
                ? "bg-gray-700 text-gray-100"
                : "bg-white text-gray-800"
            }`}
            placeholder="Search for talent"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <a href="/dashboard">
        <img src={logo} alt="FlairFinder Logo" className="h-12 ml-[15rem]" />
      </a>
      <a className="text-xl font-semibold text-gray-800"></a>

      <div className="flex items-center">
        <div className="ml-6 flex items-center">
          <button
            className="focus:outline-none flex items-center text-gray-500 hover:text-gray-700 "
            title="Upload story"
          >
            <FaUpload className="mr-2" />
            {/* <span>Upload</span> */}
          </button>
          <button
            className="focus:outline-none flex items-center text-gray-500 hover:text-gray-700 "
            title="Livestream"
          >
            <FaVideo className="mr-2" />
            {/* <span>Livestream</span> */}
          </button>
          <Link to="/chat">
            <button
              className="focus:outline-none flex items-center text-gray-500 hover:text-gray-700 "
              title="Messages"
            >
              <FaEnvelope className="mr-2" />
              {/* <span>Messages</span> */}
            </button>
          </Link>
          <button
            className="focus:outline-none flex items-center text-gray-500 hover:text-gray-700 "
            title="Notifications"
          >
            <FaBell className="mr-2" />
            {/* <span>Notifications</span> */}
          </button>

          <div className="w-full relative" ref={menuRef}>
            <button
              className="w-full focus:outline-none flex items-center text-gray-500 hover:text-gray-700"
              title="Profile"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaUserCircle className="mr-2" />
              <span>i_Benitha</span>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md overflow-hidden shadow-xl z-10 p-2">
                <Link to="user">
                  <button className="w-full focus:outline-none px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-start">
                    <FaUserCircle className="mr-2" />
                    Profile
                  </button>
                </Link>
                <Link to="/settings">
                  <button className="w-full focus:outline-none block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-start">
                    <FaCog className="mr-2" />
                    Settings
                  </button>
                </Link>
                <Link to="/">
                <button className="w-full focus:outline-none block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-start">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
