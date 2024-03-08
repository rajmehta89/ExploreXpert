import React from 'react';
import { jwtDecode } from 'jwt-decode';

import { useGoogleOneTapLogin } from '@react-oauth/google';
import './MyCustomButton.css'; // Import your CSS file for styling

const MyCustomGoogleButton = (HandleAuthentication) => {
  const login = useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
      const credentialData=jwtDecode(credentialResponse.credential);
     console.log(credentialData);
     HandleAuthentication(true);
    },
    onError: () => {
      console.log('Login Failed');
      HandleAuthentication(false);
    },
  });

  return (
    <button className="google-auth-button" onClick={() => login()}>
      Sign in with Google 🚀
    </button>
  );
};

export default MyCustomGoogleButton;
