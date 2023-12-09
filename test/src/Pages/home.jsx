import React from 'react';
import './Home.css';
import '../Fonts/Playball-Regular.ttf';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    return (
        <div className="Home">
            <header
            style =
            {{backgroundColor:'#c9305e',height:'68px',fontSize:'35px', fontWeight:'400',color:'white',
            textShadow:'0px 4px 4px #00000040',fontFamily:"Playball-Regular"}}>
                KITTI VISION
            </header>
            <button onClick={()=>navigate('/')}>Logout</button>
            <button onClick={()=>navigate('/check')}>Check</button>
        </div>
    );
}

export default Home