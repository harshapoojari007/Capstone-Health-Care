import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Table, Dropdown } from 'react-bootstrap';
import Axios from '../../../configurations/Axios';
import { useUser } from '../../../UserContext';
const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });
  const {role,username}=useUser()
  const [newPatient, setNewPatient] = useState({
    name: '',
    phoneNo: '',
    age: '',
    gender: '',
    userId: ''
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if(role==='USER'){
          const response = await Axios.get(`/patient/username/${username}`);
          setPatients(response.data.data);
        }else{
          const response = await Axios.get('/patients');
          setPatients(response.data.data);
        }
        
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleShowAddPatientModal = () => setShowAddPatientModal(true);
  const handleCloseAddPatientModal = () => setShowAddPatientModal(false);

  const handleAddPatient = async () => {
    try {
      const response = await Axios.post('/patient', newPatient);
      const addedPatientResponse = response.data;
      const message = addedPatientResponse.message;

      setShowAlert({ show: true, message: message, variant: 'success' });
      handleCloseAddPatientModal();
      setNewPatient({
        name: '',
        phoneNo: '',
        age: '',
        gender: '',
        userId: ''
      });
   
      
      const updatedResponse = await Axios.get('/patient');
      setPatients(updatedResponse.data);
    } catch (error) {
      console.error('Error adding patient:', error);
      setShowAlert({ show: true, message: 'Error adding patient.', variant: 'danger' });
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await Axios.delete(`/patient/${id}`);
      setShowAlert({ show: true, message: 'Patient deleted successfully.', variant: 'success' });
      // Fetch updated patient list
     // const updatedResponse = await Axios.get('/patient');
      //setPatients(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting patient:', error);
      setShowAlert({ show: true, message: 'Error deleting patient.', variant: 'danger' });
    }
  };

  const handleUpdatePatient = (id) => {
    const patient = patients.find(patient => patient.id === id);
    setSelectedPatient(patient);
    // Show update modal or handle update here
  };

  const handleViewAppointments = async (patient) => {
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

  const handlePrintInvoice = (appointmentId) => {
    // Logic for printing invoice, e.g., open a new window with invoice details
    alert(`Print invoice for appointment ID: ${appointmentId}`);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Patient Management</h2>

      {/* Alert for Success/Failure */}
      {showAlert.show && <Alert variant={showAlert.variant}>{showAlert.message}</Alert>}

      {/* Add Patient Button */}
      <div className="text-right mb-3">
        {/* <Button variant="success" onClick={handleShowAddPatientModal}>
          Add Patient
        </Button> */}
      </div>

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
          {typeof patients === 'string' || patients.length===0 ? (
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
                      <Dropdown.Item onClick={() => handleViewAppointments(patient)}>View Appointments</Dropdown.Item>
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

      {/* Add Patient Modal */}
      <Modal show={showAddPatientModal} onHide={handleCloseAddPatientModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newPatient.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNo">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNo"
                value={newPatient.phoneNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={newPatient.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={newPatient.gender}
                onChange={handleChange}
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
                value={newPatient.userId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddPatient} className="mt-3">
              Add Patient
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPatientModal}>
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
              {typeof appointments==='string' ?(<tr>
              <td colSpan="5" className="text-center">No Appointments available</td>
            </tr>):
              
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
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No appointments found</td>
                </tr>
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
