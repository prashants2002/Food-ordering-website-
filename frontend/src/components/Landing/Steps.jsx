import React from 'react';
import step1 from '../../img/step1.jpg';
import step2 from '../../img/step2.jpg';
import step3 from '../../img/step3.jpg';

const Steps = () => {
  return <div class="contianer-fuild pt-4">
    <div class="mx-auto" style={{ width: "fit-content", fontSize: "25px", fontWeight: "600" }}>3 Step Order</div>
    <div class="mx-auto mb-4" style={{ width: "250px", border: "1px solid gray" }} />
    <div class="row p-3 mx-5" style={{ position: "relative", zIndex: -1 }}>
      <div class="col-md-4 col-12">
        <div class="mx-auto" style={{ width: "300px", borderRadius: "10px", border: "none" ,}}>
          <img src={step1}/>
          <p class="text-center" style={{color:"#d35100",fontSize:"30px",fontWeight:"600"}}>Select Item</p>
        </div>
      </div>
      <div class="col-md-4 col-12">
        <div class="mx-auto" style={{ width: "300px", borderRadius: "10px", border: "none",}}>
          <img src={step2}/>
          <p class="text-center" style={{color:"#d35100",fontSize:"30px",fontWeight:"600"}}>Add Address</p>
        </div>
      </div>
      <div class="col-md-4 col-12">
        <div class="mx-auto" style={{ width: "300px", borderRadius: "10px", border: "none" ,}}>
          <img src={step3}/>
          <p class="text-center" style={{color:"#d35100",fontSize:"30px",fontWeight:"600"}}>Payment</p>
        </div>
      </div>
    </div>
  </div>;
};

export default Steps;
