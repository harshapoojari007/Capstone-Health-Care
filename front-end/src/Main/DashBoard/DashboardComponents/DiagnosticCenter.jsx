// import React from 'react'

// const DiagnosticCenter = () => {
//   return (
//     <div>
//       <h1>DiagnosticCenter</h1>
//     </div>
//   )
// }

// export default DiagnosticCenter

import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';

const DiagnosticCenter = () => {
  
  const [centersList, setCentersList] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await Axios.get('/diagnosticcenter');
        const centersData = response.data.data; // Adjust based on actual API response
        console.log(centersData)
        setCentersList(centersData);
      } catch (error) {
        console.error('Error fetching diagnostic centers:', error);
      }
    };

    fetchCenters();
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Edit diagnostic center with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/api/v1/diagnosticcenter/${id}`);
      const deletedCenterResponse = response.data;
      const message = deletedCenterResponse.message;
      alert(message);
      // Refresh centers list after delete
      const fetchCenters = async () => {
        try {
          const response = await Axios.get('/api/v1/diagnosticcenter');
          setCentersList(response.data.data);
        } catch (error) {
          console.error('Error fetching diagnostic centers:', error);
        }
      };
      fetchCenters();
    } catch (error) {
      console.error('Error deleting diagnostic center:', error);
    }
  };

  const handleView = (id) => {
    const center = centersList.find(cen => cen.id === id);
    setSelectedCenter(center);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCenter(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Diagnostic Centers List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        
            
          
          {typeof centersList === 'string' ? (
                <p>{centersList}</p>
            ) :
          centersList.map(center => (
            <tr key={center.id}>
              <td>{center.name}</td>
              <td>{center.contactNO}</td>
              <td>{center.address}</td>
              <td>{center.email}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item as="button" onClick={() => handleView(center.id)}>View Details</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => handleEdit(center.id)}>Edit</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => handleDelete(center.id)}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display diagnostic center details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Diagnostic Center Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCenter ? (
            <div className="center-details">
              <h4>Center Information</h4>
              <p><strong>Name:</strong> {selectedCenter.name}</p>
              <p><strong>Contact Number:</strong> {selectedCenter.contactNO}</p>
              <p><strong>Address:</strong> {selectedCenter.address}</p>
              <p><strong>Email:</strong> {selectedCenter.email}</p>
              <p><strong>Tests Offered:</strong> {selectedCenter.diagnosticTests ? selectedCenter.diagnosticTests.map(test => test.testName).join(', ') : 'None'}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiagnosticCenter;
