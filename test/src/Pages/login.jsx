import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import logo from '../images/logo.png';
import { EmailButton } from '../components/emailButton.jsx';
import Password from '../components/password.jsx';
import './Login.css';

const Login = ()=> {
    const navigate = useNavigate();
    const [username, setUsername] = useState({username:''});
    const [password, setPassword] = useState({password:''});
    var usernamecheck=false;

    useEffect(() => {
    });
  
    const UsernameCheck = async (event) => {
      const name = username.username;
      console.log("username from frontend", username);
      try {

        const response = await fetch(
          `http://localhost:3001/users/usernamecheck?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(
            `Error seeing if username exists, from frontend: ${response.statusText}`
          );
        }
  
        const responseBody = await response.text();
  
        if (responseBody === "Username is correct!") {
          console.log("username yay");
          usernamecheck=true;

        } else {
          console.log("Unexpected response:", responseBody);
        }
      } catch (error) {
        console.error(error);
        return undefined;
      }
    };
  
    const PasswordCheck = async (event) => {
      const secret = password.password;
      console.log("password from frontend", password);
      try {

        const response = await fetch(
          `http://localhost:3001/users/passwordcheck?password=${password}`,
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
  
        if (responseBody === "Password is correct!") {
          console.log("password yay");
          console.log("usernameCheck:",usernamecheck);
          if (usernamecheck) {
            navigate("/home");
          }
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

            <button  onClick={() =>  UsernameCheck(username).then(() => { PasswordCheck(password); })} 
            style={{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
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

export default Login