import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import logo from '../images/logo.png';
import { EmailButton } from '../components/emailButton.jsx';
import Password from '../components/password.jsx';
import './Login.css';

const Temp = ()=> {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
    });
  
    const UsernameCheck = async (event) => {
      const name = username.name;
      console.log("username from frontend", name);
      try {
        const response = await fetch(
          `http://localhost:3001/users/usernamecheck/`+name,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(
            `Error seeing if id exists, from frontend: ${response.statusText}`
          );
        }
  
        const responseBody = await response.text();
  
        if (responseBody === "User exists!") {
          console.log("username yay");
        } else {
          console.log("Unexpected response:", responseBody);
        }
      } catch (error) {
        console.error(error);
        return undefined;
      }
    };
  
    const PasswordCheck = async (event) => {
      const secret = password.secret;
      console.log("password from frontend", secret);
      try {
        const response = await fetch(
          `http://localhost:3001/users/passwordcheck/`+secret,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(
            `Error seeing if id exists, from frontend: ${response.statusText}`
          );
        }
  
        const responseBody = await response.text();
  
        if (responseBody === "User exists!") {
          console.log("password yay");
        } else {
          console.log("Unexpected response:", responseBody);
        }
      } catch (error) {
        console.error(error);
        return undefined;
      }
    };

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <label>
              Username
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}>
              </input>
            </label>

            <label>
              Password
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}>
              </input>
            </label>

            <button onClick={() => {UsernameCheck(username) 
            PasswordCheck(password)}} style=
          {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
          width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
            Login
            </button>
    
            <button style=
          {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
          width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'30px'}}>
            Sign Up
            </button>
          </header>
        </div>
      );
}

export default Temp