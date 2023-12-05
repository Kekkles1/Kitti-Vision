import React from 'react';
import logo from '../images/logo.png';
import './Login.css';
import { EmailButton } from '../components/emailButton.jsx';
import Password from '../components/password.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>

        </p>
        <EmailButton className="email-button">
        </EmailButton>
        <Password className="password">
        </Password>
        <button onClick={()=>navigate('/')} style=
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

export default Login;
