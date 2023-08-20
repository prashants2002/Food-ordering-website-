import React from 'react'
import FoodCard from './FoodCard'
import Navbar from './Navbar'

const Menu = () => {
  return (
    <div>
      <Navbar />
      <div class="container-fluid" style={{ position: 'absolute', marginTop: "80px" }}>
        <div className="row">
          <div className="col-3 my-auto">
            <ul className="menu-list me-4">
              <li class="ms-auto" style={{ width: "fit-content", fontSize: "20px", fontWeight: "600" }}>Italian</li>
              <li class="ms-auto" style={{ width: "fit-content", fontSize: "20px", fontWeight: "600", color: "#d35100" }}>Indain</li>
              <li class="ms-auto" style={{ width: "fit-content", fontSize: "20px", fontWeight: "600" }}>Chinese</li>
              <li class="ms-auto" style={{ width: "fit-content", fontSize: "20px", fontWeight: "600" }}>All</li>
            </ul>
          </div>
          <div className="col-9" style={{ borderLeft: "2px solid gray" }}>
            <div class="ms-4" style={{ width: "80%" }}>
              <FoodCard />
              <FoodCard />
              <FoodCard />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Menu