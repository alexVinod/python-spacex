import React, { useEffect, useState } from 'react';
import user from './images/manb.png';
import bg_globel from './images/bg-globel.webp';
import { Link, Navigate } from "react-router-dom";
import tcs_logo from "./images/tcs-logo.png";
// import axios from "axios";

export default function Login() {

    const [userDetails, setUserDetails] = useState({ username: "", password: "" });

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_globel}"); background-attachment: fixed; 
            background-repeat: no-repeat; background-size: 100% 100%;`);

    }, []);

    const loginHandler = () => {
        // axios.post("http://localhost:3001/auth/login", { username: "demo", password: "demo" })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
        return <Navigate to="/portal" />
    }

    return (
        <React.Fragment>
            <img src={tcs_logo} alt="logout" className='float-start mx-5' style={{ "width": "100px" }} />
            <div className="container mt-3 col-sm-4 mt-5">
                <div className="card mt-5">
                    <div className="card-body ">
                        <form className='p-3'>
                            <h3 className='text-center text-secondary'><em className='font-fam-vijaya'>i</em>Migrate</h3>
                            <hr />
                            <div className="row">
                                <div className='mx-auto d-block col-3 mb-4'>
                                    <img src={user} alt="user" className='shadow-dark small-circle-icons ' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        name="username"
                                        onChange={(e) => setUserDetails(
                                            { ...userDetails, username: e.target.value })}
                                        value={userDetails.username} required="required" />
                                </div>
                                <div className="col">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        name="password"
                                        onChange={(e) => setUserDetails(
                                            { ...userDetails, password: e.target.value })}
                                        value={userDetails.password} required="required" />
                                </div>
                            </div>

                            <div className="d-grid gap-2  mx-auto mt-3">
                                <Link to="/portal" className="btn btn-navy text-white">Login</Link>
                                {/* <input type="submit" className="btn btn-navy text-white" value="Login" onSubmit={loginHandler} /> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
