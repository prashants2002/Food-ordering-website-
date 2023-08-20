import React, { useEffect, useState } from 'react';
import '../../components/style.css';
import axios from "axios";
import storage from '../../firebase/config';
import './style.css';
import Dialog from '@material-ui/core/Dialog';

const FoodCard = ({ data }) => {
    const [details, setdetails] = useState(data);
    const [open, setOpen] = useState(false);
    const [urlCheck,setUrlCheck]=useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        if (e.target.name == "image") {
            setUrlCheck(true);
            const file = e.target.files[0];
            if (file) {
                const filename = file.name + data._id;
                console.log(filename)
                const uploadTask = storage.ref(`item/${filename}`).put(file);
                uploadTask.on("state_changed", snapshot => { },
                    error => { console.log(error); },
                    () => {
                        storage.ref("item").child(filename).getDownloadURL().then(url => {
                            console.log(url);
                            if (url) {
                                setUrlCheck(false);
                            }
                            setdetails({ ...details, [e.target.name]: url });
                        });
                    });
            }
            else {
                console.log("Null")
            }
        }
        else if (e.target.name === "veg") {
            if (e.target.id === "yes") {
                setdetails({ ...details, [e.target.name]: true });
            }
            else {
                setdetails({ ...details, [e.target.name]: false });
            }
        }
        else {
            setdetails({ ...details, [e.target.name]: e.target.value });
        }
    }

    const handleEditDialog = async () => {
        const res = await axios.put(`http://localhost:5000/server/item/${details._id}`, details);
        console.log(res.data);
        setOpen(false);
    }
    const handleEdit = async () => {
        setOpen(true);
    }
    const handleDelete = async () => {
        const res = await axios.delete(`http://localhost:5000/server/item/${data._id}`);
        console.log(res.data);
        window.location.reload(false);
    }

    return <div>
        <div class="mx-auto d-flex pt-3 pb-3" style={{ width: "100%", borderBottom: "1px solid gray" }}>
            <div class="ms-3 mt-3" style={{ width: "100%" }}>
                <div class="food-info">
                    <h4>{details.name}</h4>
                    {details.veg ? <span class="me-4" style={{ color: "green", fontWeight: "600" }}>Veg</span> : <span class="me-4" style={{ color: "red", fontWeight: "600" }}>Non Veg</span>}
                </div>
                <p style={{ marginTop: "-10px", color: "gray" }}>{details.description}</p>
                <div class="food-info me-4">
                    <p style={{ marginTop: "-7px", fontSize: "20px", fontWeight: "600" }}>Rs {details.price}/-</p>
                    <div>
                        <button className="btn btn-primary ps-3 pe-3" style={{ backgroundColor: "white", border: "2px solid green", fontSize: "15px", fontWeight: "600", color: "green", marginTop: "-20px", marginLeft: "50px" }} data-toggle="modal" data-target="#editItem" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-primary ps-3 pe-3" style={{ backgroundColor: "white", border: "2px solid red", fontSize: "15px", fontWeight: "600", color: "red", marginTop: "-20px", marginLeft: "10px" }} onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            </div>
            <div>
                <img class="ms-auto me-3 " src={data.image} style={{ width: "180px", height: "120px", borderRadius: "10px" }} />
            </div>
        </div>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="#editItem">Edit Item</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "25px", fontWeight: "600", color: "#d35100", background: "none", border: "none" }} onClick={handleClose}>
                        <span aria-hidden="true" >&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div className="row" style={{ fontSize: "18px" }}>
                        <div class="contianer-fuild mb-3">
                            <div class="mx-auto" style={{ width: "fit-content" }}>
                                <img src={details.image} style={{ width: "300px" ,height:"200px"}} class="mx-auto" />
                            </div>
                        </div>
                        <div className="d-flex my-1">
                            <div style={{ color: "gray", width: "150px" }}>Name: </div>
                            <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="name" class="input-field" autoComplete="off" value={details.name} onChange={handleChange} placeholder="Click to add Name" />
                        </div>
                        <div className="d-flex my-1">
                            <div style={{ color: "gray", width: "150px" }}>Description: </div>
                            <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="description" class="input-field" autoComplete="off" value={details.description} onChange={handleChange} placeholder="Click to add Description" />
                        </div>
                        <div className="d-flex my-1">
                            <div style={{ color: "gray", width: "150px" }}>Price: </div>
                            <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="number" name="price" class="input-field" autoComplete="off" value={details.price} onChange={handleChange} placeholder="Click to add Price" />
                        </div>
                        <div className="d-flex my-1">
                            <div style={{ color: "gray", width: "140px" }}>Veg: </div>
                            <div>
                                <input id="yes" style={{ fontWeight: "500" }} type="radio" name="veg" class="input-field" autoComplete="off" value={details.veg} onChange={handleChange} placeholder="Click to add Description" />
                                <label htmlFor="yes">Yes</label>
                            </div>
                            <div>
                                <input id="no" style={{ fontWeight: "500" }} type="radio" name="veg" class="input-field ms-4" autoComplete="off" value={details.veg} onChange={handleChange} placeholder="Click to add Description" />
                                <label htmlFor="no" class="ms-2">No</label>
                            </div>
                        </div>
                        <input id="html" style={{ fontWeight: "500",marginTop:"10px" }} type="file" name="image" class="input-field mt-2" autoComplete="off"onChange={handleChange} placeholder="Click to add Description" />
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" style={{ backgroundColor: "white", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "#d35100" }} data-dismiss="modal" onClick={handleClose}>Cancel</button>
                    <button type="button" style={{ backgroundColor: "#d35100", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "white" }} class="btn btn-primary" onClick={handleEditDialog} data-dismiss="modal" disabled={urlCheck}>Edit</button>
                </div>
            </div>
        </Dialog>

    </div>;
};

export default FoodCard;
