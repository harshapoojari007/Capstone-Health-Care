import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Table, Dropdown } from 'react-bootstrap';
import Axios from '../../../configurations/Axios';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [showUpdatePatientModal, setShowUpdatePatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });
  const [newPatient, setNewPatient] = useState({
    name: '',
    phoneNo: '',
    age: '',
    gender: '',
    userId: ''
  });
  const [patientToUpdate, setPatientToUpdate] = useState({
    id: '',
    name: '',
    phoneNo: '',
    age: '',
    gender: '',
    userId: ''
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await Axios.get('/patients');
        setPatients(response.data.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleShowAddPatientModal = () => setShowAddPatientModal(true);
  const handleCloseAddPatientModal = () => setShowAddPatientModal(false);

 

  const handleDeletePatient = async (id) => {
    try {
      await Axios.delete(`/patient/${id}`);
      setShowAlert({ show: true, message: 'Patient deleted successfully.', variant: 'success' });
      const updatedResponse = await Axios.get('/patients');
      setPatients(updatedResponse.data.data);
    } catch (error) {
      console.error('Error deleting patient:', error);
      setShowAlert({ show: true, message: 'Error deleting patient.', variant: 'danger' });
    }
  };

  const handleUpdatePatient = async (id) => {
    try {
      const response = await Axios.get(`/patient/${id}`);
      const patient = response.data.data;
      setPatientToUpdate(patient);
      setShowUpdatePatientModal(true);
    } catch (error) {
      console.error('Error fetching patient:', error);
      setShowAlert({ show: true, message: 'Error fetching patient data.', variant: 'danger' });
    }
  };

  const handleShowAppointmentsModal = async (patient) => {
    try {
      const response = await Axios.get(`/appointment/patient/${patient.id}`);
      setAppointments(response.data.data);
      setSelectedPatient(patient);
      setShowAppointmentsModal(true);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setShowAlert({ show: true, message: 'Error fetching appointments.', variant: 'danger' });
    }
  };

  const handleCloseAppointmentsModal = () => {
    setShowAppointmentsModal(false);
    setAppointments([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setPatientToUpdate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await Axios.put(`/patient/${patientToUpdate.id}`, patientToUpdate);
      setShowAlert({ show: true, message: 'Patient updated successfully.', variant: 'success' });
      setShowUpdatePatientModal(false);
      setPatientToUpdate({
        id: '',
        name: '',
        phoneNo: '',
        age: '',
        gender: '',
        userId: ''
      });

      const updatedResponse = await Axios.get('/patients');
      setPatients(updatedResponse.data.data);
    } catch (error) {
      console.error('Error updating patient:', error);
      setShowAlert({ show: true, message: 'Error updating patient.', variant: 'danger' });
    }
  };

  const handlePrintInvoice = (appointmentId) => {
    // Logic for printing invoice, e.g., open a new window with invoice details
    alert(`Print invoice for appointment ID: ${appointmentId}`);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Patient Management</h2>

      {/* Alert for Success/Failure */}
      {showAlert.show && <Alert variant={showAlert.variant}>{showAlert.message}</Alert>}

      {/* Patients Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {typeof patients === 'string' ? (
            <tr>
              <td colSpan="5" className="text-center">No Patients currently</td>
            </tr>
          ) : (
            patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.phoneNo}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShowAppointmentsModal(patient)}>View Appointments</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleUpdatePatient(patient.id)}>Update</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeletePatient(patient.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Update Patient Modal */}
      <Modal show={showUpdatePatientModal} onHide={() => setShowUpdatePatientModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={patientToUpdate.name}
                onChange={handleUpdateChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNo">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNo"
                value={patientToUpdate.phoneNo}
                onChange={handleUpdateChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={patientToUpdate.age}
                onChange={handleUpdateChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={patientToUpdate.gender}
                onChange={handleUpdateChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                name="userId"
                value={patientToUpdate.userId}
                onChange={handleUpdateChange}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateSubmit} className="mt-3">
              Update Patient
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdatePatientModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Appointments Modal */}
      <Modal show={showAppointmentsModal} onHide={handleCloseAppointmentsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Appointments for {selectedPatient?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Approval Status</th>
                <th>Diagnostic Tests</th>
                <th>Center</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {typeof appointments === 'string'? (
                <tr>
                  <td colSpan="5" className="text-center">No appointments found</td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td>{appointment.approvalStatus}</td>
                    <td>{appointment.diagnosticTests.map(test => test.name).join(', ')}</td>
                    <td>{appointment.diagnosticCenter.name}</td>
                    <td>
                      <Button variant="link" onClick={() => handlePrintInvoice(appointment.id)}>
                        Print Invoice
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAppointmentsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Patient;
