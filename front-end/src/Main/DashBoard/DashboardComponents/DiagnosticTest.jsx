import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Table, Button, Modal, Form } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';
const DiagnosticTest = () => {
  const [testsList, setTestsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTest, setNewTest] = useState({
    testName: '',
    testPrice: '',
    normalValue: '',
    units: '',
    diagnosticCenters: []
  });
  useEffect(() => {
    const fetchDiagnosticTests = async () => {
      try {
        const response = await Axios.get('/diagnostictests');
        const testData=response.data;
        setTestsList(testData.data)
            } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchDiagnosticTests();
  }, []);
  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Edit diagnostic test with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    // Handle delete logic here
    try {
      const response=await Axios.post(`/diagnostictest/${id}`);
      const deletedTestResponse=response.data;
      const message=deletedTestResponse.message
      alert(message)
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const handleAddTest = async() => {
    try {
      const response = await Axios.post('/diagnostictest', newTest);
      const addedTestResponse = response.data;
      const addedTest=addedTestResponse.data;
      const message=addedTestResponse.message;
      setTestsList([...testsList, addedTest]);
      alert(message)
      setShowModal(false);
      setNewTest({
        testName: '',
        testPrice: '',
        normalValue: '',
        units: '',
        diagnosticCenters: []
      });
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTest(prev => ({ ...prev, [name]: value }));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-center">Diagnostic Tests List</h2>
        <Button 
          variant="primary" 
          onClick={handleShowModal}
        >
          Add Test
        </Button>
      </div>

      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Price</th>
            <th>Normal Value</th>
            <th>Units</th>
            <th>Diagnostic Centers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testsList.map(test => (
            <tr key={test.id}>
              <td>{test.testName}</td>
              <td>${test.testPrice.toFixed(2)}</td>
              <td>{test.normalValue}</td>
              <td>{test.units}</td>
              <td>{test.diagnosticCenters.join(', ')}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item as="button" onClick={() => handleEdit(test.id)}>Edit</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => handleDelete(test.id)}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      {/* Add Test Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Diagnostic Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTestName">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter test name"
                name="testName"
                value={newTest.testName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTestPrice">
              <Form.Label>Test Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter test price"
                name="testPrice"
                value={newTest.testPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNormalValue">
              <Form.Label>Normal Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter normal value"
                name="normalValue"
                value={newTest.normalValue}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUnits">
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter units"
                name="units"
                value={newTest.units}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiagnosticCenters">
              <Form.Label>Diagnostic Centers (comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter diagnostic centers"
                value={newTest.diagnosticCenters.join(', ')}
                onChange={(e) => setNewTest(prev => ({ ...prev, diagnosticCenters: e.target.value.split(',').map(center => center.trim()) }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleAddTest}>Add Test</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiagnosticTest;
