import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './style.css';
import axios from "axios";
import bake from '../img/bake.png';
import bike from '../img/bike.png';
import delivered from '../img/delivered.png';


const Order = () => {
    const [order, setOrder] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const getOrder = async () => {
        const res = await axios.get(`http://localhost:5000/server/order/${user._id}`);
        var temp=res.data;
        temp.sort(function(a,b){
            var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
            return dateB - dateA
        })
        const l=temp.length;
        var i;
        for(i=0;i<l;i++){
            var tempDemo=res.data[i];
            var date=new Date(tempDemo.createdAt);
            const day=date.getDate();
            const month=date.getMonth()+1;
            const year=date.getYear()-100;
            const dateStr=day+" / "+month+" / "+year;
            const time=date.getHours()+":"+date.getMinutes();
            tempDemo.createdAt=dateStr+", "+time;
            temp[i]=tempDemo;
        }
        setOrder(temp);
    }

    useEffect(() => {
        getOrder();
    }, [])

    
    return (
        <div>
        <div>
            <Navbar />
            <div class="container-fluid" style={{ position: 'absolute', marginTop: "70px" }}>
                <div className="d-flex">
                    <div style={{ width: "80%"}} class="mx-auto">
                        <div class="mx-auto d-flex pt-3 mb-3" style={{ width: "80%"}}>
                            <div class="d-flex justify-content-between mx-auto" style={{ width: "95%" ,fontSize:"20px",fontSizeAdjust:"700"}}>
                                <div style={{width:"120px"}}></div>
                                <div style={{ width: "30%" ,fontWeight:"700"}}>
                                    Order 
                                </div>
                                
                                <div style={{ width: "30%", fontWeight:"700" }}>
                                    Payment
                                </div>
                                <div style={{ width: "10%", fontWeight:"700" }}>
                                    Status
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid" style={{ position: 'absolute', marginTop: "120px" }}>
                <div className="d-flex">
                    {order.length !== 0 ? <div style={{ width: "80%"}} class="mx-auto">
                        {order.map((i, index) => (<div class="mx-auto d-flex pt-3 mb-3" style={{ width: "80%", borderBottom: "1px solid gray" }}>
                            <div class="d-flex justify-content-between mx-auto" style={{ width: "95%" }}>
                                <img src={i.image} style={{ width: "120px", height: "80px", borderRadius: "5px" }} />
                                <div style={{ width: "30%" }}>
                                    <div class="d-flex align-items-center" >
                                        <div >{i.createdAt} </div>
                                    </div>
                                    <div style={{ fontSize: "12px" }}>Order Id:  {i._id}</div>
                                    <div style={{ marginTop: "5px", fontSize: "15px", color: "gray" }}>
                                        <span>Item: </span>
                                        <span style={{ fontWeight: "500" }}>{i.name}</span>
                                    </div>
                                    <div style={{ fontSize: "15px", color: "gray" ,marginBottom:"10px"}}>
                                        <span>Restraunt: </span>
                                        <span style={{ fontWeight: "500" }}>{i.restraunt}</span>
                                    </div>
                                </div>
                               
                                <div style={{ width: "30%", fontSize: "15px"}}>
                                    <div>
                                        <span style={{ fontWeight: "500" }}> Rs. {i.price*i.quantity} /-</span>
                                        <span style={{ fontSize: "12px" }}> (Delivery Excluded)</span>
                                    </div>
                                    {i.paymentMode===1?<div>Online Pay</div>:<div>Cash On Delivery</div>}
                                    {i.paymentStatus ? <div style={{ color: "green", fontWeight: "600" }}>Paid</div>: <div style={{ color: "red", fontWeight: "600" }}>Not Paid</div>}
                                </div>
                                <div style={{ width: "10%", textAlign: "center" }}>
                                    {i.status===0 && <img src={bake} style={{width:"40px",height:"50px",opacity:"0.65"}}/>}
                                    {i.status===1 && <img src={bike} style={{width:"40px",height:"50px",opacity:"0.65"}}/>}
                                    {i.status===2 && <img src={delivered} style={{width:"40px",height:"50px",opacity:"0.65"}}/>}
                                </div>

                            </div>
                        </div>))}
                    </div> : <div style={{ width: "80%", textAlign: "center" }} class="mx-auto">No Orders</div>}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Order