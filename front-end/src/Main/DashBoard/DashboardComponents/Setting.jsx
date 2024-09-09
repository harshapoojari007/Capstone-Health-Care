import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import Axios from '../../../configurations/Axios';
import { useUser } from '../../../UserContext';

const Setting = () => {
  const { username, email, role, id } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedDetails, setEditedDetails] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const endpoint = role === 'ADMIN' ? `/admin` : `/user/${id}`;
        const response = await Axios.get(endpoint);
        console.log(response.data.data)
        setUserDetails(response.data.data);
        setEditedDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setShowAlert({ show: true, message: 'Error fetching user details.', variant: 'danger' });
      }
    };

    fetchUserDetails();
  }, [role, id]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSave = async () => {
    try {
      const userEndpoint = `/user/${id}`;
      const adminEndpoint = `/admin/${editedDetails.id}`;
      const centerAdminEndPoint=`/centerAdministrator/user/${id}`;


      if (role==='ADMIN') {
        await Axios.put(userEndpoint, {
          username: editedDetails.user.username,
          password: editedDetails.user.password,
          email: editedDetails.user.email
        });

        await Axios.put(adminEndpoint, {
          id: editedDetails.id,
          name: editedDetails.name,
          phoneNo: editedDetails.phoneNo,
          address: editedDetails.address,
          user: {
            id: editedDetails.user.id
          }
        });
      } else if(role==='CENTER ADMIN'){
        await Axios.put(userEndpoint, {
          username: editedDetails.user.username,
          password: editedDetails.user.password,
          email: editedDetails.user.email
        });

        await Axios.put(centerAdminEndPoint, {
          name: editedDetails.name,
          phoneNo: editedDetails.phoneNo,
          address: editedDetails.address,
        });
      }
      else {
        await Axios.put(userEndpoint, {
          username: editedDetails.username,
          password: editedDetails.password,
          email: editedDetails.email
        });
      }

      setUserDetails(editedDetails);
      setShowAlert({ show: true, message: 'Details updated successfully!', variant: 'success' });
    } catch (error) {
      console.error('Error updating details:', error);
      setShowAlert({ show: true, message: 'Error updating details.', variant: 'danger' });
    } finally {
      handleCloseEditModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if(role==='USER'){
      setEditedDetails((prev) => ({
        ...prev,
       [name]: value 
      }));
    }
   
    else{
      setEditedDetails((prev) => ({
        ...prev,
        user: { ...prev.user, [name]: value }
      }));
    }
  };

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">{role} Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {role === 'USER' || role==='CENTER_ADMIN'?
          <>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Username</h3>
              <p className="text-gray-600">{userDetails.username}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-600">{userDetails.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Password</h3>
              {/* <p className="text-gray-600">{userDetails.password}</p> */}
              <p className="text-gray-600">********</p>

            </div>
          </> : (
            <>
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
            </>
          )}

        <Button
          variant="primary"
          onClick={handleEditClick}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Edit
        </Button>
      </div>

      {showAlert.show && (
        <Alert variant={showAlert.variant} className="mt-3">
          {showAlert.message}
        </Alert>
      )}

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>
        <div className="space-y-4">
          {!role === 'ADMIN'  &&
           
            (<>
          
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
            </>)}
              
          

              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"

                  value={role === 'USER' || role==='CENTER_ADMIN'? editedDetails.username : editedDetails.user.username}
                  onChange={handleUserChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={role === 'USER' || role==='CENTER_ADMIN' ? editedDetails.password : editedDetails.user.password}
                  onChange={handleUserChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={role === 'USER'|| role==='CENTER_ADMIN' ? editedDetails.email : editedDetails.user.email}

                  onChange={handleUserChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            </>
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
