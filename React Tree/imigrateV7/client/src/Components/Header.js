import '../App.css';
import { Link } from "react-router-dom";
import logout_icon from "./images/logout.png";
import cog_icon from "./images/cog.png";
import tcs_logo from "./images/tcs-logo.png";
import home_icon from "./images/home.png";
import React from 'react';

const Header = ({ settingsCog }) => {
    return (
        <React.Fragment>
            <div className="card bg-dark text-white" style={{ "marginTop": "-5px", "borderRadius": "none", "width": "100%" }}>
                <div className="card-body">
                    <div>
                        <img src={tcs_logo} alt="logout" className='float-start mt-3 mx-2' style={{ "width": "100px" }} />
                    </div>
                    <h1 className='text-center text-honey '><em className='font-fam-vijaya'>i</em>Migrate</h1>
                    <div>
                        <p className='float-end mt-mins-10 mx-2'>Welcome, Demo</p>
                        <div className='float-end mt-mins-20 mx-2'>
                            <Link to="/portal" className='  mt-1' title='Home' >
                                <img src={home_icon} alt="logout" className='xs-icon mx-2' />
                            </Link>
                            {(settingsCog) && (
                                <Link to="#" className='  mt-1' title='Configuration' data-bs-toggle="modal" data-bs-target="#settingsMail" >
                                    <img src={cog_icon} alt="logout" className='xs-icon mx-2' />
                                </Link>
                            )}
                            <Link to="/" className=' mt-1' title='Logout' >
                                <img src={logout_icon} alt="logout" className='xs-icon mx-2' />
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
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                defaultValue="rama.v@tcs.com"
                                id="confi-email" />
                            <span className="text-danger mb-3" id="configEmailErrorMsg" style={{ "fontSize": "12px" }}></span>
                            <span className="text-danger fw-bold float-end" style={{ "marginRight": "-10px", "zIndex": "2", "marginTop": "-45px" }}>*</span>
                            <input
                                type="url"
                                className="form-control mt-3"
                                placeholder="Enter Jenkins URL"
                                defaultValue="http://34.139.226.110:32000/job/Gradle-builder/buildWithParameters?token=token&TEST=fromgit&EMAIL=rama.v@tcs.com&Repository_URL=https://github.com/cloudfoundry-samples/spring-music"
                                id='jenkins-url' />
                            <span className="text-danger mb-3" id="configJenkinsErrorMsg" style={{ "fontSize": "12px" }}></span>
                            <span className="text-danger fw-bold float-end" style={{ "marginRight": "-10px", "zIndex": "2", "marginTop": "-45px" }}>*</span>
                            {/* http://34.75.95.232:32000/job/Gradle-builder/buildWithParameters?token=token&TEST=fromgit&EMAIL=rama.v@tcs.com&Repository_URL=https://github.com/ */}

                            {/* http://34.75.95.232:32000/job/Gradle-builder/buildWithParameters?token=token&TEST=fromgit */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header