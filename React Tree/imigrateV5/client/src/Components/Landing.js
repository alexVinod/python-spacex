import React, { useEffect } from 'react';
import Header from './Header';
import { Link } from "react-router-dom";
import double_arrow_icon from "./images/d-circle2.png";
import bg_brick from './images/background.png';

export default function Landing() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    return (
        <React.Fragment>
            <Header />

            <div className="container mt-5 d-flex align-items-center justify-content-center">
                <div className="card col-6 box-card border-0 bg-transparent ">
                    <div className="card-body">
                        <div className="row position-relative">
                            <div className="col-sm-6 p-1 ">
                                <Link to="/analyze" className='text-nodeco'>
                                    <div className="bg-warning text-light  box-item d-flex align-items-center justify-content-center box-tlr cursor-pointer">
                                        <h4 className="box-tl-align">Analyze</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6 p-1 ">
                                <Link to="/fitment" className="text-nodeco">
                                    <div className="bg-success text-light box-item d-flex align-items-center justify-content-center box-trr cursor-pointer">
                                        <h4 className="box-tr-align">Fitment Test</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6 p-1">
                                <Link to="/evaluate" className='text-nodeco'>
                                    <div className="bg-info text-light box-item d-flex align-items-center justify-content-center box-blr cursor-pointer">
                                        <h4 className="box-bl-align">Evaluate</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6 p-1">
                                <Link to="/imigrate" className='text-nodeco' >
                                    <div className="bg-primary text-light box-item d-flex align-items-center justify-content-center box-brr cursor-pointer">
                                        <h4 className="box-br-align">Migrate</h4>
                                    </div>
                                </Link>
                            </div>
                            <img src={double_arrow_icon} alt="double_icon" className="spin-box-r darrow-icon position-absolute top-50 start-50 translate-middle" style={{ "zIndex": "5" }} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

