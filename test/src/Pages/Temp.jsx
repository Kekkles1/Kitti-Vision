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

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
        <EmailButton className="email-button">
        </EmailButton>
        <Password className="password">
        </Password>
            </p>

            <button style=
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