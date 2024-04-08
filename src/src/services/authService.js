// src/services/authService.js
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const TOKEN_KEY = 'auth_token';
const secretKey = 'vanshop'; // Replace with your actual secret key

export const login = () => {
  // Simulate a login process and generate a JWT token
  const user = { id: 1, username: 'example_user' };
  const token = jwt.sign(user, secretKey);
  setAuthToken(token);
};

export const logout = () => {
  // Simulate a logout process and remove the JWT token
  removeAuthToken();
};

export const isAuthenticated = () => {
  // Check if the JWT token exists and is valid
  const token = getAuthToken();
  try {
    if (token) {
      jwt.verify(token, secretKey);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const setAuthToken = (token) => {
  // Set the token in a cookie with a 7-day expiration
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

const getAuthToken = () => {
  // Get the token from the cookie
  return Cookies.get(TOKEN_KEY);
};

const removeAuthToken = () => {
  // Remove the token cookie
  Cookies.remove(TOKEN_KEY);
};