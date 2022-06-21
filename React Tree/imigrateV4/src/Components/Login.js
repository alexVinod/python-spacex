import React, { useEffect } from 'react';
import user from './images/man.png';
import bg_globel from './images/bg-globel.webp';
import { Link } from "react-router-dom";
import tcs_logo from "./images/tcs-logo-tata-white-1x-dec2021.png";

export default function Login() {

    // const [details, setDetails] = useState({ username: "", password: "" });

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_globel}"); background-attachment: fixed; 
            background-repeat: no-repeat; background-size: 100% 100%;`);
    }, []);

    return (
        <React.Fragment>
            <img src={tcs_logo} alt="logout" className='float-start mx-5' style={{ "width": "100px" }} />
            <div className="container mt-3 col-sm-4 mt-5">
                <div className="card mt-5">
                    <div className="card-body ">
                        <form className='p-3'>
                            <h3 className='text-center text-secondary'>iMigrate</h3>
                            <hr />
                            <div className="row">
                                <div className='mx-auto d-block col-3 mb-4'>
                                    <img src={user} alt="user" className='shadow-dark small-icons box-circle' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Enter Username" name="username" />
                                </div>
                                <div className="col">
                                    <input type="password" className="form-control" placeholder="Enter Password" name="password" />
                                </div>
                            </div>

                            <div className="d-grid gap-2  mx-auto mt-3">
                                <Link to="/portal" className="btn btn-navy text-white">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
