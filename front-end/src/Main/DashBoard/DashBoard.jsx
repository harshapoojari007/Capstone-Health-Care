import React, { useState } from 'react'
import Sidebar from './Sidebar';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

import { useUser } from '../../UserContext';

import DiagnosticTest from './DashboardComponents/DiagnosticTest';
import TestResult from './DashboardComponents/TestResult';
import Patient from './DashboardComponents/Patient';
import Setting from './DashboardComponents/Setting';
import DiagnosticCenter from './DashboardComponents/DiagnosticCenter';
import Appointments from './DashboardComponents/Appointments';

const DashBoard = () => {
    const { user } = useUser();
    const [selectedView, setSelectedView] = useState('dashboard'); // Default view
  
    // Content rendering based on selected view
    const renderContent = () => {
      switch (selectedView) {
        case 'appointments':
          return <Appointments />;
        case 'diagnosticCenters':
          return <DiagnosticCenter />;
        case 'diagnosticTests':
          return <DiagnosticTest />;
        case 'testResults':
          return <TestResult />;
        case 'patients':
          return <Patient />;
        case 'settings':
          return <Setting />;
        default:
          return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
      }
    };
  
    return (
     
      <div className="container-fluid h-full ">
        <div className="row vh-100">
          <Sidebar setSelectedView={setSelectedView} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
            <h1 className="my-4">{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}</h1>
            {renderContent()}
          </main>
        </div>
      </div>
    );
  };
export default DashBoard;
