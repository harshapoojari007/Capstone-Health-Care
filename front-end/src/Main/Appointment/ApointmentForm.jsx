import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Row, Col, Modal } from 'react-bootstrap';
import Axios from '../../configurations/Axios';
import { useUser } from '../../UserContext';

const AppointmentForm = () => {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);
  const todayFormatted = today.toISOString().split('T')[0];
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  const { id: userId } = useUser();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    mobileNumber: '',
    gender: '',
    aadharNumber: '',
    appointmentDate: '',
    diagnosticTests: [], // Store test IDs
    diagnosticCenter: ''
  });
  const [centersWithTests, setCentersWithTests] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedCenterId, setSelectedCenterId] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]); // Store selected test IDs from modal
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [isShowFields, setIsShowFields] = useState(false);
  const [patientId, setPatientId] = useState(null); // State to store patient ID
  const [showModal, setShowModal] = useState(false);
  const [isAppointmentDateSelected,setIsAppointmentDateSelected]=useState(false)

  useEffect(() => {
    // Fetch diagnostic centers when the component mounts
    const fetchCentersWithTests = async () => {
      try {
        const response = await Axios.get('/diagnosticcenter');
        setCentersWithTests(response.data.data);
      } catch (error) {
        console.error('Error fetching diagnostic centers:', error);
      }
    };

    fetchCentersWithTests();
  }, []);

  useEffect(() => {
    if (formData.appointmentDate) {
      fetchAvailableCenters(formData.appointmentDate);
    }
  }, [formData.appointmentDate]);

  const fetchAvailableCenters = async (date) => {
    try {
      const response = await Axios.get(`/booking/date/${date}`);
      const availableCenterIds = response.data;
      const filtered = centersWithTests.filter(center => availableCenterIds.includes(center.id));
      setFilteredCenters(filtered);
    } catch (error) {
      console.error('Error fetching available centers:', error);
      setShowAlert({ show: true, message: 'Error fetching available centers.', variant: 'danger' });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSelectedTests(prevTests => 
        checked ? [...prevTests, value] : prevTests.filter(testId => testId !== value)
      );
    } else if (type === 'radio') {
      setSelectedCenterId(value);
      setSelectedTests([]);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      if (name === 'appointmentDate') {
        setIsAppointmentDateSelected(value !== '');
      }
    }
  };

  const handleFetchPatient = async () => {
    try {
      const response = await Axios.get(`/patient/mobile/${formData.mobileNumber}`);
      const patientData = response.data.data;
      if(patientData && typeof patientData !== 'string' && patientData.user.id !== userId) {
        setShowAlert({ show: true, message: 'Patient already exists with a different user. Please provide a valid mobile number.', variant: 'warning' });
      } else if (patientData && typeof patientData !== 'string') {
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
        setFormData(prevState => ({
          ...prevState,
          patientName: '',
          age: '',
          gender: '',
          aadharNumber: ''
        }));
        setIsNewPatient(true);
        setIsShowFields(true);
        setShowAlert({ show: true, message: 'New patient! Please enter details.', variant: 'warning' });
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setShowAlert({ show: true, message: 'Error fetching patient details.', variant: 'danger' });
    }
  };

  const handleCreatePatient = async () => {
    try {
      const newPatientData = {
        name: formData.patientName,
        age: formData.age,
        gender: formData.gender,
        aadharNumber: formData.aadharNumber,
        phoneNo: formData.mobileNumber,
        user: {
          id: userId
        }
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
      if (!formData.diagnosticCenter) {
        setShowAlert({ show: true, message: 'Please select a diagnostic center.', variant: 'danger' });
        return;
      }

      const appointmentData = {
        appointmentDate: formData.appointmentDate,
        approvalStatus: "PENDING",
        diagnosticCenter: {
          id: parseInt(formData.diagnosticCenter, 10) // Use the selected center ID
        },
        patient: {
          id: patientId // Use the patient ID retrieved from the backend
        },
        diagnosticTests: formData.diagnosticTests.map(testId => ({
          id: testId // Send test IDs
        }))
      };
      const response = await Axios.post('/appointment', appointmentData);
      //await Axios.put(`/booking/slot/${appointmentData.diagnosticCenter}/date/${appointmentData.appointmentDate}`)
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
        setCentersWithTests([]);
        setFilteredCenters([]);
        setSelectedCenterId(null); // Clear selected center
        setSelectedTests([]); // Clear selected tests
        setIsNewPatient(false);
        setPatientId(null); // Clear patient ID
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setShowAlert({ show: true, message: 'Error booking appointment.', variant: 'danger' });
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseNoSelectModal = () => {
    setShowModal(false);
    setSelectedTests([]);
    setSelectedCenterId(null);
  };

  const handleSelectTests = () => {
    setFormData(prevState => ({
      ...prevState,
      diagnosticCenter: selectedCenterId,
      diagnosticTests: selectedTests
    }));
    handleCloseModal();
    setSelectedTests([]);
    setSelectedCenterId(null);
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
                min={todayFormatted}
                max={maxDateFormatted}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Button disabled={!isAppointmentDateSelected} className='bg-success border-0' onClick={handleOpenModal}>
              Select Tests
            </Button>
          </Col>
        </Row>

        {/* Modal for selecting tests */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Tests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {filteredCenters.map(center => (
              <div key={center.id} className="mb-3">
                <h5>{center.name}</h5>
                <Form.Check
                  type="radio"
                  id={`center-${center.id}`}
                  label={`Select ${center.name}`}
                  value={center.id}
                  checked={selectedCenterId === center.id}
                  onChange={() => setSelectedCenterId(center.id)}
                />
                {selectedCenterId === center.id && center.diagnosticTests.map(test => (
                  <Form.Check
                    key={test.id}
                    type="checkbox"
                    id={`test-${test.id}`}
                    label={`${test.testName} - ${test.testPrice}`}
                    value={test.id}
                    checked={selectedTests.includes(test.id)}
                    onChange={handleChange}
                  />
                ))}
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseNoSelectModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSelectTests}
            >
              Select Tests
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Diagnostic Centers (Already Selected Center) */}
        {formData.diagnosticCenter && (
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDiagnosticCenter">
                <Form.Label>Diagnostic Center</Form.Label>
                <Form.Control
                  type="text"
                  value={centersWithTests.find(center => center.id === parseInt(formData.diagnosticCenter, 10))?.name || 'No Center Selected'}
                  readOnly
                />
              </Form.Group>
              <div>
                {formData.diagnosticTests.map(testId => {
                  var testDetails = centersWithTests
                    .flatMap(center => center.diagnosticTests);
                    testDetails.map(test=>{console.log(test.id)})
                    testDetails=testDetails.filter(test=>test.id==testId)
                    console.log(testDetails)
                  return (
                    <div key={testId}>
                      {testDetails.length > 0 ? (
                        <ul>
                          {testDetails.map(test => (
                            <li key={test.id}>
                             <p>Test Name: {test.testName}</p>
                              <p>Test Price: {test.testPrice} Rs</p>
                              
                              
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No details found for Test ID: {testId}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        )}

        <Button type="submit" variant="primary" className="w-100 mt-3">
          Book Appointment
        </Button>
      </Form>
    </div>
  );
};

export default AppointmentForm;
