import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './style.css';
import axios from "axios";
import bake from '../../img/bake.png';
import bike from '../../img/bike.png';
import delivered from '../../img/delivered.png';


const AdminOrder = () => {
    const [order, setOrder] = useState([]);
    const restraunt = JSON.parse(localStorage.getItem("restraunt"));
    const getOrder = async () => {
        const res = await axios.get(`http://localhost:5000/server/order/admin/${restraunt._id}`);
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

    const handlePayment=async(index)=>{
        const data=order[index];
        let newData=[...order];
        data.paymentStatus=1;
        newData[index]=data;
        setOrder(newData);
        const orderUpdate={
            "paymentStatus":1
        }
        const res=await axios.put(`http://localhost:5000/server/order/${data._id}/admin`,orderUpdate);
        console.log(res.data.message);
    }

    const handleStatus=async(index)=>{
        const data=order[index];
        let newData=[...order];
        let status=data.status;
        status=status+1;
        data.status=status;
        newData[index]=data;
        setOrder(newData);
        const orderUpdate={
            "status":status
        }
        const res=await axios.put(`http://localhost:5000/server/order/${data._id}/admin`,orderUpdate);
        console.log(res.data.message);
    }
    useEffect(() => {
        getOrder();
    }, [])

    console.log(order)
    return (
        <div>
            <div>
                <Navbar />
                <div class="container-fluid" style={{ position: 'absolute', marginTop: "70px" }}>
                    <div className="d-flex">
                        <div style={{ width: "100%"}} class="mx-auto">
                            <div class="mx-auto d-flex pt-3 mb-3" style={{ width: "90%"}}>
                                <div class="d-flex justify-content-between mx-auto" style={{ width: "95%" ,fontSize:"20px",fontSizeAdjust:"700"}}>
                                    <div style={{width:"120px"}}></div>
                                    <div style={{ width: "20%" ,fontWeight:"700"}}>
                                        Order 
                                    </div>
                                    <div style={{ width: "20%", fontWeight:"700" }}>
                                        Customer
                                    </div>
                                    <div style={{ width: "20%",fontWeight:"700" }}>
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
                        {order.length !== 0 ? <div style={{ width: "100%"}} class="mx-auto">
                            {order.map((i, index) => (<div class="mx-auto d-flex pt-3 mb-3" style={{ width: "90%", borderBottom: "1px solid gray" }}>
                                <div class="d-flex justify-content-between mx-auto" style={{ width: "95%" }}>
                                    <img src={i.image} style={{ width: "120px", height: "80px", borderRadius: "5px" }} />
                                    <div style={{ width: "20%" }}>
                                        <div class="d-flex align-items-center" >
                                            <div>{i.createdAt}</div>
                                        </div>
                                        <div style={{ fontSize: "12px" }}>Order Id:  {i._id}</div>
                                        <div style={{ marginTop: "5px", fontSize: "15px", color: "gray" }}>
                                            <span>Item: </span>
                                            <span style={{ fontWeight: "500" }}>{i.name}</span>
                                        </div>
                                        
                                    </div>
                                    <div style={{ width: "20%", fontSize: "15px"}}>
                                        <div>
                                            <span style={{ fontWeight: "500" }}>{i.user}</span>
                                        </div>
                                       <div>{i.address1}</div>
                                       <div>{i.address2}</div>
                                        <div style={{marginBottom:"10px"}}>{i.contact}</div>
                                    </div>
                                    <div style={{ width: "20%", fontSize: "15px"}}>
                                        <div>
                                            <span style={{ fontWeight: "500" }}> Rs. {i.price*i.quantity} /-</span>
                                            <span style={{ fontSize: "12px" }}> (Delivery Excluded)</span>
                                        </div>
                                        {i.paymentMode===1?<div>Online Pay</div>:<div>Cash On Delivery</div>}
                                        {i.paymentStatus ? <div style={{ color: "green", fontWeight: "600" }}>Paid</div>:<div><div style={{ color: "red", fontWeight: "600" }}>Not Paid</div>
                                        <button class="ps-5 pe-5" style={{border:"1px solid black"}} onClick={()=>handlePayment(index)}>Paid</button></div> }
                                    </div>
                                    <div style={{ width: "10%"}}>
                                        {i.status===0 && <div class="d-flex flex-column">
                                            <img src={bake} style={{width:"40px",height:"50px",opacity:"0.65"}}/>
                                            <button class="ps-2 pe-2 mt-3" style={{border:"1px solid black" }} onClick={()=>handleStatus(index)}>Next</button>
                                            </div>}
                                        {i.status===1 && <div class="d-flex flex-column">
                                            <img src={bike} style={{width:"40px",height:"50px",opacity:"0.65"}}/>
                                            <button class="ps-2 pe-2 mt-3" style={{border:"1px solid black"}} onClick={()=>handleStatus(index)}>Next</button>
                                            </div>}
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

export default AdminOrder