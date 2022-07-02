import { useRef, useState, useEffect } from "react";
import CustomDropdown from "./UI/CustomDropdown";
import LoadingSpinner from "./UI/LoadingSpinner";
// import { Link } from "react-router-dom";
// import cog_icon from "./images/settings-l.png";
import cf_icon from "./images/cf.png";

const Left = () => {

    const selectedOrganization = useRef('')
    const selectedSpace = useRef('')
    const techStack = useRef("");

    const [loading, setLoading] = useState(false)
    const [applicationsList, setApplicationsList] = useState(null)

    const [cloudFoundary, setCloudFoundary] = useState({ cloudDetails: [] });
    const [details, setDetails] = useState({ endpoint: "", orgname: "", space: "", username: "", password: "" });

    const getAppsHandler = () => {
        console.log(selectedOrganization.current.value, selectedSpace.current.value)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, [2000])

        // var exec1 = require("child_process").exec;
        // exec1("ls -a", function (a, b, c) {
        //     // console.log("error", a)
        //     // console.log("output", b)
        //     // console.log("stderror:", c)
        // })

        // to be fetched from api
        const data = ['imigrate', 'spring-music'];
        setApplicationsList(data)
    }

    const addHandler = (e) => {
        const cloudDetails = [details, ...cloudFoundary.cloudDetails];
        setCloudFoundary({ cloudDetails });
        console.log(details, "-------", cloudDetails, "********", cloudFoundary.cloudDetails);
        console.log(cloudFoundary.cloudDetails.length);
    }

    useEffect(() => {
        console.log("");
        // console.log(cloudFoundary.cloudDetails.length);
    }, []);

    const Options = (props) => {
        console.log(props.item)
        return (
            <option>{props.item}</option>
        )
    }

    return (
        <div className="left">
            <div className="row">
                <div className="col-sm-6">
                    {/* <h5 className="float-start mt-mins-10 text-chaco text-shadow-black">Cloud Foundry</h5> */}
                    <img src={cf_icon} alt="cloud foundary" className="kube-icon float-start" />
                </div>
                <div className="col-sm-6">
                    {/* <Link to="#" className='float-end mt-mins-10' title='Cloud Foundry' data-bs-toggle="modal" data-bs-target="#cloud-foundry">
                        <img src={cog_icon} alt="logout" className='xs-icon box-shadow-dark spin-box-l' />
                    </Link> */}
                </div>
            </div>

            {/* <!-- The Modal --> */}
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


            <CustomDropdown
                name='Select Organization'
                items={['ramki.veda@gmail.com', 'Organization 2', 'Organization 3', 'Organization 4', 'Organization 5']}
                save={selectedOrganization}
            />

            <CustomDropdown
                name='Select Space'
                items={['dev', 'qa', 'uat', 'prd']}
                save={selectedSpace}
            />

            <div className="buttonsDiv">
                <button className="getAppsButtons btn btn-navy text-gold " onClick={getAppsHandler}>Get Apps</button>
            </div>


            <div className={`dropdown-menu d-block position-static p-0 pt-1 mt-1 ${applicationsList === null && `notAllowed`}`}>
                <h6 className="dropdown-header pt-0 pb-0 pl-0">
                    {!loading && 'List of Applications'}
                    {loading && <div className="loadingSpinnerContainer"><LoadingSpinner /></div>}
                </h6>
                <select className="dropdown-item small fw-bold px-2" disabled={applicationsList === null}>
                    {!loading && applicationsList && applicationsList.map(item =>
                        <Options key={Math.random()} item={item} />
                    )}
                </select>
            </div>

            <CustomDropdown
                name='Technology Stack'
                items={['Java - Maven', 'Java - Gradle', 'NodeJS', 'Python', 'Dot Net']}
                save={techStack}
            />

            <div>
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Configure Source Code (GIT HUB Path)*"
                    defaultValue="https://github.com/cloudfoundry-samples/spring-music"
                    id="gitSourceCode" />
                <span className="text-danger" id="gitErrorMsg" style={{ "fontSize": "14px" }}></span>
                <span className="text-danger fw-bold float-end" style={{ "marginRight": "-10px", "zIndex": "2", "marginTop": "-45px" }}>*</span>

            </div>

        </div>
    )
}

export default Left