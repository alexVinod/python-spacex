import React, { useEffect } from 'react';
import Header from './Header';
import { Link } from "react-router-dom";
import double_arrow_icon from "./images/d-circle2.png";
import bg_brick from './images/network-4851079_960_720.jpg';
import analyze_icon from './images/analize-light.png';
import fitment_icon from "./images/labtest2.png";
import cld_migrate_icon from './images/cld-migrate.png';
import evaluate_icon from './images/test-eval.png';

export default function Landing() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: 100%; background-color: rgba(0,0,0,0.4)`);
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
                                        <h4 className="box-tl-align mt-5">Assess</h4>
                                        <img src={analyze_icon} alt="analyze_image" className='small-icon mt-mins-20 mb-3 ml-mins-60' />
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6 p-1 ">
                                <Link to="/fitment" className="text-nodeco">
                                    <div className="bg-success text-light box-item d-flex align-items-center justify-content-center box-trr cursor-pointer">
                                        <h4 className="box-tr-align mt-5 ml-mins-50">Fitment Test</h4>
                                        <img src={fitment_icon} alt="fitment" className='small-icon mt-mins-10 mb-3 ml-mins-120' />
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6 p-1">
                                <Link to="/evaluate" className='text-nodeco'>
                                    <div className="bg-danger text-light box-item d-flex align-items-center justify-content-center box-blr cursor-pointer">
                                        <h4 className="box-bl-align mt-5 mr-mins-60">Evaluate</h4>
                                        <img src={evaluate_icon} alt="evaluate" className='small-icon mt-mins-10 mb-3 ml-mins-10' />
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-6 p-1">
                                <Link to="/imigrate" className='text-nodeco' >
                                    <div className="bg-primary text-light box-item d-flex align-items-center justify-content-center box-brr cursor-pointer">
                                        <h4 className="box-br-align mt-5 ml-mins-60">Migrate</h4>
                                        <img src={cld_migrate_icon} alt="cloud" className='small-icon mt-mins-10 mb-3 ml-mins-90' />
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

