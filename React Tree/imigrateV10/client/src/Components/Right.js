import { useState, useEffect, useRef } from "react";
import kube_icon from "./images/kube.png";
import cnxnParams from "../connectionParams.json";
import axios from "axios";

const Right = () => {

    const hostname = cnxnParams.HOSTCONNECTION.hostname;

    const [targetPlatform, setTargetPlatform] = useState({ platform: "gke" });
    const [envirn, setEnvirn] = useState("Google Kubernetes Engine (GKE)");

    const [projectList, setProjectList] = useState([]);
    const [resourceGroupList, setResourceGroupList] = useState([]);
    const [appList, setAppList] = useState([]);
    const [clusterList, setClusterList] = useState([]);
    const [nameSpaceList, setNameSpaceList] = useState([]);

    const targetRef = useRef(null);
    const gkeProjectRef = useRef(null);
    const kfProjectRef = useRef(null);
    const awsProjectRef = useRef(null);
    const azureResourceRef = useRef(null);
    const opshiftAppRef = useRef(null);
    const clusterRef = useRef(null);

    useEffect(() => {
        axios.get(`${hostname}/getConfigSearch/${envirn}`).then((response) => {
            if (response.data.length > 0) {
                let alterProjctList = response.data.map((val) => { return val.projectId });
                let uniqueProjectList = new Set(alterProjctList);
                let acutalProjectList = Array.from(uniqueProjectList);
                setProjectList(acutalProjectList);
                setResourceGroupList(response.data.map((val) => { return val.resourceGroup }));
                setAppList(response.data.map((val) => { return val.application }));
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));

            } else {
                setProjectList(response.data.map(() => { return [] }));
                setResourceGroupList(response.data.map(() => { return [] }));
                setAppList(response.data.map(() => { return [] }));
                setClusterList(response.data.map(() => { return [] }));
                setNameSpaceList(response.data.map(() => { return [] }));
            }
            console.log(projectList);
        });
    }, []);

    const targetPlatformHandler = (e) => {
        const platformValue = e.target.value;
        let targetValue = document.getElementById("target-platform").value;
        setEnvirn(targetValue);


        axios.get(`${hostname}/getConfigSearch/${targetValue}`).then((response) => {
            if (response.data.length > 0) {
                let alterProjctList = response.data.map((val) => { return val.projectId });
                let uniqueProjectList = new Set(alterProjctList);
                let acutalProjectList = Array.from(uniqueProjectList);
                setProjectList(acutalProjectList);
                setResourceGroupList(response.data.map((val) => { return val.resourceGroup }));
                setAppList(response.data.map((val) => { return val.application }));
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));

            } else {
                setProjectList(response.data.map(() => { return [] }));
                setResourceGroupList(response.data.map(() => { return [] }));
                setAppList(response.data.map(() => { return [] }));
                setClusterList(response.data.map(() => { return [] }));
                setNameSpaceList(response.data.map(() => { return [] }));
            }
            console.log(projectList);
        }).catch((err) => {
            console.log(err);
        });

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

    const projectClusterHandler = (refer) => {
        let projectValue = refer;
        let targetVal = targetRef.current.value;
        if (refer === "gke") {
            projectValue = gkeProjectRef.current.value;
        } else if (refer === "kf") {
            projectValue = kfProjectRef.current.value;
        } else if (refer === "aws") {
            projectValue = awsProjectRef.current.value;
        }

        axios.get(`${hostname}/getProjectSearch/${projectValue}/${targetVal}`).then((response) => {
            if (response.data.length > 0) {
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setClusterList(response.data.map(() => { return [] }));
                setNameSpaceList(response.data.map(() => { return [] }));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const resourceClusterHandler = (refer) => {
        let resourceValue = refer;
        let targetVal = targetRef.current.value;

        if (refer === "azure") {
            resourceValue = azureResourceRef.current.value;
        }

        axios.get(`${hostname}/getResourceSearch/${resourceValue}/${targetVal}`).then((response) => {
            if (response.data.length > 0) {
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setClusterList(response.data.map(() => { return [] }));
                setNameSpaceList(response.data.map(() => { return [] }));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const appClusterHandler = (refer) => {
        let appValue = refer;
        let targetVal = targetRef.current.value;
        if (refer === "open_shift") {
            appValue = opshiftAppRef.current.value;
        }

        axios.get(`${hostname}/getApplicationSearch/${appValue}/${targetVal}`).then((response) => {
            if (response.data.length > 0) {
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setClusterList(response.data.map(() => { return [] }));
                setNameSpaceList(response.data.map(() => { return [] }));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const ClusterNamespaceHandler = (refer) => {
        let praValue = "";
        let targetVal = targetRef.current.value;
        let clusterVal = clusterRef.current.value;
        // cluster/:praValue/:envirn

        if (refer === "gke") {
            praValue = gkeProjectRef.current.value;
        } else if (refer === "kf") {
            praValue = kfProjectRef.current.value;
        } else if (refer === "aws") {
            praValue = awsProjectRef.current.value;
        } else if (refer === "azure") {
            praValue = azureResourceRef.current.value;
        } else if (refer === "open_shift") {
            praValue = opshiftAppRef.current.value;
        }
        console.log(clusterVal, praValue, targetVal);
        axios.get(`${hostname}/getClusterSearch/${clusterVal}/${praValue}/${targetVal}`).then((response) => {
            console.log(response.data);
            if (response.data.length > 0) {
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setNameSpaceList(response.data.map(() => { return [] }));
            }
        }).catch((err) => {
            console.log(err, "ERRROR");
        });
    }

    return (
        <div className="left">
            <div className="row">
                <div className="col-sm-3">
                    {/* <Link to="/" className='float-start mt-mins-10' title='Kubernetes' data-bs-toggle="modal" data-bs-target="#kub-foundry">
                        <img src={cog_icon} alt="logout" className='xs-icon box-shadow-dark spin-box-r' />
                    </Link> */}
                </div>
                <div className="col-sm-9">
                    <img src={kube_icon} alt="kubernatees" className="kube-icon float-end" />
                </div>
            </div>

            <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Target Platform</h6>
                <select className="dropdown-item small fw-bold px-2" id="target-platform" ref={targetRef} onChange={(e) => targetPlatformHandler(e)} >
                    <option>Google Kubernetes Engine (GKE)</option>
                    <option>Kf</option>
                    <option>Azure Kubernetes Service (Azure k8s)</option>
                    <option>AWS EKS (AWS K8s)</option>
                    <option>Open Shift</option>
                </select>
            </div>
            {(targetPlatform.platform === "gke") ? (
                <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                    <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Project</h6>
                    <select className="dropdown-item small fw-bold px-2" id="target-project" ref={gkeProjectRef} onChange={() => projectClusterHandler("gke")}>
                        {projectList.map((project, key) => {
                            return (
                                <option key={key}>{project}</option>
                            )
                        })}
                    </select>
                </div>
            ) : (targetPlatform.platform === "kf") ? (
                <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                    <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Project</h6>
                    <select className="dropdown-item small fw-bold px-2" id="target-project" ref={kfProjectRef} onChange={() => projectClusterHandler("kf")}>
                        {projectList.map((project, key) => {
                            return (
                                <option key={key}>{project}</option>
                            )
                        })}
                    </select>
                </div>
            ) : (targetPlatform.platform === "azure") ? (
                <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                    <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Resource Group</h6>
                    <select className="dropdown-item small fw-bold px-2" id="target-azure-resource" ref={azureResourceRef} onChange={() => resourceClusterHandler("azure")}>
                        {resourceGroupList.map((resource, key) => {
                            return (
                                <option key={key}>{resource}</option>
                            )
                        })}
                    </select>
                </div>

            ) : (targetPlatform.platform === "aws") ? (
                <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                    <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Project</h6>
                    <select className="dropdown-item small fw-bold px-2" id="target-project" ref={awsProjectRef} onChange={() => projectClusterHandler("aws")}>
                        {projectList.map((project, key) => {
                            return (
                                <option key={key}>{project}</option>
                            )
                        })}
                    </select>
                </div>
            ) : (
                <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                    <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Application</h6>
                    <select className="dropdown-item small fw-bold px-2" id="target-open-app" ref={opshiftAppRef} onChange={() => appClusterHandler("open_shift")}>
                        {appList.map((app, key) => {
                            return (
                                <option key={key}>{app}</option>
                            )
                        })}
                    </select>
                </div>
            )}

            <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Cluster</h6>
                <select className="dropdown-item small fw-bold px-2" id="cluster" ref={clusterRef} onChange={() => ClusterNamespaceHandler(targetPlatform.platform)}>
                    {clusterList.map((cluster, key) => {
                        return (
                            <option key={key} onChange={() => ClusterNamespaceHandler(targetPlatform.platform)}>{cluster}</option>
                        )
                    })}
                </select>
            </div>

            {/* <CustomDropdown
                name='Select Namespace'
                items={nameSpaceList}
            /> */}
            <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
                <h6 className="dropdown-header pt-0 pb-0 pl-1 left">Select Namespace</h6>
                <select className="dropdown-item small fw-bold px-2" id="namespace" >
                    {nameSpaceList.map((namespace, key) => {
                        return (
                            <option key={key}>{namespace}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default Right