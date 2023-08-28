import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = async () => {
    try {
      // Make a request to your server-side endpoint
      const response = await axios.get('http://localhost:3000/auth/google');
      
      // Redirect the user to the authorization URL returned by the server
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      console.error('Error initiating OAuth flow:', error);
      // Handle the error
    }
  };

  const fetchUserProfile = async () => {
    try {
      // Make a request to your server-side endpoint to fetch the user profile
      const response = await axios.get('http://localhost:3000/fetchUserProfile');
      
      // Set the user profile in the component state
      setUserProfile(response.data.userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle the error
    }
  };

  return (
    <div>
      <h1>Google OAuth Example</h1>
      {userProfile ? (
        <div>
          <p>Name: {userProfile.names[0].displayName}</p>
          <p>Email: {userProfile.emailAddresses[0].value}</p>
          {/* Display other profile data as needed */}
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
      {userProfile && (
        <button onClick={fetchUserProfile}>Fetch Profile</button>
      )}
    </div>
  );
};

export default App;
