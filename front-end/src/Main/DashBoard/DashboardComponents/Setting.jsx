import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Ensure react-bootstrap is installed

const Setting = () => {
  // State for user details
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    phoneNo: '123-456-7890',
    address: '123 Main St, Anytown, USA'
  });

  // State for showing the edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  // State for the edited user details
  const [editedDetails, setEditedDetails] = useState(userDetails);

  const handleEditClick = () => {
    setEditedDetails(userDetails); // Initialize editedDetails with current userDetails
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSave = () => {
    setUserDetails(editedDetails); // Save the edited details
    handleCloseEditModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Name</h3>
          <p className="text-gray-600">{userDetails.name}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Phone Number</h3>
          <p className="text-gray-600">{userDetails.phoneNo}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Address</h3>
          <p className="text-gray-600">{userDetails.address}</p>
        </div>

        <Button 
          variant="primary" 
          onClick={handleEditClick}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Edit
        </Button>
      </div>

      {/* Edit Settings Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editedDetails.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                value={editedDetails.phoneNo}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={editedDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                rows="3"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleCloseEditModal}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Setting;
