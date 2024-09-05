// import React from 'react';
// import { useUser } from '../../UserContext';

// import "./sidebar.css"

// const Sidebar = ({ setSelectedView }) => {
//   const { user } = useUser();
//   const adminLinks = [
//     'dashboard',
//     'appointments',
//     'diagnosticCenters',
//     'diagnosticTests',
//     'testResults',
//     'patients',
//     'settings'
//   ];

//   const userLinks = [
//     'dashboard',
//     'appointments',
//     'testResults',
//     'settings'
//   ];
//   const centerAdminLinks = [
//     'dashboard',
//     'appointments',
//     'diagnosticCenters',
//     'diagnosticTests',
//     'testResults',
//     'settings'
//   ];

//   const linksToShow = user.role==='admin' ? adminLinks 
//                      :user.role==='centerAdmin' ? centerAdminLinks
//                     : userLinks;

//   return (
//     <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar p-4">
//       <div className="position-sticky">
//         <div className="user-details p-3 border-bottom">
//           <h5>User Details</h5>
//           <p>Role: {user.role === 'admin' ? 'Admin' :user.role ==='centerAdmin' ? 'centerAdmin' : 'User'}</p>
//           <p>Username: John Doe</p>
//         </div>
//         <ul className="nav flex-column mt-3">
//           {linksToShow.map(view => (
//             <li className="nav-item" key={view}>
//               <a
//                 className="nav-link"
//                 href="#"
//                 onClick={() => setSelectedView(view)}
//               >
//                 {view.charAt(0).toUpperCase() + view.slice(1)}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import "./sidebar.css";

const Sidebar = ({ setSelectedView }) => {
  const { user } = useUser();
  const [selectedView, setSelectedViewState] = useState(null);

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
    'diagnosticTests',
    'testResults',
    'settings'
  ];

  const linksToShow = user.role === 'admin' ? adminLinks 
                     : user.role === 'centerAdmin' ? centerAdminLinks
                    : userLinks;

  const handleClick = (view) => {
    setSelectedView(view);
    setSelectedViewState(view);
  };

  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar p-4">
      <div className="position-sticky">
        <div className="user-details p-3 border-bottom">
          {/* <h5>User Details</h5> */}
          <div className="sidebar_userdetails">
          <p>Role: {user.role === 'admin' ? 'Admin' : user.role === 'centerAdmin' ? 'centerAdmin' : 'User'}</p>
          <p>Username: John Doe</p>
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

