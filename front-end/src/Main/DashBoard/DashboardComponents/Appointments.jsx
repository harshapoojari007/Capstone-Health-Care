import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';
const Appointments = () => {
  
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Axios.get('/appointments');
        const appointmentData=response.data;
        setAppointmentsList(appointmentData.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);
  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Edit appointment with ID: ${id}`);
  };

  const handleDelete =async (id) => {
    try {
      const response=await Axios.post(`/appointment/${id}`);
      const deletedAppointmentResponse=response.data;
      const message= deletedAppointmentResponse.message;
      alert(message)
    } catch (error) {
      console.error('Error deleting Appointment:', error);
    }
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
console.log(appointmentsList)
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointments List</h2>
      <p>{appointmentsList}</p>
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
