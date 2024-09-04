import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal, Form } from 'react-bootstrap';
import Axios from '../../../configurations/Axios';

const DiagnosticCenter = () => {
  const [centersList, setCentersList] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: '',
    contactNO: '',
    address: '',
    email: '',
    centerAdmin: {
      user: {
        id: 1 // or another appropriate default value
      }
    },
    diagnosticTests: [] // Array of diagnostic test objects
  });
  

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await Axios.get('/diagnosticcenter');
        const centersData = response.data.data;
        setCentersList(centersData);
      } catch (error) {
        console.error('Error fetching diagnostic centers:', error);
      }
    };

    fetchCenters();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit diagnostic center with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/diagnosticcenter/delete/${id}`);
      alert(response.data.message);
      const fetchCenters = async () => {
        try {
          const response = await Axios.get('/diagnosticcenter');
          setCentersList(response.data.data);
        } catch (error) {
          console.error('Error fetching diagnostic centers:', error);
        }
      };
      fetchCenters();
    } catch (error) {
      console.error('Error deleting diagnostic center:', error);
    }
  };

  const handleView = (id) => {
    const center = centersList.find(cen => cen.id === id);
    setSelectedCenter(center);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCenter(null);
  };

  const handleOpenAddModal = () => setShowAddModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTestChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTests = [...newCenter.diagnosticTests];
    updatedTests[index] = { ...updatedTests[index], [name]: value };
    setNewCenter(prevState => ({
      ...prevState,
      diagnosticTests: updatedTests
    }));
  };
  const handleAddTest = () => {
    setNewCenter(prevState => ({
      ...prevState,
      diagnosticTests: [...prevState.diagnosticTests, {
        testName: '',
        testPrice: '',
        normalValue: '',
        units: ''
      }]
    }));
  };

  const handleAddCenter = async (e) => {
    e.preventDefault();
    console.log('Adding new center:', newCenter); // Debugging line
    try {
      const response = await Axios.post('/diagnosticcenter', newCenter);
      console.log('Add response:', response.data); // Debugging line
      alert('Diagnostic center added successfully');
      const fetchCenters = async () => {
        try {
          const response = await Axios.get('/diagnosticcenter');
          setCentersList(response.data.data);
        } catch (error) {
          console.error('Error fetching diagnostic centers:', error);
        }
      };
      fetchCenters();
      setNewCenter({
        name: '',
        contactNO: '',
        address: '',
        email: '',
        diagnosticTests: []
      });
      setShowAddModal(false); // Close the modal on successful add
    } catch (error) {
      console.error('Error adding diagnostic center:', error);
      alert('Failed to add diagnostic center');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Diagnostic Centers List</h2>
      <Button variant="primary" onClick={handleOpenAddModal} className="mb-3">Add Diagnostic Center</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(centersList) && centersList.length > 0 ? (
            centersList.map(center => (
              <tr key={center.id}>
                <td>{center.name}</td>
                <td>{center.contactNO}</td>
                <td>{center.address}</td>
                <td>{center.email}</td>
                <td>
                  <DropdownButton id="dropdown-basic-button" title="Actions">
                    <Dropdown.Item as="button" onClick={() => handleView(center.id)}>View Details</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleEdit(center.id)}>Edit</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleDelete(center.id)}>Delete</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No diagnostic centers to display</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal to display diagnostic center details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Diagnostic Center Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCenter ? (
            <div className="center-details">
              <h4>Center Information</h4>
              <p><strong>Name:</strong> {selectedCenter.name}</p>
              <p><strong>Contact Number:</strong> {selectedCenter.contactNO}</p>
              <p><strong>Address:</strong> {selectedCenter.address}</p>
              <p><strong>Email:</strong> {selectedCenter.email}</p>
              <p><strong>Tests Offered:</strong> {selectedCenter.diagnosticTests ? selectedCenter.diagnosticTests.map(test => test.testName).join(', ') : 'None'}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to add a new diagnostic center */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Diagnostic Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCenter}>
            <Form.Group controlId="formCenterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter center name"
                name="name"
                value={newCenter.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCenterContactNO">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contactNO"
                value={newCenter.contactNO}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCenterAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={newCenter.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCenterEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newCenter.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCenterTests">
              <Form.Label>Diagnostic Tests (Comma Separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tests offered"
                name="diagnosticTests"
                value={newCenter.diagnosticTests.map(test => test.testName).join(', ')}
                onChange={(e) => setNewCenter(prevState => ({
                  ...prevState,
                  diagnosticTests: e.target.value.split(',').map(test => ({ testName: test.trim() }))
                }))}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Center
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DiagnosticCenter;

