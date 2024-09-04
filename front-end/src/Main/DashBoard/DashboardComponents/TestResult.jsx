import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Table, Dropdown } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';

const TestResult = () => {
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [showEditTestModal, setShowEditTestModal] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });
  const [newTestResult, setNewTestResult] = useState({
    testName: '',
    testReading: '',
    testCondition: '',
    appointment: { id: '' }
  });

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await Axios.get('/testresults');
        console.log(response )
        console.log(response.data.data )
        setTestResults(response.data.data || []);
      } catch (error) {
        console.error('Error fetching test results:', error);
      }
    };

    fetchTestResults();
  }, []);

  const handleShowAddTestModal = () => setShowAddTestModal(true);
  const handleCloseAddTestModal = () => setShowAddTestModal(false);

  const handleShowEditTestModal = () => setShowEditTestModal(true);
  const handleCloseEditTestModal = () => setShowEditTestModal(false);

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
        appointment: { id: '' }
      });
      // Fetch updated test results
      const updatedResponse = await Axios.get('/testresults');
      setTestResults(updatedResponse.data.data || []);
    } catch (error) {
      console.error('Error adding test result:', error);
      setShowAlert({ show: true, message: 'Error adding test result.', variant: 'danger' });
    }
  };

  const handleUpdateTestResult = async () => {
    try {
      const response = await Axios.put(`/testresult/${selectedTest.id}`, selectedTest);
      const updatedTestResponse = response.data;
      const message = updatedTestResponse.message;

      setShowAlert({ show: true, message: message, variant: 'success' });
      handleCloseEditTestModal();
      setSelectedTest(null);
      // Fetch updated test results
      const updatedResponse = await Axios.get('/testresults');
      setTestResults(updatedResponse.data.data || []);
    } catch (error) {
      console.error('Error updating test result:', error);
      setShowAlert({ show: true, message: 'Error updating test result.', variant: 'danger' });
    }
  };

  const handleDeleteTest = async (id) => {
    try {
      await Axios.delete(`/testresult/${id}`);
      setShowAlert({ show: true, message: 'Test result deleted successfully.', variant: 'success' });
      // Fetch updated test results
      const updatedResponse = await Axios.get('/testresults');
      setTestResults(updatedResponse.data.data || []);
    } catch (error) {
      console.error('Error deleting test result:', error);
      setShowAlert({ show: true, message: 'Error deleting test result.', variant: 'danger' });
    }
  };

  const handleUpdateTest = (id) => {
    const test = testResults.find(test => test.id === id);
    setSelectedTest(test);
    handleShowEditTestModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedTest) {
      setSelectedTest(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setNewTestResult(prevState => ({
        ...prevState,
        [name]: value,
        appointment: { id: prevState.appointment.id } // Maintain appointment id
      }));
    }
  };

  const handleAppointmentChange = (e) => {
    const { value } = e.target;
    if (selectedTest) {
      setSelectedTest(prevState => ({
        ...prevState,
        appointment: { id: value }
      }));
    } else {
      setNewTestResult(prevState => ({
        ...prevState,
        appointment: { id: value }
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
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
          {testResults.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No test results available</td>
            </tr>
          ) : (
            testResults.map(test => (
              <tr key={test.id}>
                <td>{test.testName}</td>
                <td>{test.testReading.toFixed(2)}</td>
                <td>{test.testCondition}</td>
                <td>{test.appointment !=null ? test.appointment.id:""}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle  className='bg-blue-700'>
                      Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleUpdateTest(test.id)} className='fw-bold text-warning'>Update</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteTest(test.id)}  className='fw-bold text-danger'>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
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
                type="number"
                step="0.01"
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
                value={newTestResult.appointment.id}
                onChange={handleAppointmentChange}
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

      {/* Edit Test Result Modal */}
      {selectedTest && (
        <Modal show={showEditTestModal} onHide={handleCloseEditTestModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Test Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEditTestName">
                <Form.Label>Test Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter test name"
                  name="testName"
                  value={selectedTest.testName}
                  onChange={(e) => setSelectedTest({ ...selectedTest, testName: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEditTestReading">
                <Form.Label>Test Reading</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter test reading"
                  name="testReading"
                  value={selectedTest.testReading}
                  onChange={(e) => setSelectedTest({ ...selectedTest, testReading: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEditTestCondition">
                <Form.Label>Test Condition</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter test condition"
                  name="testCondition"
                  value={selectedTest.testCondition}
                  onChange={(e) => setSelectedTest({ ...selectedTest, testCondition: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEditAppointmentId">
                <Form.Label>Appointment ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter appointment ID"
                  name="appointmentId"
                  value={selectedTest.appointment.id}
                  onChange={(e) => setSelectedTest({ ...selectedTest, appointment: { id: e.target.value } })}
                  required
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateTestResult} className="mt-3">
                Update Test Result
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditTestModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TestResult;
