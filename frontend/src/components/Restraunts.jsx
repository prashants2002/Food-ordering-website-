import React, { useState, useEffect } from 'react';
import './style.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Restraunts = () => {
  const space="   ";
  const [restraunts, setRestraunts] = useState([]);

  const getRestraunt = async () => {
    const res = await axios.get("http://localhost:5000/server/restraunt/");
    setRestraunts(res.data);
  }
  useEffect(() => {
    getRestraunt();
  }, [])
  return (
    <div>
      <Navbar/>
<div class="container-fluid" style={{ position: 'absolute', marginTop: "80px" }}>
      <div className="row mx-auto restraunts-container">
        {restraunts.map(r => (
          <div className="col-sm-6 col-md-3 col-12 px-3 py-2" >
            <Link to={`/res/${r._id}`} class="link">
            <div style={{ height: "250px"}}>
              <img src={r.image} style={{ height: "160px", width: "100%", borderRadius: "5px" }} />
              <h5 class="mt-1" style={{color:"black"}}>{r.name}</h5>
              {r.description?<p style={{ marginTop: "-10px", fontSize: "15px",color:"gray" }}> {`${r.description.substring(0, 25)}...`}</p>:<p style={{ marginTop: "-10px", fontSize: "15px",color:"gray" }}>Yummy Food</p>}
              <div class="d-flex justify-content-between" style={{ fontWeight: "600", marginTop: "-20px" }}>
                <div style={{color:"black"}}>
                  <i class="fa fa-star" style={{ alignItems: "center" }}></i>
                  {r.rating ? <span class="ms-2">{r.rating}</span>:<span class="ms-2">No rating</span>}
                </div>
                <div >
                  {r.veg && <span style={{ color: "green" }}>Pure Veg</span>}
                </div>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  )
}

export default Restraunts