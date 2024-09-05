import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal, Form } from 'react-bootstrap';
import Axios from '../../../configurations/Axios';

const DiagnosticCenter = () => {
  const [centersList, setCentersList] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: '',
    contactNO: '',
    address: '',
    email: '',
    centerAdmin: {
      name: '',
      phoneNo: '',
      address: '',
      user: {
        id: 1 // or another appropriate default value
      }
    },
    diagnosticTests: [] // Array of diagnostic test objects
  });

  const [editCenter, setEditCenter] = useState({
    id: null,
    name: '',
    contactNO: '',
    address: '',
    email: '',
    centerAdmin: {
      name: '',
      phoneNo: '',
      address: ''
    }
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

  const handleEdit = (center) => {
    setEditCenter({
      id: center.id,
      name: center.name,
      contactNO: center.contactNO,
      address: center.address,
      email: center.email,
      centerAdmin: {
        name: center.centerAdmin.name || '',
        phoneNo: center.centerAdmin.phoneNo || '',
        address: center.centerAdmin.address || ''
      }
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`/diagnosticcenter/${id}`);
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

  const handleCenterAdminChange = (e) => {
    const { name, value } = e.target;
    setNewCenter(prevState => ({
      ...prevState,
      centerAdmin: {
        ...prevState.centerAdmin,
        [name]: value
      }
    }));
  };

  const handleAddCenter = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/diagnosticcenter', newCenter);
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
        centerAdmin: {
          name: '',
          phoneNo: '',
          address: '',
          user: {
            id: 1
          }
        },
        diagnosticTests: []
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding diagnostic center:', error);
      alert('Failed to add diagnostic center');
    }
  };

  const handleEditCenter = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(`/diagnosticcenter/${editCenter.id}`, editCenter);
      alert('Diagnostic center updated successfully');
      const fetchCenters = async () => {
        try {
          const response = await Axios.get('/diagnosticcenter');
          setCentersList(response.data.data);
        } catch (error) {
          console.error('Error fetching diagnostic centers:', error);
        }
      };
      fetchCenters();
      setShowEditModal(false); 
    } catch (error) {
      console.error('Error updating diagnostic center:', error);
      alert('Failed to update diagnostic center');
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
                <td>{center.name || 'null'}</td>
                <td>{center.contactNO || 'null'}</td>
                <td>{center.address || 'null'}</td>
                <td>{center.email || 'null'}</td>
                <td>
                  <DropdownButton id="dropdown-basic-button" title="Actions">
                    <Dropdown.Item as="button" onClick={() => handleView(center.id)}>View Details</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleEdit(center)}>Edit</Dropdown.Item>
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
              <p><strong>Name:</strong> {selectedCenter.name || 'null'}</p>
              <p><strong>Contact Number:</strong> {selectedCenter.contactNO || 'null'}</p>
              <p><strong>Address:</strong> {selectedCenter.address || 'null'}</p>
              <p><strong>Email:</strong> {selectedCenter.email || 'null'}</p>
              <p><strong>Center Admin Name:</strong> {selectedCenter.centerAdmin.name || 'null'}</p>
              <p><strong>Center Admin Phone Number:</strong> {selectedCenter.centerAdmin.phoneNo || 'null'}</p>
              <p><strong>Center Admin Address:</strong> {selectedCenter.centerAdmin.address || 'null'}</p>
              <p><strong>Diagnostic Tests:</strong> {selectedCenter.diagnosticTests.length > 0 ? selectedCenter.diagnosticTests.map(test => `${test.testName} (${test.testPrice})`).join(', ') : 'null'}</p>
              <p><strong>Appointments:</strong> {selectedCenter.appointments.length > 0 ? selectedCenter.appointments.join(', ') : 'null'}</p>
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
            <Form.Group controlId="formCenterAdminName">
              <Form.Label>Center Admin Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin name"
                name="name"
                value={newCenter.centerAdmin.name}
                onChange={handleCenterAdminChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCenterAdminPhoneNo">
              <Form.Label>Center Admin Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin phone number"
                name="phoneNo"
                value={newCenter.centerAdmin.phoneNo}
                onChange={handleCenterAdminChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCenterAdminAddress">
              <Form.Label>Center Admin Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin address"
                name="address"
                value={newCenter.centerAdmin.address}
                onChange={handleCenterAdminChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Center
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal to edit a diagnostic center */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Diagnostic Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCenter}>
            <Form.Group controlId="formEditCenterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter center name"
                name="name"
                value={editCenter.name}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditCenterContactNO">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contactNO"
                value={editCenter.contactNO}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditCenterAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={editCenter.address}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditCenterEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editCenter.email}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditCenterAdminName">
              <Form.Label>Center Admin Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin name"
                name="name"
                value={editCenter.centerAdmin.name}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  centerAdmin: {
                    ...prevState.centerAdmin,
                    [e.target.name]: e.target.value
                  }
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditCenterAdminPhoneNo">
              <Form.Label>Center Admin Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin phone number"
                name="phoneNo"
                value={editCenter.centerAdmin.phoneNo}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  centerAdmin: {
                    ...prevState.centerAdmin,
                    [e.target.name]: e.target.value
                  }
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEditCenterAdminAddress">
              <Form.Label>Center Admin Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin address"
                name="address"
                value={editCenter.centerAdmin.address}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  centerAdmin: {
                    ...prevState.centerAdmin,
                    [e.target.name]: e.target.value
                  }
                }))}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Center
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DiagnosticCenter;
