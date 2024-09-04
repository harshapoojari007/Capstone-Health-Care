import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal, Form } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    patientName: '',
    mobileNumber: '',
    appointmentDate: '',
    diagnosticTests: [],
    diagnosticCenter: {}
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Axios.get('/appointments');
        console.log(response.data); // Log the entire response
        setAppointmentsList(response.data.data || []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleEdit = (id) => {
    const appointment = appointmentsList.find(app => app.id === id);
    setFormData({
      id: appointment.id,
      patientName: appointment.patientName || '',
      mobileNumber: appointment.mobileNumber || '',
      appointmentDate: new Date(appointment.appointmentDate).toISOString().substring(0, 10), // Format date for input
      diagnosticTests: appointment.diagnosticTests || [],
      diagnosticCenter: appointment.diagnosticCenter || {}
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/appointment/${id}`);
      alert(response.data.message);
      setAppointmentsList(appointmentsList.filter(app => app.id !== id));
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
    setIsEditing(false);
    setFormData({
      id: '',
      patientName: '',
      mobileNumber: '',
      appointmentDate: '',
      diagnosticTests: [],
      diagnosticCenter: {}
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await Axios.put(`/appointment/${formData.id}`, formData);
        alert('Appointment updated successfully!');
      } else {
        await Axios.post('/appointments', formData);
        alert('Appointment added successfully!');
      }
      handleCloseModal();
      // // Refresh the appointments list
      // await fetchAppointments();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
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
          {appointmentsList.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No appointments found</td>
            </tr>
          ) : (
            appointmentsList.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patientName || 'N/A'}</td>
                <td>{appointment.mobileNumber || 'N/A'}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>
                  <DropdownButton id="dropdown-basic-button" title="Actions">
                    <Dropdown.Item as="button" onClick={() => handleView(appointment.id)}>View Details</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleEdit(appointment.id)} className="text-warning fw-bold">Edit</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleDelete(appointment.id)} className="text-danger fw-bold">Delete</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal to display or edit appointment */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Appointment' : 'Appointment Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="patientName">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="patientName" 
                  value={formData.patientName} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="mobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="mobileNumber" 
                  value={formData.mobileNumber} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="appointmentDate">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="appointmentDate" 
                  value={formData.appointmentDate} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="diagnosticTests">
                <Form.Label>Diagnostic Tests (comma-separated)</Form.Label>
                <Form.Control 
                  type="text" 
                  name="diagnosticTests" 
                  value={formData.diagnosticTests.join(', ')} 
                  onChange={e => setFormData({ ...formData, diagnosticTests: e.target.value.split(',').map(test => test.trim()) })} 
                />
              </Form.Group>
              <Form.Group controlId="diagnosticCenter">
                <Form.Label>Diagnostic Center Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="diagnosticCenter" 
                  value={formData.diagnosticCenter.name || ''} 
                  onChange={e => setFormData({ ...formData, diagnosticCenter: { name: e.target.value } })} 
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                {isEditing ? 'Update Appointment' : 'Add Appointment'}
              </Button>
            </Form>
          ) : (
            selectedAppointment ? (
              <div className="appointment-details">
                <h4>Patient Information</h4>
                <p><strong>Name:</strong> {selectedAppointment.patientName || 'N/A'}</p>
                <p><strong>Age:</strong> {selectedAppointment.age || 'N/A'}</p>
                <p><strong>Mobile Number:</strong> {selectedAppointment.mobileNumber || 'N/A'}</p>
                <p><strong>Gender:</strong> {selectedAppointment.gender || 'N/A'}</p>
                <p><strong>Aadhar Number:</strong> {selectedAppointment.aadharNumber || 'N/A'}</p>

                <h4>Appointment Details</h4>
                <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Diagnostic Tests:</strong> {selectedAppointment.diagnosticTests.length > 0 ? selectedAppointment.diagnosticTests.join(', ') : 'None'}</p>
                <p><strong>Diagnostic Center:</strong> {selectedAppointment.diagnosticCenter ? selectedAppointment.diagnosticCenter.name : 'N/A'}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )
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
