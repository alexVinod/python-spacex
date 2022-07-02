import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import { Link } from "react-router-dom";
import axios from "axios";
import bg_brick from './images/background.png';
// import bg_analyze_icon from './images/analyze.jpeg';
import cogl_icon from "./images/settings-l.png";
import cogr_icon from "./images/settings-r.png";
import help_icon from "./images/help.png";
import { ToastContainer, toast } from "react-toastify";


export default function Analyze() {

    const [configDetails, setConfigDetails] = useState({
        cfPlatform: "IBM",
        cfEndPoint: "https://cloud.ibm.com",
        organisation: "ramki.veda@gmail.com",
        space: "dev",
        cfAPIKeys: "N/A",
        application: "spring-music",
        services: "N/A",
        database: "N/A",
        techStack: "Python",
        sourceCodeRepo: "https://github.com/cloudfoundry-samples/spring-music",
        dropletsCount: "1",
        dropletsCapacity: "memory: 64MB, disk 1 GB",
        domainRoute: "Random",
        targetPlatform: "Google Kubernetes Engine (GKE)",
        projectId: "lexical-acolyte-352805",
        clusterName: "jenkins-ubuntu-containerd",
        namespace: "devops-tools",
        resourceGroup: "N/A"
    });
    const [details, setDetails] = useState({ endpoint: "", orgname: "", space: "", username: "", password: "" });
    const [cloudFoundary, setCloudFoundary] = useState({ cloudDetails: [] });

    const [modelUI, setModelUI] = useState({ condModel: "Google Kubernetes Engine (GKE)" });

    const [gkeDetails, setGkeDetails] = useState({ projectId: "lexical-acolyte-352805", region: "US-East", cluster: "jenkins-ubuntu-containerd", namespace: "devops-tools", jsonval: "" });
    const [kfDetails, setKfDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [azureDetails, setAzureDetails] = useState({ resourceGroup: "", region: "", cluster: "", namespace: "" });
    const [awsDetails, setAwsDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [openShiftDetails, setOpenShiftDetails] = useState({ projectId: "", application: "", region: "", cluster: "", namespace: "" });

    // const kubePlatform = {
    //     "gke": `Google Kubernetes Engine (GKE)`,
    //     "kf": `Kf`,
    //     "azure": `Azure Kubernetes Service (Azure k8s)`,
    //     "aws": `AWS EKS (AWS K8s)`,
    //     "open shift": `Open Shift`
    // }

    const kubeCustomRef = useRef(null);
    const [gkeErrorStatus, setGkeErrorStatus] = useState({
        projectIdExists: false,
        projectIdEmpty: false
    });
    const [gkeErrorMsg, setGkeErrorMsg] = useState({
        projectIdExists: "The ProjectID is already taken",
        projectIdEmpty: "The ProjectID must file"
    });

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
        const comboValue = document.getElementById("kubeCustomSelect").value; // e.target.value;
        setModelUI({ condModel: comboValue });
    }

    const saveHandler = (e) => {
        let targetVal = document.getElementById("kubeCustomSelect").value; // kubeCustomRef.current.value;
        console.log(kubeCustomRef);

        try {
            if (targetVal !== "" &&
                gkeDetails.projectId !== "" &&
                gkeDetails.region !== "" &&
                gkeDetails.cluster !== "" &&
                gkeDetails.namespace !== "") {
                console.log("OK");
                console.log("GKE", targetVal, gkeDetails);

                setGkeErrorStatus({ projectIdEmpty: false });

                const data = {
                    environment: targetVal,
                    projectId: gkeDetails.projectId,
                    region: gkeDetails.region,
                    cluster: gkeDetails.cluster,
                    nameSpace: gkeDetails.namespace,
                    targetJson: gkeDetails.jsonval
                }
                console.log(targetVal);
                // Check ProjectID Exists/Not Exsits
                axios.get(`http://localhost:3001/projectExists/${targetVal}/${gkeDetails.projectId}`, data).then((response) => {
                    console.log(response.data, response.data.length);
                    if (response.data.length > 0) {
                        setGkeErrorStatus({ projectIdExists: true });
                    } else {
                        setGkeErrorStatus({ projectIdExists: false });
                        // POST REQUEST
                        const data = {
                            environment: targetVal,
                            projectId: gkeDetails.projectId,
                            resourceGroup: "",
                            application: "",
                            region: gkeDetails.region,
                            cluster: gkeDetails.cluster,
                            nameSpace: gkeDetails.namespace,
                            serviceKey: "",
                            targetJson: gkeDetails.jsonval,
                            endpoint: "",
                            orgName: "",
                            space: "",
                            username: "",
                            password: ""
                        }
                        axios.post("http://localhost:3001/createConfigs", data).then((response) => {
                            console.log("DATA SAVED");
                            toast.success('Data Saved Successful...');
                        }).catch(error => {
                            toast.error('There was an error, while saving..!', error);
                        });;
                    }
                }).catch(error => {
                    console.log(error);
                    toast.error("Data Not Saved, Please try again...!");
                });

            } else {
                console.log("Details Must Fill");
                setGkeErrorStatus({ projectIdEmpty: true });
            }
        } catch (err) {
            console.log(err);
        }
        // console.log("KF", kfDetails);
        // console.log("Azure", azureDetails);
        // console.log("AWS", awsDetails);
        // console.log("Open Shift", openShiftDetails);
    }

    const saveAnalyzeHandler = () => {
        try {
            console.log(configDetails);

            if (configDetails.cfPlatform !== "" &&
                configDetails.organisation !== "" &&
                configDetails.space !== "" &&
                configDetails.cfAPIKeys !== "" &&
                configDetails.application !== "" &&
                configDetails.services !== "" &&
                configDetails.database !== "" &&
                configDetails.techStack !== "" &&
                configDetails.sourceCodeRepo !== "" &&
                configDetails.dropletsCount !== "" &&
                configDetails.dropletsCapacity !== "" &&
                configDetails.targetPlatform !== "" &&
                configDetails.projectId !== "" &&
                configDetails.resourceGroup !== "") {
                // const data = configDetails;
                axios.post("http://localhost:3001/createAnalyze", configDetails).then((response) => {
                    console.log("DATA SAVED");
                    toast.success("Successfully Created.");
                }).catch(error => {
                    console.log(error);
                    toast.error("Data Not Saved, Please try again...!");
                });
            } else {
                toast.error("All fields must fill, please check and try again...!");
            }

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
                    <div className='row'>
                        <div className='col-6'>
                            <h3 className='text-primary mt-1'> Analyze </h3>
                        </div>
                        <div className='col-6'>
                            <Link to="/help" className='float-end'>
                                <img src={help_icon} alt="help" className="xs-icon mt-3 box-shadow-dark" title='Help Info' />
                            </Link>
                        </div>
                        <hr className='text-primary' />

                    </div>
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
                                <td>b. Provide your Cloud Foundry End point</td>
                                <td>
                                    <input type="text"
                                        className='mx-1 form-control'
                                        onChange={(e) => setConfigDetails(
                                            { ...configDetails, cfEndPoint: e.target.value })}
                                        value={configDetails.cfEndPoint} />
                                </td>
                            </tr>
                            <tr>
                                <td>c. Know your Organisation</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, organisation: e.target.defaultValue })}
                                    value={configDetails.organisation} /></td>
                            </tr>
                            <tr>
                                <td>d. Know your Space</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, space: e.target.value })}
                                    value={configDetails.space} /></td>
                            </tr>
                            <tr>
                                <td>e. Know your credentials for CF Platform (API Keys)</td>
                                <td>
                                    <input type="text"
                                        className='mx-1 form-control'
                                        onChange={(e) => setConfigDetails(
                                            { ...configDetails, cfAPIKeys: e.target.value })}
                                        value={configDetails.cfAPIKeys} /></td>
                            </tr>
                            <tr>
                                <td>f. Know your applications</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, application: e.target.value })}
                                    value={configDetails.application} /></td>
                            </tr>
                            <tr>
                                <td>g. Know your Services</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, services: e.target.value })}
                                    value={configDetails.services} /></td>
                            </tr>
                            <tr>
                                <td>h. Know your Database</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, database: e.target.value })}
                                    value={configDetails.database} /></td>
                            </tr>
                            <tr>
                                <td>i. Know your Tech Stack (based on the buildpack used in manifest)</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, techStack: e.target.value })}
                                    value={configDetails.techStack} /></td>
                            </tr>
                            <tr>
                                <td>j. Know your Source Code Repository</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, sourceCodeRepo: e.target.value })}
                                    value={configDetails.sourceCodeRepo} /></td>
                            </tr>
                            <tr>
                                <td>k. Know your Droplets replica count</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, dropletsCount: e.target.value })}
                                    value={configDetails.dropletsCount} /></td>
                            </tr>
                            <tr>
                                <td>l. Know your droplet capacity</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, dropletsCapacity: e.target.value })}
                                    value={configDetails.dropletsCapacity} /></td>
                            </tr>
                            <tr>
                                <td>m. Know your Domain/Routes</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, domainRoute: e.target.value })}
                                    value={configDetails.domainRoute} /></td>
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
                                <td>c. Know your Cluster Name</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, clusterName: e.target.value })}
                                    value={configDetails.clusterName} /></td>
                            </tr>
                            <tr>
                                <td>d. Know your Namespace</td>
                                <td><input type="text"
                                    className='mx-1 form-control'
                                    onChange={(e) => setConfigDetails(
                                        { ...configDetails, namespace: e.target.value })}
                                    value={configDetails.namespace} /></td>
                            </tr>
                            <tr>
                                <td>e. Know your Resource Group for Azure</td>
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
                                <select className="custom-select" id="kubeCustomSelect" ref={kubeCustomRef} onChange={(e) => onSelectKubeFoundary(e)}>
                                    <option>Google Kubernetes Engine (GKE)</option>
                                    <option>Kf</option>
                                    <option>Azure Kubernetes Service (Azure k8s)</option>
                                    <option>AWS EKS (AWS K8s)</option>
                                    <option>Open Shift</option>

                                    {/* <option value="gke">Google Kubernetes Engine (GKE)</option>
                                    <option value="kf">Kf</option>
                                    <option value="azure">Azure Kubernetes Service (Azure k8s)</option>
                                    <option value="aws">AWS EKS (AWS K8s)</option>
                                    <option value="open shift">Open Shift</option> */}
                                </select>
                                <button type="button" className="btn-close text-light" data-bs-dismiss="modal"></button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body" id="kub-foundry-model" >
                                {(modelUI.condModel === "Google Kubernetes Engine (GKE)") ? (
                                    <div id="gkeForm">
                                        GKE FORM
                                        <input type="text" className="form-control" placeholder="Enter ProjectID"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, projectId: e.target.value })}
                                            value={gkeDetails.projectId} />
                                        <span className='text-danger' style={{ "fontSize": "13px" }}>
                                            {(gkeErrorStatus.projectIdExists === true) ? (`${gkeErrorMsg.projectIdExists}`) :
                                                (gkeErrorStatus.projectIdEmpty === true) ? (`${gkeErrorMsg.projectIdEmpty}`) : ("")}
                                        </span>
                                        <input type="text" className="form-control mt-3" placeholder="Enter Region"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, region: e.target.value })}
                                            value={gkeDetails.region} />

                                        <input type="text" className="form-control mt-3" placeholder="Enter Cluster"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, cluster: e.target.value })}
                                            value={gkeDetails.cluster} />

                                        <input type="text" className="form-control mt-3" placeholder="Enter Namespace"
                                            onChange={(e) => setGkeDetails({ ...gkeDetails, namespace: e.target.value })}
                                            value={gkeDetails.namespace} />

                                        <div className="mt-3">
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
                                ) : (modelUI.condModel === "Kf") ? (
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
                                ) : (modelUI.condModel === "Azure Kubernetes Service (Azure k8s)") ? (
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
                                ) : (modelUI.condModel === "AWS EKS (AWS K8s)") ? (
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
