import React from 'react';
import { useUser } from '../../UserContext';

const Sidebar = ({ setSelectedView }) => {
  const { user } = useUser();
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
    'diagnosticCenters',
    'testResults',
    'settings'
  ];

  const linksToShow = user.role==='admin' ? adminLinks 
                     :user.role==='centerAdmin' ? centerAdminLinks
                    : userLinks;

  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <div className="user-details p-3 border-bottom">
          <h5>User Details</h5>
          <p>Role: {user.role === 'admin' ? 'Admin' :user.role ==='centerAdmin' ? 'centerAdmin' : 'User'}</p>
          <p>Username: John Doe</p>
        </div>
        <ul className="nav flex-column mt-3">
          {linksToShow.map(view => (
            <li className="nav-item" key={view}>
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedView(view)}
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

