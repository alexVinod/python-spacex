import { useState, useEffect, useRef } from "react";
import CustomDropdown from "./UI/CustomDropdown";
import kube_icon from "./images/kube.png";
import axios from "axios";
// import { toast } from 'react-toastify';

const Right = () => {

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
        axios.get(`http://localhost:3001/getConfigSearch/${envirn}`).then((response) => {
            if (response.data.length > 0) {
                setProjectList(response.data.map((val) => { return val.projectId }));
                setResourceGroupList(response.data.map((val) => { return val.resourceGroup }));
                setAppList(response.data.map((val) => { return val.application }));
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setProjectList(response.data.map((val) => { return [] }));
                setResourceGroupList(response.data.map((val) => { return [] }));
                setAppList(response.data.map((val) => { return [] }));
                setClusterList(response.data.map((val) => { return [] }));
                setNameSpaceList(response.data.map((val) => { return [] }));
            }
        });
    }, []);

    const targetPlatformHandler = (e) => {
        const platformValue = e.target.value;
        let targetValue = document.getElementById("target-platform").value;
        setEnvirn(targetValue);


        axios.get(`http://localhost:3001/getConfigSearch/${targetValue}`).then((response) => {
            if (response.data.length > 0) {
                setProjectList(response.data.map((val) => { return val.projectId }));
                setResourceGroupList(response.data.map((val) => { return val.resourceGroup }));
                setAppList(response.data.map((val) => { return val.application }));
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));

            } else {
                setProjectList(response.data.map((val) => { return [] }));
                setResourceGroupList(response.data.map((val) => { return [] }));
                setAppList(response.data.map((val) => { return [] }));
                setClusterList(response.data.map((val) => { return [] }));
                setNameSpaceList(response.data.map((val) => { return [] }));
            }
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

        axios.get(`http://localhost:3001/getProjectSearch/${projectValue}/${targetVal}`).then((response) => {
            if (response.data.length > 0) {
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setClusterList(response.data.map((val) => { return [] }));
                setNameSpaceList(response.data.map((val) => { return [] }));
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

        axios.get(`http://localhost:3001/getResourceSearch/${resourceValue}/${targetVal}`).then((response) => {
            if (response.data.length > 0) {
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setClusterList(response.data.map((val) => { return [] }));
                setNameSpaceList(response.data.map((val) => { return [] }));
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

        axios.get(`http://localhost:3001/getApplicationSearch/${appValue}/${targetVal}`).then((response) => {
            if (response.data.length > 0) {
                setClusterList(response.data.map((val) => { return val.cluster }));
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setClusterList(response.data.map((val) => { return [] }));
                setNameSpaceList(response.data.map((val) => { return [] }));
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
        console.log(clusterVal, praValue, targetVal, "***********REFER*******");
        axios.get(`http://localhost:3001/getClusterSearch/${clusterVal}/${praValue}/${targetVal}`).then((response) => {
            console.log(response.data);
            if (response.data.length > 0) {
                setNameSpaceList(response.data.map((val) => { return val.nameSpace }));
            } else {
                setNameSpaceList(response.data.map((val) => { return [] }));
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
                    <select className="dropdown-item small fw-bold px-2" id="target-gke-projct" ref={gkeProjectRef} onChange={(e) => projectClusterHandler("gke")}>
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
                    <select className="dropdown-item small fw-bold px-2" id="target-kf-projct" ref={kfProjectRef} onChange={(e) => projectClusterHandler("kf")}>
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
                    <select className="dropdown-item small fw-bold px-2" id="target-azure-resource" ref={azureResourceRef} onChange={(e) => resourceClusterHandler("azure")}>
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
                    <select className="dropdown-item small fw-bold px-2" id="target-aws-projct" ref={awsProjectRef} onChange={(e) => projectClusterHandler("aws")}>
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
                    <select className="dropdown-item small fw-bold px-2" id="target-open-app" ref={opshiftAppRef} onChange={(e) => appClusterHandler("open_shift")}>
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
                <select className="dropdown-item small fw-bold px-2" id="cluster" ref={clusterRef} onChange={(e) => ClusterNamespaceHandler(targetPlatform.platform)}>
                    {clusterList.map((cluster, key) => {
                        return (
                            <option key={key} onChange={(e) => ClusterNamespaceHandler(targetPlatform.platform)}>{cluster}</option>
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