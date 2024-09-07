
import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import "./sidebar.css";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
const Sidebar = ({ setSelectedView }) => {
  // const { user } = useUser();
  const [selectedView, setSelectedViewState] = useState(null);
  const {username,role,logout}=useUser()
  const navigate=useNavigate()
  const adminLinks = [
    'dashboard',
    'appointments',
    'diagnosticCenters',
    'diagnosticTests',
    'testResults',
    'patients',
    'settings'
  ];

  const userLinks = [
    'dashboard',
    'appointments',
    'testResults',
    'settings'
  ];

  const centerAdminLinks = [
    'dashboard',
    'appointments',
    'diagnosticCenter',
    'diagnosticTests',
    'testResults',
    'settings'
  ];

  const linksToShow = role === 'ADMIN' ? adminLinks 
                     : role === 'CENTER_ADMIN' ? centerAdminLinks
                    : userLinks;

  const handleClick = (view) => {
    setSelectedView(view);
    setSelectedViewState(view);
  };

  const logouts=()=>{
    logout();
    navigate("/login")

 }
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar p-4">
      <div className="position-sticky">
        <div className="user-details p-3 border-bottom">
          {/* <h5>User Details</h5> */}
          <div className="sidebar_userdetails">
          <p>Role: {role}</p>
          <p>Username: {username}</p>
          </div>
          <div>
             <Button onClick={logouts} className="welcome_navbtn">Logout</Button>
           </div>
        </div>
        <ul className="nav flex-column mt-3">
          {linksToShow.map(view => (
            <li className="nav-item" key={view}>
              <a
                className={`nav-link ${selectedView === view ? 'active' : ''}`}
                href="#"
                onClick={() => handleClick(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

