import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Modal, Form, Table } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import Axios from '../../../configurations/Axios';

const DiagnosticTest = () => {
  const [testsList, setTestsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTest, setNewTest] = useState({
    testName: '',
    testPrice: '',
    normalValue: '',
    units: '',
    diagnosticCenter: {
      id: ''
    }
  });
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    const fetchDiagnosticTests = async () => {
      try {
        const response = await Axios.get('/diagnostictest');
        const testData = response.data.data;
        setTestsList(testData || []);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchDiagnosticTests();
  }, []);

  const handleEdit = (id) => {
    const test = testsList.find(t => t.id === id);
    setCurrentTest(test);
    setNewTest({
      testName: test.testName,
      testPrice: test.testPrice,
      normalValue: test.normalValue,
      units: test.units,
      diagnosticCenter: {
        id: test.diagnosticCenter.id
      }
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/diagnostictest/${id}`);
      const deletedTestResponse = response.data.data;
      const message = deletedTestResponse.message;
      alert(message);
      setTestsList(testsList.filter(test => test.id !== id));
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const handleAddTest = async () => {
    try {
      const response = await Axios.post('/diagnostictest', newTest);
       console.log(response)
      const addedTestResponse = response.data;
      const addedTest = addedTestResponse.data;
      const message = addedTest.message;
      setTestsList([...testsList, addedTest]);
      alert(message);
      setShowModal(false);
      setNewTest({
        testName: '',
        testPrice: '',
        normalValue: '',
        units: '',
        diagnosticCenter: {
          id: ''
        }
      });
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const handleUpdateTest = async () => {
    try {
      const response = await Axios.put(`/diagnostictest/${currentTest.id}`, newTest);
      const updatedTestResponse = response.data;
      const updatedTest = updatedTestResponse.data;
      const message = updatedTest.message;
      setTestsList(testsList.map(test => (test.id === updatedTest.id ? updatedTest : test)));
      alert(message);
      setShowEditModal(false);
      setNewTest({
        testName: '',
        testPrice: '',
        normalValue: '',
        units: '',
        diagnosticCenter: {
          id: ''
        }
      });
    } catch (error) {
      console.error('Error updating test:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'diagnosticCenter.id') {
      setNewTest(prev => ({
        ...prev,
        diagnosticCenter: {
          ...prev.diagnosticCenter,
          id: value
        }
      }));
    } else {
      setNewTest(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseEditModal = () =>{
    setShowEditModal(false);
    setNewTest({
      testName: '',
      testPrice: '',
      normalValue: '',
      units: '',
      diagnosticCenter: {
        id: ''
      }
    });
  }

  return (
    <div className="container mx-auto my-4 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Diagnostic Tests List</h2>
        <Button 
          variant="primary" 
          onClick={handleShowModal}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Test
        </Button>
      </div>

      <div>
        <Table striped bordered hover>
          <thead className="bg-gray-100">
            <tr>
              <th>Test Name</th>
              <th>Price</th>
              <th>Normal Value</th>
              <th>Units</th>
              <th>Diagnostic Centers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testsList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No tests available</td>
              </tr>
            ) : (
              testsList.map(test => (
                <tr key={test.id}>
                  <td>{test.testName}</td>
                  <td>{test.testPrice.toFixed(2)} Rupees</td>
                  <td>{test.normalValue}</td>
                  <td>{test.units}</td>
                  <td>{test.diagnosticCenter.id}</td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Actions">
                      <Dropdown.Item as="button" onClick={() => handleEdit(test.id)} className="text-yellow-600">Edit</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => handleDelete(test.id)} className="text-red-600">Delete</Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

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
              <Form.Label>Diagnostic Center</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter diagnostic center Id"
                name="diagnosticCenter.id"
                value={newTest.diagnosticCenter.id}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-600 text-white">Close</Button>
          <Button variant="primary" onClick={handleAddTest} className="bg-blue-500 hover:bg-blue-600 text-white">Add Test</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Test Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Diagnostic Test</Modal.Title>
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
              <Form.Label>Diagnostic Center</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter diagnostic center Id"
                name="diagnosticCenter.id"
                value={newTest.diagnosticCenter.id}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal} className="bg-gray-500 hover:bg-gray-600 text-white">Close</Button>
          <Button variant="primary" onClick={handleUpdateTest} className="bg-blue-500 hover:bg-blue-600 text-white">Update Test</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiagnosticTest;
