import React, { useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal } from 'react-bootstrap'; // Ensure react-bootstrap is installed

const initialAppointments = [
  { id: 1, patientName: 'John Doe', age: 30, mobileNumber: '123-456-7890', gender: 'Male', aadharNumber: '1234 5678 9012', appointmentDate: '2024-09-10T10:00', diagnosticTests: ['Test 1','Test 2'], diagnosticCenter: 'Center A' },
  { id: 2, patientName: 'Jane Smith', age: 25, mobileNumber: '987-654-3210', gender: 'Female', aadharNumber: '9876 5432 1098', appointmentDate: '2024-09-12T14:00', diagnosticTests: ['Test 2'], diagnosticCenter: 'Center B' },
  // Add more appointments as needed
];

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Edit appointment with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    setAppointmentsList(appointmentsList.filter(appointment => appointment.id !== id));
  };

  const handleView = (id) => {
    const appointment = appointmentsList.find(app => app.id === id);
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointments List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Mobile Number</th>
            <th>Appointment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.mobileNumber}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item as="button" onClick={() => handleView(appointment.id)}>View Details</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => handleEdit(appointment.id)}>Edit</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => handleDelete(appointment.id)}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display appointment details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment ? (
            <div className="appointment-details">
              <h4>Patient Information</h4>
              <p><strong>Name:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Age:</strong> {selectedAppointment.age}</p>
              <p><strong>Mobile Number:</strong> {selectedAppointment.mobileNumber}</p>
              <p><strong>Gender:</strong> {selectedAppointment.gender}</p>
              <p><strong>Aadhar Number:</strong> {selectedAppointment.aadharNumber}</p>

              <h4>Appointment Details</h4>
              <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleString()}</p>
              <p><strong>Diagnostic Tests:</strong> {selectedAppointment.diagnosticTests.join(', ')}</p>
              <p><strong>Diagnostic Center:</strong> {selectedAppointment.diagnosticCenter}</p>
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

export default Appointments;
