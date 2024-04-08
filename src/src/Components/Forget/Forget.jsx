import React, { useState, useEffect } from 'react';
import  { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordResetForm = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const nav=useNavigate();

  useEffect(() => {
    // Extract token from the URL path
    const pathTokens = window.location.pathname.split('/');
    const tokenFromURL = pathTokens[pathTokens.length - 1];

    // Set the token in the component state
    setToken(tokenFromURL);
  }, []);


  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {

      console.log(token);
      const response = await axios.post('http://localhost:3001/user/forgot-password-editing',{
        token,
        newPassword,
      });
      toast.success('Password reset successful');
      nav('/login');
      console.log('Password reset successful:', response.data);
    } catch (error){
      toast.error('Password reset failed');
      console.error('Password reset failed:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <label>Token:</label>
      <input type="text" value={token} disabled />

      <label>New Password:</label>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordResetForm;