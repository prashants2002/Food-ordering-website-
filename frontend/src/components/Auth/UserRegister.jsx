import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from "axios";

const UserRegister = () => {
    
    const history=useHistory();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(false);
    const [msg,setMsg]=useState("");
    
    const handleRegister=async()=>{
        if(!name || !email || !password){
            setMsg("All fields required");
            setError(true);
        }
        else{
            const user={name,email,password}
            const res = await axios.post("http://localhost:5000/server/user/register",user);
            if(res.data.message==="Registration Successful"){
                setError(false);
                localStorage.setItem("user",JSON.stringify(res.data.user));
                history.push('/');
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
                                <h3 class="mb-5">USER REGISTER</h3>
                                <div class="form-outline mb-4">
                                    <input type="text" class="form-control form-control-lg" placeholder='Name' autoComplete='off' onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="email" class="form-control form-control-lg" placeholder='Email' autoComplete='off' onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="password" class="form-control form-control-lg" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <button class="btn btn-primary btn-lg btn-block" style={{ width: "100%", backgroundColor: "#d35100", border: "none" }} onClick={handleRegister}>Register</button>
                                <Link to="/login">
                                <button class="/registerbtn btn-primary btn-lg btn-block mt-3" style={{ width: "100%", backgroundColor: "black", border: "none" }} type="submit">Login Here</button>
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

export default UserRegister