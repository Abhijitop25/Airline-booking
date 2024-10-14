import React, { useState } from "react";
import {
  FaPlane,
  FaUsers,
  FaBook,
  FaChartBar,
  FaSignOutAlt,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Maincontent from "./After Admin/Maincontent";
import ManageFlight from "./After Admin/ManageFlight";
import ManageUsers from "./After Admin/ManageUsers";
import BookingManagement from "./After Admin/BookingManagement";

const AdminDashboard = () => {
  // State to manage active section
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Handler for Logout
  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  // Toggle Sidebar for Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-blue-800 text-white transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <button className="md:hidden" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <div className="p-6">
          {/* Admin Profile */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="Admin"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">Admin Name</h3>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-300 hover:text-white"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul>
              <li className="mb-2">
                <NavLink
                  to="/dashboard"
                  onClick={() => {
                    setActiveSection("Dashboard");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded hover:bg-blue-700 ${
                    activeSection === "Dashboard" ? "bg-blue-700" : ""
                  }`}
                >
                  <FaChartBar className="mr-3" /> Dashboard
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                
                  onClick={() => {
                    setActiveSection("Flight Management");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded hover:bg-blue-700 ${
                    activeSection === "Flight Management" ? "bg-blue-700" : ""
                  }`}
                >
                  <FaPlane className="mr-3" /> Flight Management
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  onClick={() => {
                    setActiveSection("Booking Management");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded hover:bg-blue-700 ${
                    activeSection === "Booking Management"
                      ? "bg-blue-700"
                      : ""
                  }`}
                >
                  <FaBook className="mr-3" /> Booking Management
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  onClick={() => {
                    setActiveSection("User Management");
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 rounded hover:bg-blue-700 ${
                    activeSection === "User Management" ? "bg-blue-700" : ""
                  }`}
                >
                  <FaUsers className="mr-3" /> User Management
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        <button
          className="text-2xl mb-4 md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        {activeSection === "Dashboard" && <Maincontent />}
        {activeSection === "Flight Management" && <ManageFlight />}
        {activeSection === "User Management" && <ManageUsers />}
        {activeSection === "Booking Management" && <BookingManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
