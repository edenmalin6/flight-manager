const FLIGHT_CONTROLLER_KEY = "flightController";
const FLIGHTS_BOARD_KEY = "flightsBoard";

export const storageService = {
  getFlightController() {
    return localStorage.getItem(FLIGHT_CONTROLLER_KEY);
  },
  setFlightController(password) {
    localStorage.setItem(FLIGHT_CONTROLLER_KEY, password);
  },
  getFlights() {
    const flights = localStorage.getItem(FLIGHTS_BOARD_KEY);
    return flights ? JSON.parse(flights) : [];
  },
  setFlights(flights) {
    localStorage.setItem(FLIGHTS_BOARD_KEY, JSON.stringify(flights));
  },
  clearAll(){
    localStorage.removeItem(FLIGHT_CONTROLLER_KEY)
  }
};
