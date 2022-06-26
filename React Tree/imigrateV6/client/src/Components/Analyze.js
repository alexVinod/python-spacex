import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from "react-router-dom";
import axios from "axios";
import bg_brick from './images/background.png';
// import bg_analyze_icon from './images/analyze.jpeg';
import cogl_icon from "./images/settings-l.png";
import cogr_icon from "./images/settings-r.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Analyze() {

    const [configDetails, setConfigDetails] = useState({
        cfPlatform: "",
        organisation: "",
        space: "",
        cfAPIKeys: "",
        application: "",
        services: "",
        database: "",
        techStack: "",
        sourceCodeRepo: "",
        dropletsCount: "",
        dropletsCapacity: "",
        targetPlatform: "",
        projectId: "",
        resourceGroup: ""
    });
    const [details, setDetails] = useState({ endpoint: "", orgname: "", space: "", username: "", password: "" });
    const [cloudFoundary, setCloudFoundary] = useState({ cloudDetails: [] });

    const [modelUI, setModelUI] = useState({ condModel: "gke" });

    const [gkeDetails, setGkeDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [kfDetails, setKfDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [azureDetails, setAzureDetails] = useState({ resourceGroup: "", region: "", cluster: "", namespace: "" });
    const [awsDetails, setAwsDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [openShiftDetails, setOpenShiftDetails] = useState({ projectId: "", application: "", region: "", cluster: "", namespace: "" });

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    const addHandler = (e) => {
        const cloudDetails = [details, ...cloudFoundary.cloudDetails];
        setCloudFoundary({ cloudDetails });
        console.log(details, "-------", cloudDetails, "********", cloudFoundary.cloudDetails);
        console.log(cloudFoundary.cloudDetails.length);
    }

    const onSelectKubeFoundary = (e) => {
        const comboValue = e.target.value;
        setModelUI({ condModel: comboValue });
        console.log(e.target.value);
    }

    const saveHandler = (e) => {
        console.log("GKE", gkeDetails);
        console.log("KF", kfDetails);
        console.log("Azure", azureDetails);
        console.log("AWS", awsDetails);
        console.log("Open Shift", openShiftDetails);
    }

    const saveAnalyzeHandler = () => {
        try {
            console.log(configDetails);
            // const data = configDetails;
            axios.post("http://localhost:3001/createAnalyze", configDetails).then((response) => {
                console.log("DATA SAVED");
                toast.success("Successfully Created.");
            }).catch(error => {
                console.log(error);
                toast.error("Data Not Saved, Please try again...!");
            });

        } catch (err) {
            console.log(err);
            toast.error("Data Not Saved, Please try again...!");
        }
    }

    return (
        <React.Fragment>
            <Header />
            <ToastContainer />
            <div className='container ' >
                <form method='POST'>
                    <h3 className='text-primary mt-1'> Analyze <hr /></h3>
                    <ol>
                        <li>
                            <div className='row col-4'>
                                <div className='col-6'>
                                    Know your Source
                                </div>
                                <div className='col-1'>
                                    <Link to="#" className='float-end' title='Cloud Foundry' data-bs-toggle="modal" data-bs-target="#cloud-foundry">
                                        <img src={cogl_icon} alt="logout" className='xs-icon box-shadow-dark spin-box-l' />
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ol>
                    <table className='mx-5 '>
                        <tbody>
                            <tr>
                                <td>a. Cloud foundry platform - IBM/Vmware/Pivotal</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, cfPlatform: e.target.value })}
                                    value={configDetails.cfPlatform} /></td>
                            </tr>
                            <tr>
                                <td>b. Know your Organisation</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, organisation: e.target.value })}
                                    value={configDetails.organisation} /></td>
                            </tr>
                            <tr>
                                <td>c. Know your Space</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, space: e.target.value })}
                                    value={configDetails.space} /></td>
                            </tr>
                            <tr>
                                <td>d. Know your credentials for CF Platform (API Keys)</td>
                                <td>
                                    <input type="text"
                                        className='mx-1 form-control'
                                        onChange={(e) => setConfigDetails(
                                            { ...configDetails, cfAPIKeys: e.target.value })}
                                        value={configDetails.cfAPIKeys} /></td>
                            </tr>
                            <tr>
                                <td>e. Know your applications</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, application: e.target.value })}
                                    value={configDetails.application} /></td>
                            </tr>
                            <tr>
                                <td>f. Know your Services</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, services: e.target.value })}
                                    value={configDetails.services} /></td>
                            </tr>
                            <tr>
                                <td>g. Know your Database</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, database: e.target.value })}
                                    value={configDetails.database} /></td>
                            </tr>
                            <tr>
                                <td>h. Know your Tech Stack (based on the buildpack used in manifest)</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, techStack: e.target.value })}
                                    value={configDetails.techStack} /></td>
                            </tr>
                            <tr>
                                <td>i. Know your Source Code Repository</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, sourceCodeRepo: e.target.value })}
                                    value={configDetails.sourceCodeRepo} /></td>
                            </tr>
                            <tr>
                                <td>j. Know your Droplets replica count</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, dropletsCount: e.target.value })}
                                    value={configDetails.dropletsCount} /></td>
                            </tr>
                            <tr>
                                <td>k. Know your droplet capacity</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, dropletsCapacity: e.target.value })}
                                    value={configDetails.dropletsCapacity} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <ol start="2" className='mt-4'>
                        <li>
                            <div className='row col-4'>
                                <div className='col-5'>
                                    Know your Target
                                </div>
                                <div className='col-1'>
                                    <Link to="/" className='float-start ' title='Kubernetes' data-bs-toggle="modal" data-bs-target="#kub-foundry">
                                        <img src={cogr_icon} alt="kubernetesWheel" className='xs-icon box-shadow-dark spin-box-r' />
                                    </Link>
                                </div>
                            </div>

                        </li>
                    </ol>
                    <table className='mx-5'>
                        <tbody>
                            <tr>
                                <td>a. Identify your Target Kubernetes platform <br />(Google Kf, Google Kubernetes Engine, Azure Kubernetes Services, <br />AWS EKS, Open Shift)</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, targetPlatform: e.target.value })}
                                    value={configDetails.targetPlatform} /></td>
                            </tr>
                            <tr>
                                <td>b. Know your Project ID for Google (both Kubernetes Engine and Kf)</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, projectId: e.target.value })}
                                    value={configDetails.projectId} /></td>
                            </tr>
                            <tr>
                                <td>c. Know your Resource Group for Azure</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, resourceGroup: e.target.value })}
                                    value={configDetails.resourceGroup} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <input type="button"
                        className='btn btn-primary mt-5 mb-5 text offset-4 '
                        onClick={saveAnalyzeHandler}
                        value="Submit" />
                </form>


                {/* <!--Cloud Foundary The Modal --> */}
                <div className="modal fade" id="cloud-foundry">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className="modal-header bg-dark text-light">
                                <h6 className="modal-title">Cloud Foundry</h6>
                                <button type="button" className="btn-close text-light" data-bs-dismiss="modal"></button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body">
                                <input type="text" className="form-control mb-3" placeholder="Enter Endpoint"
                                    onChange={(e) => setDetails({ ...details, endpoint: e.target.value })}
                                    value={details.endpoint} />

                                <input type="text" className="form-control mb-3" placeholder="Enter Organization Name"
                                    onChange={(e) => setDetails({ ...details, orgname: e.target.value })}
                                    value={details.orgname} />

                                <input type="text" className="form-control mb-3" placeholder="Enter Space"
                                    onChange={(e) => setDetails({ ...details, space: e.target.value })}
                                    value={details.space} />

                                <input type="text" className="form-control mb-3" placeholder="Enter Username"
                                    onChange={(e) => setDetails({ ...details, username: e.target.value })}
                                    value={details.username} />

                                <input type="password" className="form-control mb-3" placeholder="Enter Password"
                                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                    value={details.password} />

                                <div className="row gap-5 mx-auto mt-3">
                                    <input type="button" value="Test Connection" className="col-5 mx-2 btn btn-info text-light"
                                    />
                                    <input type="button" value="Save" className="col-5  btn btn-navy text-light"
                                        onClick={addHandler} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- The Modal --> */}
                <div className="modal fade" id="kub-foundry">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className="modal-header bg-dark text-light">
                                <select className="custom-select" onChange={(e) => onSelectKubeFoundary(e)}>
                                    <option value="gke">Google Kubernetes Engine (GKE)</option>
                                    <option value="kf">Kf</option>
                                    <option value="azure">Azure Kubernetes Service (Azure k8s)</option>
                                    <option value="aws">AWS EKS (AWS K8s)</option>
                                    <option value="open shift">Open Shift</option>
                                </select>
                                <button type="button" className="btn-close text-light" data-bs-dismiss="modal"></button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body" id="kub-foundry-model" >
                                {(modelUI.condModel === "gke") ? (
                                    <div id="gkeForm">
                                        GKE FORM
                                        <input type="text" className="form-control mb-3" placeholder="Enter ProjectID"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, projectId: e.target.value })}
                                            value={gkeDetails.projectId} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Region"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, region: e.target.value })}
                                            value={gkeDetails.region} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Cluster"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, cluster: e.target.value })}
                                            value={gkeDetails.cluster} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Namespace"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, namespace: e.target.value })}
                                            value={gkeDetails.namespace} />

                                        <div className="mb-3">
                                            <label htmlFor="json-file" className="form-label">JSON File :</label>
                                            <input className="form-control form-control-sm" id="json-file" type="file"
                                                accept="application/JSON" onChange={(e) => setGkeDetails({
                                                    ...gkeDetails,
                                                    jsonval: e.target.value
                                                })} value={gkeDetails.jsonval} />
                                        </div>
                                        <div className="d-grid gap-2  mx-auto mt-3">
                                            <input type="button" value="Save" className="btn btn-navy text-light"
                                                onClick={saveHandler} />
                                        </div>
                                    </div>
                                ) : (modelUI.condModel === "kf") ? (
                                    <div id="kfForm">
                                        KF FORM
                                        <input type="text" className="form-control mb-3" placeholder="Enter ProjectID"
                                            onChange={(e) => setKfDetails({ ...kfDetails, projectId: e.target.value })}
                                            value={kfDetails.projectId} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Region"
                                            onChange={(e) => setKfDetails({ ...kfDetails, region: e.target.value })}
                                            value={kfDetails.region} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Cluster"
                                            onChange={(e) => setKfDetails({ ...kfDetails, cluster: e.target.value })}
                                            value={kfDetails.cluster} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Namespace"
                                            onChange={(e) => setKfDetails({ ...kfDetails, namespace: e.target.value })}
                                            value={kfDetails.namespace} />

                                        <div className="mb-3">
                                            <label htmlFor="json-file" className="form-label">JSON File :</label>
                                            <input className="form-control form-control-sm" id="json-file" type="file"
                                                accept="application/JSON" onChange={(e) => setKfDetails({
                                                    ...kfDetails,
                                                    jsonval: e.target.value
                                                })} value={kfDetails.jsonval} />
                                        </div>
                                        <div className="d-grid gap-2  mx-auto mt-3">
                                            <input type="button" value="Save" className="btn btn-navy text-light"
                                                onClick={saveHandler} />
                                        </div>
                                    </div>
                                ) : (modelUI.condModel === "azure") ? (
                                    <div id="azureForm">
                                        AZURE FORM
                                        <input type="text" className="form-control mb-3" placeholder="Enter Resource Group"
                                            onChange={(e) => setAzureDetails({ ...azureDetails, resourceGroup: e.target.value })}
                                            value={azureDetails.resourceGroup} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Region"
                                            onChange={(e) => setAzureDetails({ ...azureDetails, region: e.target.value })}
                                            value={azureDetails.region} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Cluster"
                                            onChange={(e) => setAzureDetails({ ...azureDetails, cluster: e.target.value })}
                                            value={azureDetails.cluster} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Namespace"
                                            onChange={(e) => setAzureDetails({ ...azureDetails, namespace: e.target.value })}
                                            value={azureDetails.namespace} />

                                        <div className="d-grid gap-2  mx-auto mt-3">
                                            <input type="button" value="Save" className="btn btn-navy text-light"
                                                onClick={saveHandler} />
                                        </div>
                                    </div>
                                ) : (modelUI.condModel === "aws") ? (
                                    <div id="awsForm">
                                        AWS Form
                                        <input type="text" className="form-control mb-3" placeholder="Enter ProjectID"
                                            onChange={(e) => setAwsDetails({ ...awsDetails, projectId: e.target.value })}
                                            value={awsDetails.projectId} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Region"
                                            onChange={(e) => setAwsDetails({ ...awsDetails, region: e.target.value })}
                                            value={awsDetails.region} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Cluster"
                                            onChange={(e) => setAwsDetails({ ...awsDetails, cluster: e.target.value })}
                                            value={awsDetails.cluster} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Namespace"
                                            onChange={(e) => setAwsDetails({ ...awsDetails, namespace: e.target.value })}
                                            value={awsDetails.namespace} />

                                        <div className="mb-3">
                                            <label htmlFor="json-file" className="form-label">JSON File :</label>
                                            <input className="form-control form-control-sm" id="json-file" type="file"
                                                accept="application/JSON" onChange={(e) => setAwsDetails({
                                                    ...awsDetails,
                                                    jsonval: e.target.value
                                                })} value={awsDetails.jsonval} />
                                        </div>
                                        <div className="d-grid gap-2  mx-auto mt-3">
                                            <input type="button" value="Save" className="btn btn-navy text-light"
                                                onClick={saveHandler} />
                                        </div>
                                    </div>
                                ) : (
                                    <div id="openShiftForm">
                                        Open Shift Form
                                        <input type="text" className="form-control mb-3" placeholder="Enter ProjectID"
                                            onChange={(e) => setOpenShiftDetails({ ...openShiftDetails, projectId: e.target.value })}
                                            value={openShiftDetails.projectId} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Application"
                                            onChange={(e) => setOpenShiftDetails({ ...openShiftDetails, application: e.target.value })}
                                            value={openShiftDetails.application} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Region"
                                            onChange={(e) => setOpenShiftDetails({ ...openShiftDetails, region: e.target.value })}
                                            value={openShiftDetails.region} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Cluster"
                                            onChange={(e) => setOpenShiftDetails({ ...openShiftDetails, cluster: e.target.value })}
                                            value={openShiftDetails.cluster} />

                                        <input type="text" className="form-control mb-3" placeholder="Enter Namespace"
                                            onChange={(e) => setOpenShiftDetails({ ...openShiftDetails, namespace: e.target.value })}
                                            value={openShiftDetails.namespace} />

                                        <div className="d-grid gap-2  mx-auto mt-3">
                                            <input type="button" value="Save" className="btn btn-navy text-light"
                                                onClick={saveHandler} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
