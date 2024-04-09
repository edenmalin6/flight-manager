import { storageService } from "./storageService";


export const login = (password) => {
  const entrancePassword = "12345";
  if (entrancePassword !== password)
    throw Error("You can only login with the correct password.");

  storageService.setFlightController(password);
};
export const getFlight = (number) => {
  const flights = storageService.getFlights();
  return flights.find((flight) => flight.number === number);
};
export const addFlight = ({ number, airlineCompany, numOfPassengers }) => {
  const flights = storageService.getFlights();
  const uniqueFlightNum = flights.find((flight) => flight.number === number);
  if (uniqueFlightNum)
    throw Error("It is not possible to create 2 flights with the same number.");
  if(number.length > 5) throw Error("Flight number could be 5 characters max.")
  const newFlight = {
    number,
    airlineCompany,
    numOfPassengers,
  };
  if (!airlineCompany.trim()) throw Error("AirLine Company's name must include valid characters.") 
  const updatedFlights = [...flights, newFlight];
  storageService.setFlights(updatedFlights);
};
export const deleteFlight = ({ number }) => {
  const flights = storageService.getFlights();
  const desiredFlight = flights.find((flight) => flight.number === number); 
  if(!desiredFlight)throw Error("Flight does not exist. ")
  
  const updatedFlights = flights.filter((allFlights)=> allFlights !== desiredFlight)
  storageService.setFlights([...updatedFlights])
};


