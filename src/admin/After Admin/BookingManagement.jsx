import React, { useState } from "react";

const BookingManagement = () => {
  // Sample data for bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      flight: "Flight 123",
      user: "John Doe",
      date: "2024-10-10",
    },
    {
      id: 2,
      flight: "Flight 456",
      user: "Jane Smith",
      date: "2024-10-12",
    },
    {
      id: 3,
      flight: "Flight 789",
      user: "Sam Wilson",
      date: "2024-10-15",
    },
  ]);

  // Delete a booking
  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>

      {/* Booking Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Booking ID</th>
            <th className="py-3 px-6 text-left">Flight</th>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{booking.id}</td>
                <td className="py-3 px-6 text-left">{booking.flight}</td>
                <td className="py-3 px-6 text-left">{booking.user}</td>
                <td className="py-3 px-6 text-left">{booking.date}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center">
                No bookings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
