import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Profile.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import { toast } from 'react-toastify'; // Remove ToastContainer import
import 'react-toastify/dist/ReactToastify.css'; // Remove ToastContainer CSS import
import Header from '../Header/Header1.jsx';
export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.get('http://localhost:3001/user/api/profile', { headers });
      const data = response.data;
      setUserData(data);
      setEditedUsername(data.user.username); // Set initial edited username
      setEditedEmail(data.user.email); // Set initial edited email
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsEditMode(true);
  };
  
  const handleSaveClick = useCallback(async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
  
      const response = await axios.put('http://localhost:3001/user/api/profile', {
        username: editedUsername,
        email: editedEmail
      }, { headers });
  
      const data = response.data;
      setUserData(data);
      setIsEditMode(false); // Disable edit mode after saving
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  }, [editedUsername, editedEmail]);

  return (
    <div className="container-main-page17">
        <Header />
      <div className='container1'>
      <div className="main7">
        <div className="left-side7">
        </div>
        <div className="right-container7">
          <div className="action-text7">
            <div className="text-action-main7">Profile</div>
          </div>
          <form className="login-form">
          <div className="right-inputs7">
            {userData ? (
              <div className="profile-section7">
                 <h4> <label htmlFor="username">Username:</label></h4>
                <div className="input7">
                  <div className="input-wrapper">
                    <img src={user_icon} alt="" className="img7" />
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      readOnly={!isEditMode}
                    />
                  </div>
                </div>
                 <h4> <label htmlFor="email">Email:</label></h4>
                <div className="input7">
                  <div className="input-wrapper">
                    <img src={email_icon} alt="" className="img7" />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      readOnly={!isEditMode}
                    />
                  </div>
                </div>
                {isEditMode ? (
                  <div className="button-container">
                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                    <button className="cancel-button" onClick={() => setIsEditMode(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="edit-button" onClick={handleEditClick}>Edit</button>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  );
}
