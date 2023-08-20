import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './style.css';
import axios from "axios";
import AddAddress from './AddAddress';

const Cart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let history = useHistory();
    const [cart, setCart] = useState([]);
    const [payment,setPayment]=useState();
    const [cartTotal, setCartTotal] = useState({
        total: 0,
        discount: 0,
        delivery: 0
    });
    const [detail, setDetail] = useState({
        address1: "",
        address2: "",
        contact: ""
    });
    const [urlCheck, setUrlCheck] = useState(false);

    const handleChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    }

    const handleQuantityIncrease = async (index) => {
        const data = cart[index];
        let q = data.quantity;
        console.log(data);
        let newData = [...cart];
        data.quantity = q + 1;
        newData[index] = data;
        setCart(newData);
        const item = {
            user: user._id,
            item: data.id,
            quantity: q + 1,
            restraunt: data.restraunt
        }
        const res = await axios.put(`http://localhost:5000/server/cart/${user._id}`, item);
        const total = await axios.get(`http://localhost:5000/server/cart/${user._id}/total`);
        setCartTotal(total.data);
    }
    const handleQuantityDescrease = async (index) => {
        const data = cart[index];
        let q = data.quantity;
        console.log(data);
        let newData = [...cart];
        data.quantity = q - 1;
        newData[index] = data;
        setCart(newData);
        const item = {
            user: user._id,
            item: data.id,
            quantity: q - 1,
            restraunt: data.restraunt
        }
        const res = await axios.put(`http://localhost:5000/server/cart/${user._id}`, item);
        if ((q - 1) === 0) {
            const res = await axios.get(`http://localhost:5000/server/cart/${user._id}/cart`);
            setCart(res.data);
        }
        const total = await axios.get(`http://localhost:5000/server/cart/${user._id}/total`);
        setCartTotal(total.data);
    }
    const getCart = async () => {
        const res = await axios.get(`http://localhost:5000/server/cart/${user._id}/cart`);
        setCart(res.data);
        const total = await axios.get(`http://localhost:5000/server/cart/${user._id}/total`);
        setCartTotal(total.data);
    }

    const handlePayOnline = async () => {
        // const res = await axios.post(`http://localhost:5000/server/order/${user._id}/order`, { paymentMode: 1, paymentStatus: true });
        // console.log(res.data);
        const pay={
            paymentMode: 1, 
            paymentStatus: true
        }
        setPayment(pay);
    }

    const handleCOD = async () => {
        // const res = await axios.post(`http://localhost:5000/server/order/${user._id}/order`, { paymentMode: 0, paymentStatus: false });
        // console.log(res.data);
        const pay={
            paymentMode: 0, 
            paymentStatus: false
        }
        setPayment(pay);
    }

    const hanldeOrder=async()=>{
        const order={
            paymentMode:payment.paymentMode,
            paymentStatus:payment.paymentStatus,
            address1:detail.address1,
            address2:detail.address2,
            contact:detail.contact
        }
        const res = await axios.post(`http://localhost:5000/server/order/${user._id}/order`, order);
        history.push("/order")
    }
    useEffect(() => {
        getCart();
    }, [])

    return (
        <div>
            <Navbar />
            <div class="container-fluid" style={{ position: 'absolute', marginTop: "80px" }}>
                <div className="d-flex">
                    {cart.length !== 0 ? <div style={{ width: "65%" }}>
                        {cart.map((i, index) => (<div class="mx-auto d-flex pt-3" style={{ width: "80%", borderBottom: "1px solid gray" }}>
                            <div class="ms-5 mt-3" style={{ width: "100%" }}>
                                <div class="food-info">
                                    <h5>{i.name}</h5>
                                    {i.veg ? <span class="me-4" style={{ color: "green", fontWeight: "600" }}>Veg</span> : <span class="me-4" style={{ color: "red", fontWeight: "600" }}>Non Veg</span>}
                                </div>
                                <div>{i.price} x {i.quantity}</div>
                                <div class="food-info me-4">
                                    <p style={{ marginTop: "-7px", fontSize: "18px", fontWeight: "600" }}>Rs {i.price * i.quantity}/-</p>
                                    <div class="d-flex quantity" style={{ color: "#d35100", marginTop: "-20px", fontWeight: "600" }}>
                                        <div style={{ fontSize: "25px", marginRight: "20px" }} onClick={() => handleQuantityDescrease(index)}>-</div>
                                        <div style={{ fontSize: "20px" }}>{i.quantity}</div>
                                        <div style={{ fontSize: "25px", marginLeft: "20px" }} onClick={() => handleQuantityIncrease(index)}>+</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img class="ms-auto me-3 " src={i.image} style={{ width: "150px", height: "90px", borderRadius: "10px" }} />
                            </div>
                        </div>))}
                    </div> : <div style={{ width: "65%", textAlign: "center" }}>Your cart is Empty</div>}
                    <div class="ps-5 pe-5" style={{ width: "30%", backgroundColor: "rgb(241,241,241)", height: "fit-content" }}>
                        <h4 class="mx-auto mt-3" style={{ width: "fit-content", color: "#d35100" }}>CART TOTAL</h4>
                        <div class="d-flex mt-3" style={{ fontSize: "18px" }}>
                            <p >Sub - Total:</p>
                            <span class="ms-auto" style={{ fontWeight: "600" }}>Rs {cartTotal.total}/-</span>
                        </div>
                        <div class="d-flex" style={{ fontSize: "18px", marginTop: "-20px" }}>
                            <p >Discount:</p>
                            <span class="ms-auto" style={{ fontWeight: "600" }}>Rs {cartTotal.discount}/-</span>
                        </div>
                        <div class="d-flex" style={{ fontSize: "18px", marginTop: "-20px" }}>
                            <p >Delivery:</p>
                            <span class="ms-auto" style={{ fontWeight: "600" }}>Rs {cartTotal.delivery}/-</span>
                        </div>
                        <div class="d-flex" style={{ fontSize: "18px", marginTop: "-20px" }}>
                            <p >Tax:</p>
                            <span class="ms-auto" style={{ fontWeight: "600" }}>Rs {parseInt(cartTotal.total * 0.05)}/-</span>
                        </div>
                        <hr style={{ marginTop: "-5px" }} />
                        <div class="d-flex" style={{ fontSize: "20px", fontWeight: "600", color: "#d35100" }}>
                            <p >Total:</p>
                            <span class="ms-auto">Rs {cartTotal.total - cartTotal.discount + cartTotal.delivery + parseInt(cartTotal.total * 0.05)}/-</span>
                        </div>
                        <button className="btn btn-primary mt-3" style={{ width: "100%", backgroundColor: "black", border: "none" }} onClick={handlePayOnline} data-toggle="modal" data-target="#exampleModalCenter">Pay Online</button>
                        <button className="btn btn-primary mt-3 mb-5" style={{ width: "100%", backgroundColor: "black", border: "none" }} onClick={handleCOD} data-toggle="modal" data-target="#exampleModalCenter">Cash On Delivery</button>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                        <input style={{ width: "90%", fontWeight: "500", background: "none" }} type="number" name="contact" class="input-field" autoComplete="off" value={detail.contact} onChange={handleChange} placeholder="Contact Number" />
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" style={{ backgroundColor: "white", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "#d35100" }} data-dismiss="modal">Cancel</button>
                                <button type="button" style={{ backgroundColor: "#d35100", border: "2px solid #d35100", fontSize: "15px", fontWeight: "600", color: "white" }} class="btn btn-primary" onClick={hanldeOrder} data-dismiss="modal" disabled={urlCheck}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart