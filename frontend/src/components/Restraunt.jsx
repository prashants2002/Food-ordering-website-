import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar';

const Restraunt = () => {

  const [restraunt, setRestraunt] = useState();
  const [items, setItems] = useState([]);
  const [offer, setOffer] = useState();
  const [delivery, setDelivery] = useState();
  const id = useParams();

  const getRestraunt = async () => {
    const res = await axios.get(`http://localhost:5000/server/restraunt/${id.id}`);
    setRestraunt(res.data);
    setOffer(res.data.offer);
    setDelivery(res.data.delivery);
  }

  const getRestrauntItem = async () => {
    const res = await axios.get(`http://localhost:5000/server/item/${id.id}`);
    setItems(res.data);
  }
  useEffect(() => {
    getRestraunt();
    getRestrauntItem();
  }, [])
  return <div>
    <Navbar />
    {restraunt ? <div class="container-fluid" style={{ position: 'absolute', marginTop: "80px" }}>
      <div class="container-fluid p-3" style={{ height: "fit-content", backgroundColor: "rgb(241,241,241)" }}>
        <div style={{ width: "100%" }}>
          <div class="mx-auto d-flex" style={{ width: "fit-content" }}>
            <div class="row">
              <div class="col">
                <img src="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2019/10/domino-s-pizza-1571307449.jpg" style={{ height: "175px", width: "280px" }} />
              </div>
              <div className="col">
                <div className="ps-3" style={{ width: "400px" }}>
                  <h3>{restraunt.name}</h3>
                  <p style={{ marginTop: "-10px" }}>{restraunt.address}</p>
                  <p style={{ marginTop: "-5px", fontWeight: "500" }}>{restraunt.description}</p>
                  <div class="d-flex" style={{ fontWeight: "600" }}>
                    <div >
                      <i class="fa fa-star" style={{ alignItems: "center" }}></i>
                      {restraunt.rating?<span class="ms-2">{restraunt.rating}</span>:<span span class="ms-2">No Rating</span>}
                    </div>
                    <div >
                      {restraunt.veg && <span class="ms-5" style={{ color: "green" }}>Pure Veg</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div style={{ width: "250px" }}>
                  <div class="mt-4 " style={{ height: "70%", borderBottom: "1px solid gray", borderTop: "1px solid gray" }}>
                    <div class="text-center " style={{ color: "gray", fontSize: "20px", fontWeight: "600" }}>Offers</div>
                    {(offer !== 0 || delivery === 0) ?
                      <ul>
                        {offer !== 0 && <li>{offer} % off</li>}
                        {delivery === 0 && <li>Free Delivery</li>}
                      </ul> : <div>No Offers</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-3">
        <div class="mx-auto" style={{ width: "60%" }}>
          {items.map(i => (
            <FoodCard data={i} key={i._id} />
          ))}
        </div>
      </div>
    </div> : 
    <div class="container-fluid" style={{ position: 'absolute', marginTop: "120px" }}>
      <div class="mx-auto " style={{width:"fit-content"}}>
      <div class="spinner-border" style={{color:"#d35100"}}></div>
      </div>
    </div>}

  </div>;
};

export default Restraunt;
