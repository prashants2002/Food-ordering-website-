import React, { useState } from 'react';
import axios from 'axios';

const AddAddress = () => {
    const [detail, setDetail] = useState({
        address1: "",
        address2: "",
        contact: ""
    });
    const [urlCheck, setUrlCheck] = useState(false);

    const handleChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    }

    console.log(detail)
    /*const handleAdd = async () => {
        console.log(restraunt._id);
        const res = await axios.post(`http://localhost:5000/server/item/${restraunt._id}`, detail);
        console.log(res.data);
    }*/
    return (
        <div>
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Address</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "25px", fontWeight: "600", color: "#d35100", background: "none", border: "none" }}>
                            <span aria-hidden="true" >&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="row" style={{ fontSize: "18px" }}>
                            <div class="contianer-fuild mb-3">
                                <div class="mx-auto" style={{ width: "fit-content" }}>
                                </div>
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "150px" }}>Address: </div>
                                <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="address1" class="input-field" autoComplete="off" value={detail.address1} onChange={handleChange} placeholder="Address Line 1" />
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "150px" }}>Address: </div>
                                <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="address2" class="input-field" autoComplete="off" value={detail.address2} onChange={handleChange} placeholder="Address Line 2" />
                            </div>
                            <div className="d-flex my-1">
                                <div style={{ color: "gray", width: "150px" }}>Contact: </div>
                                <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="text" name="contact" class="input-field" autoComplete="off" value={detail.contact} onChange={handleChange} placeholder="Contact Number" />
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" style={{ backgroundColor: "white", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "#d35100" }} data-dismiss="modal">Cancel</button>
                        {/* <button type="button" style={{ backgroundColor: "#d35100", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "white" }} class="btn btn-primary" onClick={handleAdd} data-dismiss="modal" disabled={urlCheck}>Add</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress