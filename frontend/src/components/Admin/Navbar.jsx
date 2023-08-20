import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AddItem from './AddItem';

const Navbar = () => {
    const history = useHistory();
    const restraunt = localStorage.getItem("restraunt");

    const handleLogout = () => {
        localStorage.removeItem("restraunt");
        history.push("/admin/login");
        window.location.reload(false);
    }
    return <div>
        <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#d35100", position: "fixed", width: "100%", zIndex: "1" }}>
            <div class="container-fluid">
                <a className="navbar-brand ms-lg-4" href="#" style={{ color: "white", fontSize: "25px", fontWeight: "700" }}>Food Hub</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i class="fa fa-bars" style={{ color: "white", alignItems: "center" }}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <div class="nav-link" style={{ color: "white" }} data-toggle="modal" data-target="#exampleModalCenter">Add_Items</div>
                        </li>
                        <li class="nav-item">
                            <Link to="/admin/orders" className="link">
                                <div class="nav-link" style={{ color: "white" }}>Orders</div>
                            </Link>
                        </li>
                    </ul>
                    <form class="d-flex me-4">
                        {restraunt ? <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/admin/login" className="link">
                                    <div class="nav-link" style={{ color: "white" }} onClick={handleLogout}>Logout</div>
                                </Link>
                            </li>
                        </ul> : <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/login" className="link">
                                    <div class="nav-link" aria-current="page" style={{ color: "white" }}>Login</div>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/admin" className="link">
                                    <div class="nav-link" style={{ color: "white" }}>Admin</div>
                                </Link>
                            </li>
                        </ul>}
                    </form>
                </div>
            </div>
        </nav>


        <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <AddItem/>
        </div>
    </div>;
};

export default Navbar;
