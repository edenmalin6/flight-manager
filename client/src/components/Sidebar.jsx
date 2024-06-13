import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Sidebar = () => {
  const { handleLogout } = useAuth()
  return (
   <aside>
    <p className='menu'>Menu</p>
    <div className='links-container'>
        <Link to={"/controlpanel"}>Get All Flights</Link>
      </div>
      <div className="links-container">
        <Link to={"/controlpanel/sort"}>Sort Flights</Link>
      </div>
      <div className="links-container">
        <Link to={"/controlpanel/add"}>Add A New Flight</Link>
      </div>
      <div className="links-container">
        <Link to={"/controlpanel/delete"}>Delete A Flight</Link>
      </div>
      <div className="links-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
   </aside>
  )
}

export default Sidebar