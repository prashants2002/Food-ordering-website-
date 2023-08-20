import axios from 'axios';
import React, { useState } from 'react';
import storage from '../../firebase/config';
import food from '../../img/food.jpg';

const AddItem = () => {
    const restraunt = JSON.parse(localStorage.getItem("restraunt"));
    const [detail, setDetail] = useState({
        name: "",
        description: "",
        veg: true,
        price: 0,
        restraunt: restraunt._id,
        image:food
    });
    const [urlCheck,setUrlCheck]=useState(false);
    const handleChange = (e) => {
        if (e.target.name == "image") {
            setUrlCheck(true);
            const file = e.target.files[0];
            if (file) {
                const filename = file.name + restraunt._id;
                console.log(filename)
                const uploadTask = storage.ref(`restraunt/${filename}`).put(file);
                uploadTask.on("state_changed", snapshot => { },
                    error => { console.log(error); },
                    () => {
                        storage.ref("restraunt").child(filename).getDownloadURL().then(url => {
                            console.log(url);
                            if (url) {
                                setUrlCheck(false);
                            }
                            setDetail({ ...detail, [e.target.name]: url });
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

    const handleAdd = async () => {
        console.log(restraunt._id);
        const res = await axios.post(`http://localhost:5000/server/item/${restraunt._id}`, detail);
        console.log(res.data);
    }

    return (
        <div>
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "25px", fontWeight: "600", color: "#d35100", background: "none", border: "none" }}>
                            <span aria-hidden="true" >&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="row" style={{ fontSize: "18px" }}>
                            <div class="contianer-fuild mb-3">
                                <div class="mx-auto" style={{ width: "fit-content" }}>
                                    {/* <img src={detail.image} style={{ width: "300px" }} class="mx-auto" /> */}
                                </div>
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "150px" }}>Name: </div>
                                <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="name" class="input-field" autoComplete="off" value={detail.name} onChange={handleChange} placeholder="Click to add Name" />
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "150px" }}>Description: </div>
                                <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="description" class="input-field" autoComplete="off" value={detail.description} onChange={handleChange} placeholder="Click to add Description" />
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "150px" }}>Price: </div>
                                <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="number" name="price" class="input-field" autoComplete="off" value={detail.price} onChange={handleChange} placeholder="Click to add Price" />
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "140px" }}>Veg: </div>
                                <div>
                                    <input id="yes" style={{ fontWeight: "500" }} type="radio" name="veg" class="input-field" autoComplete="off" value={detail.veg} onChange={handleChange} placeholder="Click to add Description" />
                                    <label htmlFor="yes">Yes</label>
                                </div>
                                <div>
                                    <input id="no" style={{ fontWeight: "500" }} type="radio" name="veg" class="input-field ms-4" autoComplete="off" value={detail.veg} onChange={handleChange} placeholder="Click to add Description" />
                                    <label htmlFor="no" class="ms-2">No</label>
                                </div>
                            </div>
                            <input id="html" style={{ fontWeight: "500",marginTop:"10px" }} type="file" name="image" class="input-field mt-2" autoComplete="off"onChange={handleChange} placeholder="Click to add Description" />
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" style={{ backgroundColor: "white", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "#d35100" }} data-dismiss="modal">Cancel</button>
                        <button type="button" style={{ backgroundColor: "#d35100", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "white" }} class="btn btn-primary" onClick={handleAdd} data-dismiss="modal" disabled={urlCheck}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem