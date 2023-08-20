import React from 'react';
import './style.css';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const FoodCard = ({data}) => {
    const user=JSON.parse(localStorage.getItem("user"));
    const history=useHistory();
    const handleAdd =async()=>{
        if(user){
            const id=user._id;
            const item={
                user:id,
                item:data._id,
                restraunt:data.restraunt,
                quantity:1,
                increase:true
            }
            const check=await axios.get(`http://localhost:5000/server/cart/${id}/${data._id}`);
            if(check.data){
                item.quantity=check.data+1;
                const res=await axios.put(`http://localhost:5000/server/cart/${id}`,item)
            }else{  
                const res=await axios.post(`http://localhost:5000/server/cart/${id}`,item);
            }
        }
        else{
            history.push("/login")
        }
    }
    return <div class="mx-auto d-flex pt-3 pb-3" style={{ width: "100%", borderBottom: "1px solid gray" }}>
        <div class="ms-3 mt-3" style={{ width: "100%" }}>
            <div class="food-info">
                <h4>{data.name}</h4>
                {data.veg ? <span class="me-4" style={{ color: "green", fontWeight: "600" }}>Veg</span>: <span class="me-4" style={{ color: "red", fontWeight: "600" }}>Non Veg</span>}
            </div>
            <p style={{ marginTop: "-10px", color: "gray" }}>{data.description}</p>
            <div class="food-info me-4">
                <p style={{ marginTop: "-7px", fontSize: "20px", fontWeight: "600" }}>Rs {data.price}/-</p>
                <button className="btn btn-primary ps-3 pe-3" style={{backgroundColor:"white",border:"2px solid #d35100",fontSize:"15px",fontWeight:"600",color:"#d35100",marginTop:"-20px",marginLeft:"50px"}} onClick={handleAdd}>ADD</button>
            </div>
        </div>
        <div>
            <img class="ms-auto me-3 " src={data.image} style={{ width: "180px", height: "120px", borderRadius: "10px" }} />
        </div>
    </div>;
};

export default FoodCard;
