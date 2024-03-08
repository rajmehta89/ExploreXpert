import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Fetch user profile data from MongoDB
      const response = await axios.get('http://localhost:3001/user/api/profile');
      const data = response.data;

      // Set the user data in state
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
