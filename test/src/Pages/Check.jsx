import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Check=()=> {
    useEffect(() => {
        // Define your backend endpoint URL
        const backendEndpoint = "http://localhost:3001/";
    
        // Make a GET request to the backend
        axios.get(backendEndpoint)
          .then(response => {
            // Handle the successful response from the backend
            console.log('Backend is connected:', response.data);
          })
          .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error connecting to the backend:', error);
          });
      }, []); // Empty dependency array to ensure the effect runs once when the component mounts
    
      return (
    <div>
        Bye
    </div>
      );
    };

export default Check