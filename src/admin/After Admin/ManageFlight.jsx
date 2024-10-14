import React, { useState } from "react";

const FlightManagement = () => {
  // Sample data for flights
  const [flights, setFlights] = useState([
    {
      id: 1,
      flightNumber: "FL123",
      departure: "2024-10-10 10:00 AM",
      arrival: "2024-10-10 12:00 PM",
      price: 5000,
    },
    {
      id: 2,
      flightNumber: "FL456",
      departure: "2024-10-12 01:00 PM",
      arrival: "2024-10-12 03:00 PM",
      price: 7500,
    },
    {
      id: 3,
      flightNumber: "FL789",
      departure: "2024-10-15 08:00 AM",
      arrival: "2024-10-15 10:00 AM",
      price: 6000,
    },
  ]);

  // State for form inputs and editing
  const [newFlight, setNewFlight] = useState({ flightNumber: "", departure: "", arrival: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Add a new flight
  const handleAddFlight = () => {
    if (newFlight.flightNumber && newFlight.departure && newFlight.arrival && newFlight.price) {
      setFlights([...flights, { id: flights.length + 1, ...newFlight }]);
      setNewFlight({ flightNumber: "", departure: "", arrival: "", price: "" }); // Reset form
    }
  };

  // Delete a flight
  const handleDeleteFlight = (id) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  // Handle Edit Flight
  const handleEditFlight = (id) => {
    const flightToEdit = flights.find((flight) => flight.id === id);
    setNewFlight(flightToEdit);
    setIsEditing(true);
    setEditId(id);
  };

  // Update Flight after editing
  const handleUpdateFlight = () => {
    setFlights(
      flights.map((flight) =>
        flight.id === editId ? { ...flight, ...newFlight } : flight
      )
    );
    setNewFlight({ flightNumber: "", departure: "", arrival: "", price: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Flight Management</h2>

      {/* Add or Edit Flight Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Flight" : "Add Flight"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Flight Number"
            value={newFlight.flightNumber}
            onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Departure"
            value={newFlight.departure}
            onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Arrival"
            value={newFlight.arrival}
            onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={newFlight.price}
            onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          onClick={isEditing ? handleUpdateFlight : handleAddFlight}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          {isEditing ? "Update Flight" : "Add Flight"}
        </button>
      </div>

      {/* Flights Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Flight ID</th>
            <th className="py-3 px-6 text-left">Flight Number</th>
            <th className="py-3 px-6 text-left">Departure</th>
            <th className="py-3 px-6 text-left">Arrival</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <tr key={flight.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{flight.id}</td>
                <td className="py-3 px-6 text-left">{flight.flightNumber}</td>
                <td className="py-3 px-6 text-left">{flight.departure}</td>
                <td className="py-3 px-6 text-left">{flight.arrival}</td>
                <td className="py-3 px-6 text-left">₹{flight.price}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEditFlight(flight.id)}
                    className="bg-yellow-500 text-white py-1 px-4 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFlight(flight.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center">
                No flights available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightManagement;
