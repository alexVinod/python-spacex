import { useState } from "react";
import CustomDropdown from "./UI/CustomDropdown";
import { Link } from "react-router-dom";
import cog_icon from "./images/settings.png";

const Right = () => {

    const [kubeDetails, setKubeDetails] = useState({ projectId: "", region: "", cluster: "", jsonval: [] });

    const saveHandler = (e) => {
        const kubef = {
            projectId: kubeDetails.projectId, region: kubeDetails.region,
            cluster: kubeDetails.cluster, jsonval: kubeDetails.jsonval
        };
        console.log(kubef);
    }

    return (
        <div className="left">
            <div className="row">
                <div className="col-sm-3">
                    <Link to="/" className='float-start mt-mins-10' title='Kubernetes' data-bs-toggle="modal" data-bs-target="#kub-foundry">
                        <img src={cog_icon} alt="logout" className='xs-icon flip-img-right box-shadow-dark' />
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
                            <h6 className="modal-title">Kubernetes</h6>
                            <button type="button" className="btn-close text-light" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            <input type="text" className="form-control mb-3" placeholder="Enter ProjectID"
                                onChange={(e) => setKubeDetails({ ...kubeDetails, projectId: e.target.value })}
                                value={kubeDetails.projectId} />

                            <input type="text" className="form-control mb-3" placeholder="Enter Regoin"
                                onChange={(e) => setKubeDetails({ ...kubeDetails, region: e.target.value })}
                                value={kubeDetails.region} />

                            <input type="text" className="form-control mb-3" placeholder="Enter Cluster"
                                onChange={(e) => setKubeDetails({ ...kubeDetails, cluster: e.target.value })}
                                value={kubeDetails.cluster} />

                            <div className="mb-3">
                                <label htmlFor="json-file" className="form-label">JSON File :</label>
                                <input className="form-control form-control-sm" id="json-file" type="file"
                                    accept="application/JSON" onChange={(e) => setKubeDetails({
                                        ...kubeDetails,
                                        jsonval: e.target.value
                                    })} value={kubeDetails.jsonval} />
                            </div>
                            <div className="d-grid gap-2  mx-auto mt-3">
                                <input type="button" value="Save" className="btn btn-navy text-light"
                                    onClick={saveHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <CustomDropdown
                name='Select Target Platform'
                items={['Google Kubernetes Engine (GKE)', 'Kf', 'Azure k8s 3', 'AWS K8s', 'Open Shift']}
            />

            <CustomDropdown
                name='Select Application Type'
                items={['Containerized', 'Non-Containerized']}
            />

            <CustomDropdown
                name='Select Project'
                items={['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']}
            />

            <CustomDropdown
                name='Select Cluster'
                items={['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5']}
            />

        </div>
    )
}

export default Right