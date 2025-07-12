import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logos/logo-project-earth-health.png'
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import AuthContext from "../../../context/auth/authContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlusCircle,
//   faSignOutAlt,
//   faSignInAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import logo from "../../../assets/logos/logo-project-earth-health.png";
// import "./Navbar.css";

const Navbar = ({ prop1, prop2 }) => {
//   const authContext = useContext(AuthContext);

//   const { isAuthenticated, logout, user } = authContext;

//   const handleLogout = () => logout();

  const authLinks = (
    <Fragment>
      {/* <li>Hello {user && user.username}</li> */}
      <li>
        
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        {/* <Link to="/login">Login</Link> */}
      </li>
      <li>
        {/* <Link to="/register">Register</Link> */}
      </li>
    </Fragment>
  );

  // 'Add Action' dropdown menu
//   const [openActionMenu, setOpenActionMenu] = useState(false);

  // 'Add Action' dropdown ref and close button ref
//   const addActionRef = useRef();
//   const addActionBtnRef = useRef();

//   useEffect(() => {
//     if (openActionMenu) {
//       // Bind the event listener
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [openActionMenu]);

  // Toggle 'Add Action' dropdown
//   const handleOpenActionMenu = () => {
//     setOpenActionMenu(!openActionMenu);
//   };

  // -------------------------
  // Event Listeners
  // -------------------------

  // If 'Add Action' dropdown is open and the user clicks outside of the dropdown or its close button, call the handleOpenActionMenu function to close the dropdown.
//   const handleClickOutside = (event) => {
//     if (
//       addActionRef.current &&
//       !addActionRef.current.contains(event.target) &&
//       !addActionBtnRef.current.contains(event.target)
//     ) {
//       handleOpenActionMenu();
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//   };

  return (
    <Fragment>
      <header className="bg-primary--dark pt">
        <div className="container navbar grid-2">
          <Link to="/">
            <img src={logo} alt="Project Earth Health" style={{ width: "auto", height: "48px" }} />
          </Link>
          <div className="navbar-right">
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/about">
              About
            </NavLink>
            <NavLink to="/profile">
              My Profile
            </NavLink>
            {/* <button
              ref={addActionBtnRef}
              onClick={handleOpenActionMenu}
              style={{ position: "relative", zIndex: "999999" }}
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  transform: openActionMenu ? "rotate(45deg)" : "",
                  transition: "transform 150ms ease",
                }}
              />
            </button> */}
            {/* <ul className="list">{isAuthenticated ? authLinks : guestLinks}</ul> */}

            {/* Add Action Animated Dropdown */}
            {/* <div
              ref={addActionRef}
              className="card"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "#111",
                visibility: openActionMenu ? "visible" : "hidden",
                opacity: openActionMenu ? "1" : "0",
                transform: "translate(-12px, 12px)",
                transition: "opacity 150ms ease, visibility 150ms ease",
              }}
            >
              <h2 className="text-left">Actions</h2>
              <p>Choose an action type</p>
              <ul className="list">
                <li>
                  <Link to="/add-travel" onClick={handleOpenActionMenu}>
                    Travel
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

// Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
// };

// Navbar.defaultProps = {
//   title: "Project Earth Health",
// };

export default Navbar;
