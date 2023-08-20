import React from 'react';
import './style.css'

const Banner = () => {
  return <div className="banner-container container-fluid">
      <div class="row">
        <div class="col-11 col-lg-6 ms-lg-5 ms-4 me-4" style={{marginTop:"150px",textAlign:"justify"}}>
            <p className="mt-lg-5" style={{fontSize:"25px",color:"black"}}>Welcome to <b>Food Hub</b></p>
            <span style={{color:"#d35100",fontSize:"35px",fontWeight:"700"}}>Food Made with Love</span>
            <p style={{color:"gray"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia id molestiae voluptatum impedit quisquam cumque quod neque iste inventore, voluptas amet esse quos veritatis nihil quidem, facilis reprehenderit quis debitis!</p>
            <button className="btn btn-primary mt-4 ps-3 pe-3 pt-2 pb-2" style={{backgroundColor:"white",border:"2px solid #d35100",fontSize:"20px",fontWeight:"600",color:"#d35100"}}>EXPLORE</button>
        </div>
      </div>
  </div>;
};

export default Banner;
