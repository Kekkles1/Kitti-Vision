import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import './Profile.css';
import '../Fonts/Playball-Regular.ttf';

const Show = () => {
    const [tv_id, setTV_ID] = useState();
    const [data, setData]=useState();

    const navigate = useNavigate();

    useEffect(() => {
    });

      const GetShowName = async (event) => {
        api.get("/users/GetShowName/"+tv_id).then((response) => {
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
              Show Id
              <input type="text" value={tv_id} onChange={(e) => setTV_ID(e.target.value)} >
              </input>
            </label>
            <button onClick={()=>navigate('/profile')} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Profile
        </button>
        <button onClick={GetShowName} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Get
        </button>
        <p>

        </p>
        <header>
            Name of Show
            <p>
                
            </p>
            {data}
        </header>

        </div>
    );
}

export default Show