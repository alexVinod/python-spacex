import React, { useEffect, useState } from 'react';
import Header from './Header';
import bg_brick from './images/background.png';
import Constants from "./Constants.json";

export default function FitmentTest() {

    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    const popUpHandler = () => {
        setTimeout(() => {
            setShowModel(true);
        }, 8000);
    }

    const popCloseHandler = () => {
        setShowModel(false);
    }

    return (
        <React.Fragment>
            <Header />
            <div className='container'>
                <h3 className='text-primary mt-1'> Fitment Test <hr /></h3>
                <table className='mx-5'>
                    <tbody>
                        <tr>
                            <td className='pt-4'>Check your PCF application readiness for Google Kf</td>
                            <td className='pt-4'><input type="button" className='btn btn-primary mx-4' value="Submit" title={Constants.fitmentTest.gkf_title} data-bs-toggle="modal" data-bs-target="#gkfModel" onClick={popUpHandler} /></td>
                        </tr>
                        <tr>
                            <td className='pt-4'>Check your PCF application readiness for GKE</td>
                            <td className='pt-4'><input type="button" className='btn btn-primary mx-4' value="Submit" title={Constants.fitmentTest.gke_title} data-bs-toggle="modal" data-bs-target="#gkfModel" onClick={popUpHandler} /></td>
                        </tr>
                        <tr>
                            <td className='pt-4'>Check your PCF application readiness for AKS</td>
                            <td className='pt-4'><input type="button" className='btn btn-primary mx-4' value="Submit" title={Constants.fitmentTest.aks_title} data-bs-toggle="modal" data-bs-target="#gkfModel" onClick={popUpHandler} /></td>
                        </tr>
                        <tr>
                            <td className='pt-4'>Check your PCF application readiness for EKS</td>
                            <td className='pt-4'><input type="button" className='btn btn-primary mx-4' value="Submit" title={Constants.fitmentTest.eks_title} data-bs-toggle="modal" data-bs-target="#gkfModel" onClick={popUpHandler} /></td>
                        </tr>
                        <tr>
                            <td className='pt-4'>Check your PCF application readiness for Open Shift</td>
                            <td className='pt-4'><input type="button" className='btn btn-primary mx-4' value="Submit" title={Constants.fitmentTest.openShiftTitle} data-bs-toggle="modal" data-bs-target="#gkfModel" onClick={popUpHandler} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                {/* <!-- GKF The Modal --> */}
                <div className="modal fade " id="gkfModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className={(showModel === false) ? ("modal-header bg-pan-yellow") : ("modal-header")} style={{ "borderBottom": "none" }}>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={popCloseHandler}>.</button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className={(showModel === false) ? ("modal-body bg-pan-yellow") : ("modal-body")} >
                                {(showModel === false) ? (
                                    <div style={{ "overflowX": "hidden" }}>
                                        <h2 className='fw-bold pan-animate'>Transformers in action to check fitness of your application for migration...</h2>
                                        <div id="cooking" >
                                            <div className="bubble"></div>
                                            <div className="bubble"></div>
                                            <div className="bubble"></div>
                                            <div className="bubble"></div>
                                            <div className="bubble"></div>
                                            <div id="area">
                                                <div id="sides">
                                                    <div id="pan"></div>
                                                    <div id="handle"></div>
                                                </div>
                                                <div id="pancake">
                                                    <div id="pastry"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Application Name:</strong></td>
                                                    <td>Spring-Music</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Technology Stack:</strong></td>
                                                    <td> Java</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Builder:</strong></td>
                                                    <td> Gradle</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Memory:</strong></td>
                                                    <td> 64MB</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>CPU:</strong></td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>InstanceCount:</strong></td>
                                                    <td> 1</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Route:</strong></td>
                                                    <td> Random</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Service:</strong></td>
                                                    <td><span className='text-danger'>No</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Database:</strong></td>
                                                    <td><span className='text-danger'>No</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Kubernetes-deployment.yaml:</strong></td>
                                                    <td><span className='text-danger'>No</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Kubernetes-Service.yaml:</strong></td>
                                                    <td><span className='text-danger'>No</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>JenkinsFile:</strong></td>
                                                    <td><span className='text-danger'>No</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>ManifestAvalibility:</strong></td>
                                                    <td><span className='text-success'>Yes</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>DockerFileAvalibility:</strong></td>
                                                    <td><span className='text-danger'>No</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </React.Fragment>
                                )}
                            </div>
                            {(showModel === true) ? (
                                <div className="modal-footer">
                                    <p className='fw-bold text-secondary'>Above noted unavailable configuration files will be auto-generated by iMigrate</p>
                                </div>
                            ) : ("")}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
