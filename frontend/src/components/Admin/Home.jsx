import React, { useEffect, useState } from 'react';
import axios from "axios";
import FoodCard from './FoodCard';
import './style.css';
import storage from '../../firebase/config';

const Home = () => {

  const restraunt = JSON.parse(localStorage.getItem("restraunt"));
  const [detail, setDetail] = useState();
  const [items, setItems] = useState([]);
  const [urlCheck,setUrlCheck]=useState(false);

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setUrlCheck(true);
      const file = e.target.files[0];
      if (file) {
        const filename=file.name+restraunt._id;
        console.log(filename)
        const uploadTask = storage.ref(`restraunt/${filename}`).put(file);
        uploadTask.on("state_changed", snapshot => { },
          error => { console.log(error); },
          () => {
            storage.ref("restraunt").child(filename).getDownloadURL().then(url => {
              console.log(url);
              if(url){
                setUrlCheck(false);
              }
              setDetail({...detail,[e.target.name]:url});
            });
          });
      }
      else {
        console.log("Null")
      }
    }
    else if (e.target.name === "veg") {
      if (e.target.id === "yes") {
        setDetail({ ...detail, [e.target.name]: true });
      }
      else {
        setDetail({ ...detail, [e.target.name]: false });
      }
    }
    else {
      setDetail({ ...detail, [e.target.name]: e.target.value });
    }
  }
  const getRestrauntDetails = async () => {
    const res = await axios.get(`http://localhost:5000/server/restraunt/${restraunt._id}`);
    setDetail(res.data);
  }

  const getRestrauntItem = async () => {
    const res = await axios.get(`http://localhost:5000/server/item/${restraunt._id}`);
    setItems(res.data);
  }

  const handleEdit = async () => {
    const res = await axios.put(`http://localhost:5000/server/restraunt/${restraunt._id}`, detail);
    console.log(res);
    getRestrauntDetails();
  }
  useEffect(() => {
    console.log(storage)
    getRestrauntDetails();
    getRestrauntItem()
  }, [])

  return (
    <div>
      {detail ? <div class="container-fluid" style={{ position: 'absolute', marginTop: "80px" }}>
        <div class="container-fluid p-3" style={{ height: "fit-content", backgroundColor: "rgb(241,241,241)" }}>
          <div className="row">
            <div className="col-4">
              <div class="ms-5" style={{ width: "fit-content" }}>
                <img class="mx-auto" src={detail.image} style={{ height: "190px", width: "300px", borderRadius: "5px" }} />
                <input id="html" style={{ fontWeight: "500" }} type="file" name="image" class="input-field mt-2" autoComplete="off" value={detail.descritpion} onChange={handleChange} placeholder="Click to add Description" />
              </div>
            </div>
            <div className="col-8 " style={{ fontSize: "20px" }}>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Name: </div>
                <input style={{ width: "90%", fontWeight: "500" }} type="text" name="name" class="input-field" autoComplete="off" value={detail.name} onChange={handleChange} placeholder="Click to add Name" />
              </div>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Address: </div>
                <input style={{ width: "90%", fontWeight: "500" }} type="text" name="address" class="input-field" autoComplete="off" value={detail.address} onChange={handleChange} placeholder="Click to add Address" />
              </div>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Contact: </div>
                <input style={{ width: "90%", fontWeight: "500" }} type="number" name="contact" class="input-field" autoComplete="off" value={detail.contact} onChange={handleChange} placeholder="Click to add Contact" />
              </div>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Description: </div>
                <input style={{ width: "90%", fontWeight: "500" }} type="text" name="description" class="input-field" autoComplete="off" value={detail.description} onChange={handleChange} placeholder="Click to add Description" />
              </div>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Veg: </div>
                <div>
                  <input id="yes" style={{ fontWeight: "500" }} type="radio" name="veg" class="input-field" autoComplete="off" value={detail.veg} onChange={handleChange} placeholder="Click to add Description" />
                  <label htmlFor="yes" class="ms-2">Yes</label>
                </div>
                <div>
                  <input id="no" style={{ fontWeight: "500" }} type="radio" name="veg" class="input-field ms-4" autoComplete="off" value={detail.veg} onChange={handleChange} placeholder="Click to add Description" />
                  <label htmlFor="no" class="ms-2">No</label>
                </div>
              </div>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Offer(% off): </div>
                <input style={{ width: "fit-content", fontWeight: "500" }} type="number" name="offer" class="input-field" autoComplete="off" value={detail.offer} onChange={handleChange} placeholder="Click to add Contact" />
              </div>
              <div className="d-flex my-1">
                <div style={{ fontSize: "20px", color: "gray", width: "140px" }}>Delivery(Rs): </div>
                <input style={{ width: "fit-content", fontWeight: "500" }} type="number" name="delivery" class="input-field" autoComplete="off" value={detail.delivery} onChange={handleChange} placeholder="Click to add Contact" />
              </div>
            </div>
          </div>
          <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click on fields and then press edit button" className="btn btn-primary ps-3 pe-3" style={{ position: "absolute", top: "10px", right: "25px", backgroundColor: "transparent", border: "2px solid #d35100", fontWeight: "500", color: "#d35100" }} onClick={handleEdit} disabled={urlCheck}>EDIT</button>
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
          <div class="mx-auto " style={{ width: "fit-content" }}>
            <div class="spinner-border" style={{ color: "#d35100" }}></div>
          </div>
        </div>}
    </div>
  )
}

export default Home