import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from "axios";

const AdminLogin = () => {
    const history=useHistory();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(false);
    const [msg,setMsg]=useState("");
    
    const handleLogin=async()=>{
        if(!email || !password){
            setMsg("All fields required");
            setError(true);
        }
        else{
            const restraunt={email,password}
            const res = await axios.post("http://localhost:5000/server/restraunt/login",restraunt);
            if(res.data.message==="Login Successful"){
                setError(false);
                console.log(res.data);
                localStorage.setItem("restraunt",JSON.stringify(res.data.restrauntFind));
                history.push('/admin');
            }
            else{
                setMsg(res.data.message);
                setError(true);
            }
        }
    }

    return (
        <div class="vh-100" style={{ backgroundColor: "rgb(241, 241, 241)" }}>
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong" style={{ borderRadius: "10px" }}>
                            <div class="card-body p-5 text-center">
                                <h3 class="mb-5">ADMIN LOGIN</h3>
                                <div class="form-outline mb-4">
                                    <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <button class="btn btn-primary btn-lg btn-block" style={{ width: "100%", backgroundColor: "#d35100", border: "none" }} onClick={handleLogin}>Login</button>
                                <Link to="/admin/register">
                                <button class="btn btn-primary btn-lg btn-block mt-3" style={{ width: "100%", backgroundColor: "black", border: "none" }} type="submit">Create a new Account</button>

                                </Link>
                                {error && <span style={{color:"red",fontWeight:"600",marginTop:"20px"}}>{msg}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin