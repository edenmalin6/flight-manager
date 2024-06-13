import  { useState, useEffect } from "react";
import Select from "react-select";
import { storageService } from "../services/storageService";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";

const SortFlights = () => {
  const { loading, setLoading } = useAuth();
  const [flights, setFlights] = useState(storageService.getFlights());
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const allFlights = storageService.getFlights();

  const options = [
    { value: "highest", label: "Highest N.O.P" },
    { value: "lowest", label: "Lowest N.O.P" },
  ];
  useEffect(() => {
    if (allFlights.length > 0) {
      setLoading(false);
    }
    const previousSearch = localStorage.getItem("inputValue");
    if (previousSearch) {
      setInputValue(previousSearch);
    }
  }, []);
  useEffect(() => {
    const result = allFlights
      .filter((flight) =>
        flight.airlineCompany.toLowerCase().includes(inputValue.toLowerCase())
      )
      .sort((a, b) =>
        selectedOption === "lowest"
          ? a.numOfPassengers - b.numOfPassengers
          : b.numOfPassengers - a.numOfPassengers
      );
    setFlights(result);
  }, [selectedOption, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    localStorage.setItem("inputValue", e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option.value);
  };

  return (
    <div className="sorting-page-container">
      {loading && <Loading />}
      <div className="sort-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search flight by AirLine Company..."
        />
      <Select
        options={options}
        onChange={handleSelect}
        className="custom-select"
      />
      </div>
      {
        <div className="flights-container">
          {flights.map((flight, index) => (
            <div className="flight-box" key={index}>
              <p>Flight Number: {flight.number}</p>
              <p>Airline Company: {flight.airlineCompany}</p>
              <p>Number Of Passengers: {flight.numOfPassengers}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
export default SortFlights;
