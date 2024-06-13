import { useState } from "react";
import { deleteFlight } from "../services/userService";
import { useAuth } from "../context/AuthProvider";
import swal from "sweetalert";
import { storageService } from "../services/storageService";

const DeleteFlight = () => {
  const [flightNum, setFlightNum] = useState("")
  const { error, setError } = useAuth("")
  const handleDelete = (e) =>{
    e.preventDefault()
    try {
      deleteFlight({number: flightNum})
      console.log(flightNum);
    } catch (error) {
      setError(error.message)
      throw error
    } 
    const availableFlights = storageService.getFlights().length
   swal({
    title: "Flight deleted successfully!",
    text: `Available Flights: ${availableFlights}`,
    icon: "success"
   })
   setError("")
   setFlightNum("")
  }
  return (
    <div className="delete-flight-container">
      <h1>Delete A Flight Here</h1>
      <form onSubmit={handleDelete}> 
      {error && <p className="error">{error}</p> }
      <input
        type="number"
        placeholder="Insert the flight number in order to delete..."
        value={flightNum}
        onChange={(e)=> setFlightNum(e.target.value)}
        minLength={1}
        maxLength={5}
      ></input>
      <button>Delete Flight</button>
      </form>
     
    </div>
  );
};

export default DeleteFlight;
