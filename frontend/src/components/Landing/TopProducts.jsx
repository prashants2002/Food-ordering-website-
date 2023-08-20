import React from 'react';
import {data} from '../../data.js';

const TopProducts = () => {

    return <div class="contianer-fuild pt-4" style={{ backgroundColor: "rgb(241, 241, 241)"}}>
        <div class="mx-auto" style={{ width: "fit-content", fontSize: "25px", fontWeight: "600" }}>Top Products</div>
        <div class="mx-auto mb-4" style={{ width: "250px", border: "1px solid gray" }} />
        <div class="row p-3 mx-5">
            {data.map(d => (
                <div class="col-md-4 col-12" style={{ height: "400px",position:"realtive",zIndex:"0" }}>
                    <div class="card mx-auto" style={{ width: "300px", borderRadius: "10px", border: "none" }}>
                        <img src={d.image} class="card-img-top" alt="..." style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px", height: "170px" }} />
                        <div class="card-body">
                            <p class="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>{d.item}</p>
                            <p style={{ marginTop: "-15px", fontStyle: "italic" }}>{d.restraunt}, {d.location}</p>
                            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure </p>
                            <button class="btn btn-primary mx-auto" style={{ background: "white", border: "2px solid #d35100", color: "#d35100", fontWeight: "600" }}>Order Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>;
};

export default TopProducts;
