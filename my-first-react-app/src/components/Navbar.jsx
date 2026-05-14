import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">UserApp</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/users">Users</Link>

        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}


export default Navbar;