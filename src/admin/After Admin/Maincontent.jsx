import React from "react";
import { FaBars } from "react-icons/fa";

const Maincontent = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Content */}
      <main className="p-6 overflow-auto bg-gray-100">
        <div>
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Flights */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-blue-600">Total Flights</h2>
              <p className="text-3xl font-bold">120</p>
            </div>
            {/* Total Bookings */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-green-600">Total Bookings</h2>
              <p className="text-3xl font-bold">450</p>
            </div>
            {/* Total Users */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-red-600">Total Users</h2>
              <p className="text-3xl font-bold">300</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <ul className="space-y-2">
                <li className="border-b pb-2">User John Doe booked Flight FL123</li>
                <li className="border-b pb-2">Flight FL456 has been added</li>
                <li className="border-b pb-2">User Jane Smith updated their profile</li>
                <li className="border-b pb-2">Booking BK789 has been cancelled</li>
                <li>Flight FL321 scheduled for tomorrow</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Maincontent;
