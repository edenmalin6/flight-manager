import React from "react";
import { useState, useEffect } from "react";
import { addFlight } from "../services/userService";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
  const [flightNum, setFlightNumber] = useState("");
  const [airlineCompany, setAirlineCompany] = useState("");
  const [numOfPassengers, setNumOfPassengers] = useState("");
  const navigate = useNavigate();
  

  const handleCreateFlight = (e) => {
    e.preventDefault();
    try {
      addFlight({ number: flightNum, airlineCompany, numOfPassengers });
    } catch (error) {
      alert(error.message);
      throw error;
    }
    navigate("/controlpanel");
    setFlightNumber("");
    setAirlineCompany("");
    setNumOfPassengers("");
  };
  return (
    <div className="add-flight-container">
      <h1>Add your new flight here</h1>
      <form onSubmit={handleCreateFlight}>
        <input
          value={flightNum}
          placeholder="Insert flight number here..."
          onChange={(e) => setFlightNumber(e.target.value)}
          required
          type="number"
        ></input>
        <input
          value={airlineCompany}
          placeholder="Insert airline company name here..."
          onChange={(e) => setAirlineCompany(e.target.value)}
          type="text"
          required
          minLength={1}
        ></input>
        <input
          value={numOfPassengers}
          placeholder="Insert number of passengers here..."
          onChange={(e) => setNumOfPassengers(e.target.value)}
          type="number"
          required
          min={1}
          max={450}
        ></input>
        <button type="submit">Add New Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
