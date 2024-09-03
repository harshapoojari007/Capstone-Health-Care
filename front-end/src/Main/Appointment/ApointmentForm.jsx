import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../configurations/Axios';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    mobileNumber: '',
    gender: '',
    aadharNumber: '',
    appointmentDate: '',
    diagnosticTests: [],
    diagnosticCenter: ''
  });
  
  const [diagnosticTests, setDiagnosticTests] = useState([]);
  const [centersList, setCentersList] = useState([]);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    // Fetch diagnostic tests for the checkbox list
    const fetchDiagnosticTests = async () => {
      try {
        const response = await Axios.get('/diagnostictests');
        setDiagnosticTests(response.data.data); // Assuming response.data.data contains the list of tests
      } catch (error) {
        console.error('Error fetching diagnostic tests:', error);
      }
    };

    fetchDiagnosticTests();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        diagnosticTests: checked 
          ? [...prevState.diagnosticTests, value]
          : prevState.diagnosticTests.filter(test => test !== value)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFetchCenters = async () => {
    try {
      const response = await Axios.post('/diagnosticcenter/tests', { tests: formData.diagnosticTests });
      setCentersList(response.data.data); // Assuming response.data.data contains the list of centers
    } catch (error) {
      console.error('Error fetching centers:', error);
      setShowAlert({ show: true, message: 'Error fetching diagnostic centers.', variant: 'danger' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/appointments', formData);
      if (response.status === 200) {
        setShowAlert({ show: true, message: 'Appointment booked successfully!', variant: 'success' });
        setFormData({
          patientName: '',
          age: '',
          mobileNumber: '',
          gender: '',
          aadharNumber: '',
          appointmentDate: '',
          diagnosticTests: [],
          diagnosticCenter: ''
        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setShowAlert({ show: true, message: 'Error booking appointment.', variant: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <Form className="form-container border p-4 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Appointment Form</h2>
        {showAlert.show && <Alert variant={showAlert.variant}>{showAlert.message}</Alert>}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formPatientName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter mobile number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formAadharNumber">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter aadhar number"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAppointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDiagnosticTests">
              <Form.Label>Diagnostic Tests</Form.Label>
              {diagnosticTests.map(test => (
                <Form.Check
                  key={test.id}
                  type="checkbox"
                  id={`test-${test.id}`}
                  label={test.testName}
                  value={test.testName}
                  checked={formData.diagnosticTests.includes(test.testName)}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Button variant="info" onClick={handleFetchCenters}>
              Check Available Centers
            </Button>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDiagnosticCenter">
              <Form.Label>Diagnostic Center</Form.Label>
              <Form.Control
                as="select"
                name="diagnosticCenter"
                value={formData.diagnosticCenter}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Diagnostic Center</option>
                {centersList.map(center => (
                  <option key={center.id} value={center.id}>
                    {center.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="w-100 mt-3">
          Book Appointment
        </Button>
      </Form>
    </div>
  );
};

export default AppointmentForm;
