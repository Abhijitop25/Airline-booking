import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu visibility
  const navigate = useNavigate();

  // Check for JWT token in localStorage on component mount
  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  useEffect(() => {
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, [access_token]);
  
  const location = useLocation(); // Get the current route

  // Check if the current path is '/admin'
  const isAdminPage = location.pathname === "/dashboard";

  // Conditionally render the navbar if not on the admin page
  if (isAdminPage) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove JWT token from localStorage
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logging out
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#116466] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          <img src="logo.png" alt="Logo" className="h-16 w-auto" />
        </a>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        <div className={`flex items-center space-x-4 ${menuOpen ? "block" : "hidden"} md:flex md:space-x-4`}>
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Contact
          </a>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-white hover:text-gray-300"
              >
                <img
                  src="/profile-icon.png" // Path to a generic user profile image
                  alt="User Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  title="User Profile"
                />
                <span>User</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
