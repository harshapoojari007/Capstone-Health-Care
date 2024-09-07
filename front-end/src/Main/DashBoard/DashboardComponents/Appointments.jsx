import React, { useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal, Form } from 'react-bootstrap'; 
import Axios from '../../../configurations/Axios';

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDiagnosticTest, setSelectedDiagnosticTest] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    patientName: '',
    mobileNumber: '',
    appointmentDate: '',
    diagnosticTests: [],
    diagnosticCenter: {}
  });
  const [showTestResultsModal, setShowTestResultsModal] = useState(false);
  const [newTestResult, setNewTestResult] = useState({
    testName: '',
    testReading: '',
    testCondition: '',
    appointment: {
      id: ''
    }
  });

  // Fetch appointments and set the appointments list
  const fetchAppointments = async () => {
    try {
      const response = await Axios.get('/appointments');
      setAppointmentsList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Fetch appointments on component mount
  useState(() => {
    fetchAppointments();
  }, []);

  const handleEdit = (id) => {
    const appointment = appointmentsList.find(app => app.id === id);
    setFormData({
      id: appointment.id,
      patientName: appointment.patient.name || '',
      mobileNumber: appointment.patient.phoneNo || '',
      appointmentDate: new Date(appointment.appointmentDate).toISOString().substring(0, 10),
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
        await Axios.post('/appointment', formData);
        alert('Appointment added successfully!');
      }
      handleCloseModal();
      fetchAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleTestResultsModal = (id) => {
    const appointment = appointmentsList.find(app => app.id === id);
    
    if (appointment) {
      // Assuming `appointment.testResults` contains existing test results
      const existingTestNames = new Set(appointment.testResults.map(result => result.testName));

      // Filter tests that are not yet added
      const availableTests = appointment.diagnosticTests.filter(test => !existingTestNames.has(test.testName));
      console.log(appointment.diagnosticTests)
      setSelectedAppointment(appointment);
      setSelectedDiagnosticTest(availableTests);
      setNewTestResult(prev => ({ ...prev, appointment: { id } }));
      setShowTestResultsModal(true);
    } else {
      console.error('No appointment found with id:', id);
    }
  };

  const handleTestResultChange = (e) => {
    const { name, value } = e.target;
    setNewTestResult(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddTestResult = async (testName) => {
    try {
      // Set the test name to the new test result
      const resultToAdd = { ...newTestResult, testName };
      
      await Axios.post('/testresult', resultToAdd);
      alert('Test result added successfully!');
      setShowTestResultsModal(false);
      setNewTestResult({
        testName: '',
        testReading: '',
        testCondition: '',
        appointment: {
          id: ''
        }
      });
      fetchAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error('Error adding test result:', error);
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
            <th>Diagnostic Center</th>
            <th>Test Results</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No appointments found</td>
            </tr>
          ) : (
            appointmentsList.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patient.name || 'N/A'}</td>
                <td>{appointment.patient.phoneNo || 'N/A'}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.diagnosticCenter ? appointment.diagnosticCenter.name : 'N/A'}</td>
                <td>
                  <DropdownButton id={`dropdown-${appointment.id}`} title="Test Results">
                    <Dropdown.Item as="button" onClick={() => handleTestResultsModal(appointment.id)}>Add Test Result</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <DropdownButton id={`dropdown-${appointment.id}`} title="Actions">
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
              <Button variant="primary" type="submit">
                {isEditing ? 'Update Appointment' : 'Add Appointment'}
              </Button>
            </Form>
          ) : (
            <div>
              <p><strong>Patient Name:</strong> {formData.patientName}</p>
              <p><strong>Mobile Number:</strong> {formData.mobileNumber}</p>
              <p><strong>Appointment Date:</strong> {formData.appointmentDate}</p>
              <p><strong>Diagnostic Center:</strong> {formData.diagnosticCenter.name}</p>
              <p><strong>Diagnostic Tests:</strong> {formData.diagnosticTests.join(', ')}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to add new test result */}
      <Modal show={showTestResultsModal} onHide={() => setShowTestResultsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="mt-4">Available Tests</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Test Reading</th>
                <th>Test Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedDiagnosticTest.map((test, index) => (
                <tr key={index}>
                  <td>{test.testName}</td>
                  <td>
                    <Form.Control 
                      type="text" 
                      name="testReading" 
                      value={newTestResult.testReading}
                      onChange={e => setNewTestResult(prev => ({ ...prev, testReading: e.target.value }))}
                      required 
                    />
                  </td>
                  <td>
                    <Form.Control 
                      type="text" 
                      name="testCondition" 
                      value={newTestResult.testCondition}
                      onChange={e => setNewTestResult(prev => ({ ...prev, testCondition: e.target.value }))}
                      required 
                    />
                  </td>
                  <td>
                    <Button 
                      variant="primary" 
                      onClick={() => handleAddTestResult(test.testName)}
                    >
                      Add Test Result
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTestResultsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointments;


