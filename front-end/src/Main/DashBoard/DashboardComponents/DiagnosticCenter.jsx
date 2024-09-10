import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button, Table, Modal, Form } from 'react-bootstrap';
import Axios from '../../../configurations/Axios';
import { useUser } from '../../../UserContext';

const DiagnosticCenter = () => {
  const {id:userId,role,centerAdd,center_id}=useUser()
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);
  const todayFormatted = today.toISOString().split('T')[0];
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  const [centersList, setCentersList] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showSlotsModal, setShowSlotsModal] = useState(false); // New state
  const [slots, setSlots] = useState([]); // New state
  const [selectedCenterId, setSelectedCenterId] = useState(null); // New state

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
        id: userId
      }
    },
    diagnosticTests: []
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

  const [slotData, setSlotData] = useState({
    center_id: null,
    date: '',
    slot: ''
  });

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        if(role==="CENTER_ADMIN"){
          const response = await Axios.get(`/centerAdministrator/user/${userId}`);
          const centersData = response.data.data.diagnosticCenter;
          console.log(centersData)
          // console.log(centersData.id)
          {centersData && typeof centersData!=='string' && centerAdd(centersData.id)}
          const center=[]
          center.push(centersData)
          setCentersList(center);
          console.log(center_id)
          
        }else{
          const response = await Axios.get('/diagnosticcenter');
          const centersData = response.data.data;
          setCentersList(centersData);
        }
      
      } catch (error) {
        console.error('Error fetching diagnostic centers:', error);
        setCentersList(error.response.data)
        console.log(centersList)
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
            id: userId
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

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setSlotData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/booking', slotData);
      console.log(response);
      alert('Slot added successfully');
      setShowSlotModal(false);
      // Optionally, refresh slot data or centers list
    } catch (error) {
      const msg = error.response.data;
      alert(`Error adding slot: ${msg}`);
    }
  };

  const handleAddSlotClick = (centerId) => {
    setSlotData(prevState => ({
      ...prevState,
      center_id: centerId
    }));
    setShowSlotModal(true);
  };

  // New function to handle viewing slots
  const handleViewSlots = async (centerId) => {
    try {
      const response = await Axios.get(`/booking/center/${centerId}`);
      console.log(response.data)
      setSlots(response.data); 
      setSelectedCenterId(centerId);
      setShowSlotsModal(true);
    } catch (error) {
      console.error('Error fetching booking slots:', error);
      alert('Failed to fetch booking slots');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Diagnostic Centers List</h2>
      {(!centersList || typeof centersList==='string') &&( <Button variant="primary" onClick={handleOpenAddModal} className="mb-3">Add Diagnostic Center</Button>)}
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
            <th>View Slots</th> {/* New column for viewing slots */}
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
                    <Dropdown.Item as="button" onClick={() => handleAddSlotClick(center.id)}>Add Slot</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleEdit(center)}>Edit</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => handleDelete(center.id)}>Delete</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleViewSlots(center.id)}>View Slots</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No diagnostic centers to display</td>
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

              <h5>{selectedCenter.name}</h5>
              <p><strong>Id: </strong>{selectedCenter.id}</p>
              <p><strong>Contact:</strong> {selectedCenter.contactNO}</p>
              <p><strong>Address:</strong> {selectedCenter.address}</p>
              <p><strong>Email:</strong> {selectedCenter.email}</p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to add a new diagnostic center */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Diagnostic Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCenter}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCenter.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContactNO">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNO"
                value={newCenter.contactNO}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newCenter.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newCenter.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdminName">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCenter.centerAdmin.name}
                onChange={handleCenterAdminChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdminPhoneNo">
              <Form.Label>Admin Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                value={newCenter.centerAdmin.phoneNo}
                onChange={handleCenterAdminChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdminAddress">
              <Form.Label>Admin Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newCenter.centerAdmin.address}
                onChange={handleCenterAdminChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Add Center</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to edit diagnostic center */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Diagnostic Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCenter}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editCenter.name}
                onChange={(e) => setEditCenter(prevState => ({ ...prevState, name: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContactNO">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={editCenter.contactNO}
                onChange={(e) => setEditCenter(prevState => ({ ...prevState, contactNO: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editCenter.address}
                onChange={(e) => setEditCenter(prevState => ({ ...prevState, address: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editCenter.email}
                onChange={(e) => setEditCenter(prevState => ({ ...prevState, email: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdminName">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                value={editCenter.centerAdmin.name}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  centerAdmin: { ...prevState.centerAdmin, name: e.target.value }
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdminPhoneNo">
              <Form.Label>Admin Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={editCenter.centerAdmin.phoneNo}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  centerAdmin: { ...prevState.centerAdmin, phoneNo: e.target.value }
                }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAdminAddress">
              <Form.Label>Admin Address</Form.Label>
              <Form.Control
                type="text"
                value={editCenter.centerAdmin.address}
                onChange={(e) => setEditCenter(prevState => ({
                  ...prevState,
                  centerAdmin: { ...prevState.centerAdmin, address: e.target.value }
                }))}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to add slot */}
      <Modal show={showSlotModal} onHide={() => setShowSlotModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Booking Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSlot}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={slotData.date}
                min={todayFormatted}
                max={maxDateFormatted}
                onChange={handleSlotChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSlot">
              <Form.Label>Slots</Form.Label>
              <Form.Control
                type="text"
                name="slot"
                value={slotData.slot}
                onChange={handleSlotChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Add Slot</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSlotModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to view booking slots */}
      <Modal show={showSlotsModal} onHide={() => setShowSlotsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Booking Slots for Center ID: {selectedCenterId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {slots.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Slots</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, index) => (
                  <tr key={index}>
                    <td>{new Date(slot.date).toLocaleDateString()}</td>
                    <td>{slot.slot}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No slots available for this center.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSlotsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiagnosticCenter;
