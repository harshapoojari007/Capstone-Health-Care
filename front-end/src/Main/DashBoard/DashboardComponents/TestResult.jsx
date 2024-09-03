import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Table, Dropdown } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';

const TestResult = () => {
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });
  const [newTestResult, setNewTestResult] = useState({
    testName: '',
    testReading: '',
    testCondition: '',
    appointmentId: ''
  });

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await Axios.get('/testresults');
        setTestResults(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching test results:', error);
      }
    };

    fetchTestResults();
  }, []);

  const handleShowAddTestModal = () => setShowAddTestModal(true);
  const handleCloseAddTestModal = () => setShowAddTestModal(false);

  const handleAddTestResult = async () => {
    try {
      const response = await Axios.post('/testresult', newTestResult);
      const addedTestResponse = response.data;
      const message = addedTestResponse.message;

      setShowAlert({ show: true, message: message, variant: 'success' });
      handleCloseAddTestModal();
      setNewTestResult({
        testName: '',
        testReading: '',
        testCondition: '',
        appointmentId: ''
      });
      // Fetch updated test results
      const updatedResponse = await Axios.get('/testresults');
      setTestResults(updatedResponse.data);
    } catch (error) {
      console.error('Error adding test result:', error);
      setShowAlert({ show: true, message: 'Error adding test result.', variant: 'danger' });
    }
  };

  const handleDeleteTest = async (id) => {
    try {
      await Axios.delete(`/testresult/${id}`);
      setShowAlert({ show: true, message: 'Test result deleted successfully.', variant: 'success' });
      // Fetch updated test results
      const updatedResponse = await Axios.get('/testresults');
      setTestResults(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting test result:', error);
      setShowAlert({ show: true, message: 'Error deleting test result.', variant: 'danger' });
    }
  };

  const handleUpdateTest = (id) => {
    const test = testResults.find(test => test.id === id);
    setSelectedTest(test);
    // Show update modal or handle update here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTestResult(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Test Results</h2>

      {/* Alert for Success/Failure */}
      {showAlert.show && <Alert variant={showAlert.variant}>{showAlert.message}</Alert>}

      {/* Add Test Result Button */}
      <div className="text-right mb-3">
        <Button variant="success" onClick={handleShowAddTestModal}>
          Add Test Result
        </Button>
      </div>

      {/* Test Results Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Test Reading</th>
            <th>Test Condition</th>
            <th>Appointment ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {typeof testResults === 'string' ? (
                <p>{testResults}</p>
            ) :
          testResults.map(test => (
            <tr key={test.id}>
              <td>{test.testName}</td>
              <td>{test.testReading}</td>
              <td>{test.testCondition}</td>
              <td>{test.appointmentId}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">
                    Actions
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleUpdateTest(test.id)}>Update</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteTest(test.id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Test Result Modal */}
      <Modal show={showAddTestModal} onHide={handleCloseAddTestModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTestName">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter test name"
                name="testName"
                value={newTestResult.testName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTestReading">
              <Form.Label>Test Reading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter test reading"
                name="testReading"
                value={newTestResult.testReading}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTestCondition">
              <Form.Label>Test Condition</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter test condition"
                name="testCondition"
                value={newTestResult.testCondition}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAppointmentId">
              <Form.Label>Appointment ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter appointment ID"
                name="appointmentId"
                value={newTestResult.appointmentId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddTestResult} className="mt-3">
              Add Test Result
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddTestModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestResult;
