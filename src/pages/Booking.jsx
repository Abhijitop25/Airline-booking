import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const [passengerInfo, setPassengerInfo] = useState({
    fullName: '',
    age: '',
    passportNumber: '',
    seatSelection: '',
  });
  const [passengers, setPassengers] = useState([]);
  const location = useLocation();
  const { flight, noOfPassengers } = location.state;
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(noOfPassengers);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo({ ...passengerInfo, [name]: value });
  };

  const addPassenger = (e) => {
    e.preventDefault();
    setPassengers([...passengers, passengerInfo]);
    setTotalPrice(totalPrice + flight.price);
    setPassengerInfo({
      fullName: '',
      age: '',
      passportNumber: '',
      seatSelection: '',
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // Submit final booking info
    console.log('Passengers:', passengers);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto mt-20">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Flight Booking</h1>

        {/* Flight Details Section */}
        {flight && (
          <div className="bg-[#d1e8e2] shadow-lg rounded-lg p-6 mb-10 border border-blue-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flight Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Flight Number:</p>
                <p className="text-xl font-bold">{flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Departure:</p>
                <p className="text-xl font-bold">{new Date(flight.departureTime).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Arrival:</p>
                <p className="text-xl font-bold">{new Date(flight.arrivalTime).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Price per Passenger:</p>
                <p className="text-xl font-bold text-green-600">₹{flight.price}</p>
              </div>
            </div>
          </div>
        )}

        {/* Passenger Information Form */}
        <div className="bg-[#d1e8e2] shadow-lg rounded-lg p-6 mb-10 border border-blue-300">
          <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
          <form onSubmit={addPassenger}>
            <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={passengerInfo.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={passengerInfo.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">
                  Passport Number (Optional)
                </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={passengerInfo.passportNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label htmlFor="seatSelection" className="block text-sm font-medium text-gray-700">
                  Seat Selection
                </label>
                <select
                  id="seatSelection"
                  name="seatSelection"
                  value={passengerInfo.seatSelection}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select Seat</option>
                  <option value="Window">Window</option>
                  <option value="Aisle">Aisle</option>
                  <option value="Middle">Middle</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                Add Passenger
              </button>
            </div>
          </form>
        </div>

        {/* Added Passengers Section */}
        <div className="bg-[#d1e8e2] shadow-lg rounded-lg p-6 mb-10 border border-blue-300">
          <h2 className="text-xl font-semibold mb-4">Added Passengers</h2>
          <ul className="space-y-4">
            {passengers.map((passenger, index) => (
              <li key={index} className="border border-blue-200 p-4 rounded-md">
                <p><strong>Name:</strong> {passenger.fullName}</p>
                <p><strong>Age:</strong> {passenger.age}</p>
                <p><strong>Seat:</strong> {passenger.seatSelection}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xl font-semibold">
            Total Price: ₹{totalPrice}
          </div>
        </div>

        {/* Complete Booking Button */}
        <div className="mt-6">
          <button
            onClick={handleBooking}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
