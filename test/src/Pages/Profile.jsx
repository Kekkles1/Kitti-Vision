import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import './Profile.css';
import '../Fonts/Playball-Regular.ttf';
import Papi from '../images/papi.jpg';

function Profile() {
    const navigate = useNavigate();
    return (
        <div className="Profile">
            <header
            style =
            {{backgroundColor:'#c9305e',height:'68px',fontSize:'35px', fontWeight:'400',color:'white',
            textShadow:'0px 4px 4px #00000040',fontFamily:"Playball-Regular"}}>
                KITTI VISION
            </header>
            <button onClick={()=>navigate('/profile')} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Profile
        </button>
            <button onClick={()=>navigate('/home')} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Home
        </button>
        </div>
    );
}

export default Profile