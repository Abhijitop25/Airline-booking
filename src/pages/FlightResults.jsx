import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FlightResults = () => {
  const location = useLocation();

  // Check if location.state is defined
  const flights = location.state || [];

  // Sample data for available flights with seat availability
  // const flights = [
  //   {
  //     id: 1,
  //     airline: "Airline A",
  //     logo: "https://via.placeholder.com/50",
  //     origin: origin.label || "Unknown", // Use a fallback value
  //     destination: destination.label || "Unknown", // Use a fallback value
  //     departureDate,
  //     travelClass,
  //     passengers,
  //     departureTime: "10:00 AM",
  //     arrivalTime: "12:00 PM",
  //     price: "$150",
  //     stops: 0,
  //     duration: "2h 0m",
  //     co2Emission: 99,
  //     seatAvailability: {
  //       economy: { available: 50, total: 100 },
  //       business: { available: 10, total: 20 },
  //       first: { available: 2, total: 5 },
  //     },
  //   },
  //   {
  //     id: 2,
  //     airline: "Airline B",
  //     logo: "https://via.placeholder.com/50",
  //     origin: origin.label || "Unknown",
  //     destination: destination.label || "Unknown",
  //     departureDate,
  //     travelClass,
  //     passengers,
  //     departureTime: "2:00 PM",
  //     arrivalTime: "4:00 PM",
  //     price: "$200",
  //     stops: 2,
  //     duration: "2h 0m",
  //     co2Emission: 144,
  //     seatAvailability: {
  //       economy: { available: 0, total: 100 },
  //       business: { available: 5, total: 20 },
  //       first: { available: 1, total: 5 },
  //     },
  //   },
  //   // Add more flights as needed
  // ];

  // Filter states
  const [maxDuration, setMaxDuration] = useState(3); // Default max duration in hours
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("economy");

  // Filter flights based on selected filters
  const filteredFlights = flights.filter((flight) => {
    const flightDurationHours = parseInt(flight.duration.split("h")[0], 10);

    const matchesDuration = flightDurationHours <= maxDuration;
    const matchesDate =
      (!startDate || new Date(flight.departureDate) >= new Date(startDate)) &&
      (!endDate || new Date(flight.departureDate) <= new Date(endDate));

    return matchesDuration && matchesDate;
  });
  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

    const depDate = new Date();
    depDate.setHours(depHours, depMinutes);

    const arrDate = new Date();
    arrDate.setHours(arrHours, arrMinutes);

    const durationInMinutes = (arrDate - depDate) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("/booking", {
      state: {
        origin: origin.label || "Unknown",
      },
    });
  };

  const getSeatColor = (available) =>
    available > 0 ? "bg-green-500" : "bg-red-500";

  return (
    <div className="relative min-h-screen bg-gray-100 pt-32 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Flights
      </h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <label className="text-gray-700">Max Duration:</label>
          <input
            type="number"
            value={maxDuration}
            onChange={(e) => setMaxDuration(parseInt(e.target.value, 10))}
            min="1"
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 w-16"
          />
          <span className="text-gray-600">hours</span>
        </div>

        {/* Class Filter */}
        <div className="mb-6 flex items-center space-x-3">
          <label className="text-gray-700">Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-1"
          >
            <option value="economy">Economy</option>
            {/* <option value="business">Business</option>
          <option value="first">First Class</option> */}
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredFlights.map((flight) => (
          <div
            key={flight.airplaneId}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between transition-shadow duration-300 hover:shadow-lg"
          >
            {/* Airline Logo and Name */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src={flight.logo}
                alt={`${flight.flightNumber} logo`}
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {flight.flightNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  {flight.departureTime} - {flight.arrivalTime}
                </p>
                <p className="text-sm text-gray-600">
                  {calculateDuration(flight.departureTime, flight.arrivalTime)}
                  
                </p>
              </div>
            </div>

            {/* Flight Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-0">
              <div className="text-center md:text-left md:mr-6 mb-2 md:mb-0">
                <p className="text-gray-600">From</p>
                <p className="text-xl font-bold text-gray-800">
                  {flight.departureAirportId}
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600">To</p>
                <p className="text-xl font-bold text-gray-800">
                  {flight.arrivalAirportId}
                </p>
              </div>
            </div>

            {/* Price and Seat Availability */}
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {flight.price}
              </p>
              <p className="text-gray-600">Round trip</p>

              {/* Seat Availability */}
              <div className="mt-4">
                <p className="text-gray-700">Seat Availability:</p>
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-4 w-4 rounded-full ${getSeatColor(
                        500
                      )}`}
                    />
                    <span className="text-sm">
                      {selectedClass.charAt(0).toUpperCase() +
                        selectedClass.slice(1)}
                      : {flight.totalSeats}{" "}
                      available
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOnclick}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
