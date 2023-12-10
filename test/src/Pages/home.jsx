import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import './Home.css';
import '../Fonts/Playball-Regular.ttf';


const Home=()=> {
  const navigate = useNavigate()
  const [shows, setShows] = useState([]);

  useEffect(() => {
    api.get("/tvShow").then((response) => {
        console.log("API Data:", response.data.rows);
        setShows(response.data.rows);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
<div className="Home">
            <header
            style =
            {{backgroundColor:'#c9305e',height:'68px',fontSize:'35px', fontWeight:'400',color:'white',
            textShadow:'0px 4px 4px #00000040',fontFamily:"Playball-Regular"}}>
                KITTI VISION
            </header>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Season</th>
                  <th>Genre</th>
                  <th>Synopsis</th>
                  <th>Watchlist Count</th>
                  <th>Review Count</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
              {shows.map((show, index) => (
            <tr key={index}>
              <td>{show[0]}</td>
              <td>{show[1]}</td>
              <td>{show[2]}</td>
              <td>{show[3]}</td>
              <td>{show[4]}</td>
              <td>{show[5]}</td>
              <td>{show[6]}</td>
              <td>{show[7]}</td>
            </tr>
          ))}
              </tbody>
            </table>
            <button onClick={()=>navigate('/')} style=
      {{ backgroundColor: 'white', color:'#FF477E',borderRadius: '88px',border:'none',
      width:'296px',height:'50px',textAlign:'center',fontSize:'2vw',marginTop:'20px'}}>
        Temp
        </button>
        </div>
  );
}

export default Home