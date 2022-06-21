import { useState } from "react";
import CustomDropdown from "./UI/CustomDropdown";
import { Link } from "react-router-dom";
import cog_icon from "./images/settings-r.png";

const Right = () => {

    const [targetPlatform, setTargetPlatform] = useState({ platform: "gke" });
    const [gkeDetails, setGkeDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [kfDetails, setKfDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [azureDetails, setAzureDetails] = useState({ resourceGroup: "", region: "", cluster: "", namespace: "" });
    const [awsDetails, setAwsDetails] = useState({ projectId: "", region: "", cluster: "", namespace: "", jsonval: [] });
    const [openShiftDetails, setOpenShiftDetails] = useState({ projectId: "", application: "", region: "", cluster: "", namespace: "" });

    const [modelUI, setModelUI] = useState({ condModel: "gke" });

    const saveHandler = (e) => {
        console.log("GKE", gkeDetails);
        console.log("KF", kfDetails);
        console.log("Azure", azureDetails);
        console.log("AWS", awsDetails);
        console.log("Open Shift", openShiftDetails);
    }

    const onSelectKubeFoundary = (e) => {
        const comboValue = e.target.value;
        setModelUI({ condModel: comboValue });
        console.log(e.target.value);
    }

    const targetPlatformHandler = (e) => {
        const platformValue = e.target.value;
        if (platformValue === "Google Kubernetes Engine (GKE)") {
            setTargetPlatform({ platform: "gke" });
        } else if (platformValue === "Kf") {
            setTargetPlatform({ platform: "kf" });
        } else if (platformValue === "Azure Kubernetes Service (Azure k8s)") {
            setTargetPlatform({ platform: "azure" });
        } else if (platformValue === "AWS EKS (AWS K8s)") {
            setTargetPlatform({ platform: "aws" });
        } else if (platformValue === "Open Shift") {
            setTargetPlatform({ platform: "open_shift" });
        }

        console.log("Handler", platformValue);
    }

    return (
        <div className="left">
            <div className="row">
                <div className="col-sm-3">
                    <Link to="/" className='float-start mt-mins-10' title='Kubernetes' data-bs-toggle="modal" data-bs-target="#kub-foundry">
                        <img src={cog_icon} alt="logout" className='xs-icon box-shadow-dark spin-box-r' />
                    </Link>
                </div>
                <div className="col-sm-9">
                    <h5 className="float-end mt-mins-10 text-chaco text-shadow-black">Kubernetes</h5>
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

            <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Target Platform</h6>
                <select className="dropdown-item small fw-bold px-2" id="target-platform" onChange={(e) => targetPlatformHandler(e)}>
                    <option>Google Kubernetes Engine (GKE)</option>
                    <option>Kf</option>
                    <option>Azure Kubernetes Service (Azure k8s)</option>
                    <option>AWS EKS (AWS K8s)</option>
                    <option>Open Shift</option>
                </select>
            </div>
            {/* <CustomDropdown
                changeHandler={targetPlatformHandler}
                id="target-platform"
                name='Select Target Platform'
                items={['Google Kubernetes Engine (GKE)', 'Kf', 'Azure Kubernetes Service (Azure k8s)', 'AWS EKS (AWS K8s)', 'Open Shift']}
                values={['gke', 'kf', 'azure', 'aws', 'open_shift']}
            /> */}
            {(targetPlatform.platform === "gke") ? (
                <CustomDropdown
                    name='Select Project'
                    items={['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']}
                />
            ) : (targetPlatform.platform === "kf") ? (
                <CustomDropdown
                    name='Select Project'
                    items={['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']}
                />
            ) : (targetPlatform.platform === "azure") ? (
                <CustomDropdown
                    name='Select Resource Group'
                    items={['Resource Group 1', 'Resource Group 2', 'Resource Group 3', 'Resource Group 4', 'Resource Group 5']}
                />

            ) : (targetPlatform.platform === "aws") ? (
                <CustomDropdown
                    name='Select Project'
                    items={['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']}
                />
            ) : (
                <CustomDropdown
                    name='Select Application'
                    items={['Application 1', 'Application 2', 'Application 3', 'Application 4', 'Application 5']}
                />
            )}

            <CustomDropdown
                name='Select Cluster'
                items={['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5']}
            />

            <CustomDropdown
                name='Select Namespace'
                items={['Namespace 1', 'Namespace 2', 'Namespace 3', 'Namespace 4', 'Namespace 5']}
            />
        </div>
    )
}

export default Right