import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faChartLine,
  faMicrochip,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import "../layout.css";

function AuthenticatedNavbar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (  
    <nav className="navbar authenticated">
      <div className="navbar-container">
        <Link to="/app" className="navbar-logo">
          <div className="logo-animation">
            <div className="drop"></div>
            <div className="wave"></div>
          </div>
          <span>H2Flow Dashboard</span>
        </Link>
        <span>
          <FontAwesomeIcon icon={faUser} /> {currentUser?.name}
        </span>
        <div className="navbar-menu">
          <ul className="navbar-links">
            <li>
              <Link to="/app" className={isActive("/app") ? "active" : ""}>
                <FontAwesomeIcon icon={faChartLine} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/app/water-quality"
                className={isActive("/app/water-quality") ? "active" : ""}
              >
                <FontAwesomeIcon icon={faTint} /> Water Quality
              </Link>
            </li>
            <li>
              <Link
                to="/app/sensor-readings"
                className={isActive("/app/sensor-readings") ? "active" : ""}
              >
                <FontAwesomeIcon icon={faMicrochip} /> Sensor Readings
              </Link>
            </li>
            <li className="user-menu">
              <button
                onClick={logout}
                className="logout-button navbar-auth-button"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AuthenticatedNavbar;
