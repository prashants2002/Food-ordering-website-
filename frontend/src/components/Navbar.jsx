import React from 'react';
import cart from '../img/cart.png';
import { Link,useHistory } from 'react-router-dom';

const Navbar = () => {
    const history=useHistory();
    const user=localStorage.getItem("user");

    const handleLogout=()=>{
        localStorage.removeItem("user");
        history.push("/");
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
                            <Link to="/" className="link">
                                <div class="nav-link" aria-current="page" style={{ color: "white" }}>Home</div>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/res" className="link">
                                <div class="nav-link" style={{ color: "white" }}>Restraunts</div>
                            </Link>
                        </li>
                        {/* <li class="nav-item">
                            <Link to="/menu" className="link">
                                <div class="nav-link" style={{ color: "white" }}>Menu</div>
                            </Link>
                        </li> */}
                    </ul>
                    <form class="d-flex me-4">
                        { user ?<ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <div class="nav-link" style={{ color: "white" }} onClick={handleLogout}>Logout</div>
                            </li>
                            <li class="nav-item">
                            <Link to="/order" className="link">
                                <div class="nav-link" style={{ color: "white" }}>Orders</div>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/cart" className="link">
                                    <div class="nav-link" style={{ color: "white" }}><img src={cart} style={{ height: "25px" }} /></div>
                                </Link>
                            </li>
                        </ul>:<ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/login" className="link">
                                    <div class="nav-link" aria-current="page" style={{ color: "white" }}>Login</div>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/admin/login" className="link">
                                    <div class="nav-link" style={{ color: "white" }}>Admin</div>
                                </Link>
                            </li>
                        </ul>}
                    </form>
                </div>
            </div>
        </nav>
    </div>;
};

export default Navbar;
