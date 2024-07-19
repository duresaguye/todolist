import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleSignIn = () => {
  const handleLoginSuccess = async (response) => {
    const { tokenId } = response;
    try {
      const result = await axios.post('http://127.0.0.1:8000/api/auth/google/', {
        access_token: tokenId,
      });
      console.log(result.data);
      // Save the token in localStorage or handle login logic
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div>
      <GoogleLogin
        clientId="436198847762-sug2qf151isic2d0vk70qva2itr9uadg.apps.googleusercontent.com "
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleSignIn;
