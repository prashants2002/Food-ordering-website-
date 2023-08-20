import React,{useEffect, useState} from 'react';
import axios from "axios";

const EditItem = ({item}) => {
    const [details, setdetails] = useState(item);

    const handleChange = (e) => {
        if (e.target.name === "veg") {
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

    const handleEdit=async()=>{
        const res = await axios.put(`http://localhost:5000/server/item/${details._id}`,details);
        console.log(res.data);
    }

  return (
    <div>
        <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="#editItem">{details.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "25px", fontWeight: "600", color: "#d35100", background: "none", border: "none" }}>
                            <span aria-hidden="true" >&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="row" style={{ fontSize: "18px" }}>
                            <div class="contianer-fuild mb-3">
                                <div class="mx-auto" style={{ width: "fit-content"}}>
                                <img src={details.image} style={{ width: "300px" }} class="mx-auto" />
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
                            <input type="file" style={{ fontWeight: "500", marginTop: "10px" }} />
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" style={{ backgroundColor: "white", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "#d35100" }} data-dismiss="modal">Cancel</button>
                        <button type="button" style={{ backgroundColor: "#d35100", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "white" }} class="btn btn-primary" onClick={handleEdit} data-dismiss="modal" >Edit</button>
                    </div>
                </div>
            </div>

        
    </div>
  )
}

export default EditItem