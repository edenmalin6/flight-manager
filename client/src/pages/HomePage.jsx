import React, { useEffect, useState } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { storageService } from "../services/storageService";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const [flights, setFlights] = useState([]);
  const { loading, setLoading } = useAuth()

  useEffect(() => {
    const fetchedFlights = storageService.getFlights();
    if(fetchedFlights.length > 0) {
      setFlights(fetchedFlights);
      setLoading(false)
    }
  }, []);
  const renderFlights = () =>
    flights.map((flight, index) => (
      <div className="flight-box" key={index}>
        <p>Flight Number : {flight.number}</p>
        <p>Airline Company: {flight.airlineCompany}</p>
        <p>Number Of Passengers: {flight.numOfPassengers}</p>
      </div>
    ));
  return (
    <div className="controller-container">
      <h1>Welcome back!</h1>
      {loading && (<Loading />)}
      <div className="flights-box">{renderFlights()}</div>
    </div>
  );
};

export default HomePage;
