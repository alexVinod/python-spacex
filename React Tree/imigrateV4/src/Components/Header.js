import '../App.css';
import { Link } from "react-router-dom";
import logout_icon from "./images/logout.png";
import cog_icon from "./images/cog.png";
import tcs_logo from "./images/tcs-logo-tata-white-1x-dec2021.png";
import React from 'react';

const Header = () => {
    return (
        <React.Fragment>
            <div className="card bg-dark text-white border">
                <div className="card-body">
                    <div>
                        <img src={tcs_logo} alt="logout" className='float-start mt-3 mx-2' style={{ "width": "100px" }} />
                    </div>
                    <h1 className='text-center text-honey mx-auto'>iMigrate</h1>
                    <div>
                        <p className='float-end mt-mins-10 mx-2'>Welcome, Demo</p>
                        <div className='float-end mt-mins-20 mx-2'>
                            <Link to="#" className='  mt-1' title='Configuration' data-bs-toggle="modal" data-bs-target="#settingsMail" >
                                <img src={cog_icon} alt="logout" className='xs-icon mx-2' />
                            </Link>
                            <Link to="/" className=' mt-1' title='Logout' >
                                <img src={logout_icon} alt="logout" className='xs-icon' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- SettingsMail Modal --> */}
            <div className="modal border" id="settingsMail">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">

                        {/* <!-- SettingsMail Modal Header --> */}
                        <div className="modal-header bg-dark text-light">
                            <h6 className="modal-title">Configuration</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- SettingsMail Modal body --> */}
                        <div className="modal-body">
                            <input type="email" className="form-control mb-3" placeholder="Enter Email" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header