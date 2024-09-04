import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Modal, Form } from 'react-bootstrap'; // Ensure react-bootstrap is installed
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
    diagnosticCenters: []
  });
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    const fetchDiagnosticTests = async () => {
      try {
        const response = await Axios.get('/diagnostictests');
        const testData = response.data.data;
        setTestsList(testData.data || []);
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
      diagnosticCenters: test.diagnosticCenters.map(center => center.name).join(', ')
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/diagnostictest/${id}`);
      const deletedTestResponse = response.data;
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
      const addedTestResponse = response.data;
      const addedTest = addedTestResponse.data;
      const message = addedTestResponse.message;
      setTestsList([...testsList, addedTest]);
      alert(message);
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

  const handleUpdateTest = async () => {
    try {
      const response = await Axios.put(`/diagnostictest/${currentTest.id}`, newTest);
      const updatedTestResponse = response.data;
      const updatedTest = updatedTestResponse.data;
      const message = updatedTestResponse.message;
      setTestsList(testsList.map(test => (test.id === updatedTest.id ? updatedTest : test)));
      alert(message);
      setShowEditModal(false);
      setNewTest({
        testName: '',
        testPrice: '',
        normalValue: '',
        units: '',
        diagnosticCenters: []
      });
    } catch (error) {
      console.error('Error updating test:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTest(prev => ({ ...prev, [name]: value }));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnostic Centers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{test.testName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${test.testPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{test.normalValue}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{test.units}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{test.diagnosticCenters.map(center => center.name).join(', ')}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <DropdownButton id="dropdown-basic-button" title="Actions" className="text-gray-600">
                      <Dropdown.Item as="button" onClick={() => handleEdit(test.id)} className="text-yellow-600">Edit</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => handleDelete(test.id)} className="text-red-600">Delete</Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
          <Button variant="secondary" onClick={handleCloseEditModal} className="bg-gray-500 hover:bg-gray-600 text-white">Close</Button>
          <Button variant="primary" onClick={handleUpdateTest} className="bg-blue-500 hover:bg-blue-600 text-white">Update Test</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiagnosticTest;
