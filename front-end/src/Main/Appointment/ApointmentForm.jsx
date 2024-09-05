import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
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
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [isShowFields, setIsShowFields] = useState(false);
  const [patientId, setPatientId] = useState(null); // State to store patient ID

  useEffect(() => {
    // Fetch diagnostic tests for the checkbox list
    const fetchDiagnosticTests = async () => {
      try {
        const response = await Axios.get('/diagnostictests');
        setDiagnosticTests(response.data.data);
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
          ? [...prevState.diagnosticTests, parseInt(value, 10)] 
          : prevState.diagnosticTests.filter(id => id !== parseInt(value, 10))
      }));
    } else if (type === 'radio') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFetchPatient = async () => {
    try {
      const response = await Axios.get(`/patient/mobile/${formData.mobileNumber}`);
      const patientData = response.data.data;
      if (patientData && typeof patientData !== 'string') {
        setFormData({
          ...formData,
          patientName: patientData.name || '',
          age: patientData.age || '',
          gender: patientData.gender || '',
          aadharNumber: patientData.aadharNumber || ''
        });
        setPatientId(patientData.id); // Store patient ID
        setIsNewPatient(false);
        setIsShowFields(true);
        setShowAlert({ show: true, message: 'Patient found! Please complete the form.', variant: 'info' });
      } else {
        // Reset form data for new patient
        setFormData(prevState => ({
          ...prevState,
          patientName: '',
          age: '',
          gender: '',
          aadharNumber: ''
        }));
        setPatientId(null); // Clear patient ID
        setIsNewPatient(true);
        setShowAlert({ show: true, message: 'New patient! Please enter details.', variant: 'warning' });
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setShowAlert({ show: true, message: 'Error fetching patient details.', variant: 'danger' });
    }
  };

  const handleFetchCenters = async () => {
    try {
      // Send the list of selected test IDs
      const response = await Axios.post('/diagnosticcenter/tests',formData.diagnosticTests);
      if (typeof response.data.data === 'string') {
        setCentersList([]);
        setShowAlert({ show: true, message: 'No data centers available for the selected tests.', variant: 'warning' });
      } else {
        setCentersList(response.data.data); // Assuming response.data.data contains the list of centers
        setShowAlert({ show: true, message: 'Data centers available!', variant: 'info' });
      }
    } catch (error) {
      console.error('Error fetching centers:', error);
      setShowAlert({ show: true, message: 'Error fetching diagnostic centers.', variant: 'danger' });
    }
  };
  const handleCreatePatient = async () => {
    try {
      const newPatientData = {
        name: formData.patientName,
        age: formData.age,
        gender: formData.gender,
        aadharNumber: formData.aadharNumber,
        phoneNo: formData.mobileNumber
      };
      const response = await Axios.post('/patient', newPatientData);
      const patientData = response.data.data;
      if (patientData) {
        setPatientId(patientData.id); // Store patient ID
        setShowAlert({ show: true, message: 'Patient created successfully!', variant: 'success' });
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      setShowAlert({ show: true, message: 'Error creating patient.', variant: 'danger' });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewPatient) {
        await handleCreatePatient(); // Create patient first if new
      }
    if (!patientId) {
        setShowAlert({ show: true, message: 'Patient ID is missing. Please find or enter patient details.', variant: 'danger' });
        return;
      }
      const appointmentData = {
        appointmentDate: formData.appointmentDate,
        approvalStatus:"PENDING",
        diagnosticCenter: {
          id: parseInt(formData.diagnosticCenter, 10)
        },
        patient: {
          id: patientId // Use the patient ID retrieved from the backend
        },
        diagnosticTests: formData.diagnosticTests.map(id => ({ id }))
      };
      const response = await Axios.post('/appointment', appointmentData);
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
        setCentersList([]);
        setIsNewPatient(false);
        setPatientId(null); // Clear patient ID
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setShowAlert({ show: true, message: 'Error booking appointment.', variant: 'danger' });
    }
  };

  return (
    <div className="container flex justify-center mt-20 text-sm">
      <Form className="form-container w-2/3 border p-4 rounded shadow" onSubmit={handleSubmit}>
        <h3 className="text-center mb-2">Appointment Form</h3>
        {showAlert.show && <Alert className='custom-alert' variant={showAlert.variant}>{showAlert.message}</Alert>}
        
        {/* Mobile Number Input and Find Button */}
        <Row className="flex mb-3">
          <Col md={4}>
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
          <Col md={4}>
            <Button variant="primary" onClick={handleFetchPatient} className="w-100 mt-[28px]">
              Find
            </Button>
          </Col>
        </Row>

        {/* Conditional Rendering Based on Patient Existence */}
        {isShowFields &&(
          <>
            <Row className="mb-3">
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
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
            </Row>
          </>
        )}
        
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formAppointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
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
                  value={test.id}
                  checked={formData.diagnosticTests.includes(test.id)}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Button  className='bg-success border-0' onClick={handleFetchCenters}>
              Check Available Centers
            </Button>
          </Col>
        </Row>

        {/* Diagnostic Centers */}
        {centersList.length > 0 ? (
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDiagnosticCenter">
                <Form.Label>Diagnostic Center</Form.Label>
                {centersList.map(center => (
                  <Form.Check
                    key={center.id}
                    type="radio"
                    name="diagnosticCenter"
                    id={`center-${center.id}`}
                    label={center.name}
                    value={center.id}
                    checked={formData.diagnosticCenter === center.id.toString()}
                    onChange={handleChange}
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          showAlert.show && <Alert variant="warning">No data centers available for the selected tests.</Alert>
        )}

        <Button type="submit" variant="primary" className="w-100 mt-3">
          Book Appointment
        </Button>
      </Form>
    </div>
  );
};

export default AppointmentForm;
