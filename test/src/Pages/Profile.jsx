import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import './Profile.css';
import '../Fonts/Playball-Regular.ttf';
import Papi from '../images/papi.jpg';

const Profile = () => {
    const navigate = useNavigate();

    const [user_id, setUSER_ID] = useState([]);
    const [data, setData]=useState([]);


    useEffect(() => {
      
    });

      const GetUser = async (event) => {
        api.get("/users/GetUser/"+user_id).then((response) => {
          console.log("API Data:", response.data);
          setData(response.data);
  
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
      };

    return (
        <div className="Profile">
            <header
            style =
            {{backgroundColor:'#c9305e',height:'68px',fontSize:'35px', fontWeight:'400',color:'white',
            textShadow:'0px 4px 4px #00000040',fontFamily:"Playball-Regular"}}>
                KITTI VISION
            </header>
            <label>
              User_ID
              <input type="text" value={user_id} onChange={(e) => setUSER_ID(e.target.value)}>
              </input>
            </label>
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
        <button onClick={()=>navigate('/show')} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Show
        </button>
        <button onClick={GetUser} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Get
        </button>
        <p>

        </p>
        <header>
            <p>
              Username
            </p>
            {data[0] ? data[0][0]:''}
            <p>
              Password
            </p>
            {data[0] ? data[0][1]:''}
            <p>
              Review Count
            </p>
            {data[0] ? data[0][2]:''}
            <p>
              Watchlist
            </p>
            {data[0] ? data[0][3]:''}
        </header>
        </div>
    );
}

export default Profile