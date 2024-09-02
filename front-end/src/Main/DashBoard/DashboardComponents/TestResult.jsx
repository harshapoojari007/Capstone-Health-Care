import React, { useState } from 'react';
import { Modal, Button, Table, Card } from 'react-bootstrap'; // Ensure react-bootstrap is installed

// Dummy data for demonstration
const initialDiagnosticTests = [
  { id: 1, testName: 'Blood Test', testReading: 120.5, testCondition: 'Normal', appointment: { id: 1, patientName: 'John Doe', mobileNumber: '123-456-7890', appointmentDate: '2024-09-10T10:00' } },
  { id: 2, testName: 'X-Ray', testReading: 60.0, testCondition: 'Abnormal', appointment: { id: 2, patientName: 'Jane Smith', mobileNumber: '987-654-3210', appointmentDate: '2024-09-12T14:00' } },
  // Add more diagnostic tests as needed
];

const TestResult = () => {
  const [diagnosticTestsList, setDiagnosticTestsList] = useState(initialDiagnosticTests);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleView = (id) => {
    const test = diagnosticTestsList.find(test => test.id === id);
    setSelectedTest(test);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTest(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Diagnostic Tests List</h2>

      {/* Diagnostic Tests List Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Patient Name</th>
            <th>Mobile Number</th>
            <th>Appointment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {diagnosticTestsList.map(test => (
            <tr key={test.id}>
              <td>{test.testName}</td>
              <td>{test.appointment.patientName}</td>
              <td>{test.appointment.mobileNumber}</td>
              <td>{new Date(test.appointment.appointmentDate).toLocaleString()}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(test.id)}>View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* View Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Diagnostic Test Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTest ? (
            <Card>
              <Card.Body>
                <Card.Title>Test Details</Card.Title>
                <Table bordered>
                  <tbody>
                    <tr>
                      <td><strong>Test Name:</strong></td>
                      <td>{selectedTest.testName}</td>
                    </tr>
                    <tr>
                      <td><strong>Test Reading:</strong></td>
                      <td>{selectedTest.testReading}</td>
                    </tr>
                    <tr>
                      <td><strong>Test Condition:</strong></td>
                      <td>{selectedTest.testCondition}</td>
                    </tr>
                    <tr>
                      <td><strong>Appointment ID:</strong></td>
                      <td>{selectedTest.appointment.id}</td>
                    </tr>
                    <tr>
                      <td><strong>Patient Name:</strong></td>
                      <td>{selectedTest.appointment.patientName}</td>
                    </tr>
                    <tr>
                      <td><strong>Mobile Number:</strong></td>
                      <td>{selectedTest.appointment.mobileNumber}</td>
                    </tr>
                    <tr>
                      <td><strong>Appointment Date:</strong></td>
                      <td>{new Date(selectedTest.appointment.appointmentDate).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <p>No details available</p>
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

export default TestResult;
