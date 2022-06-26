import React, { useState } from 'react';
import '../App.css';
import Arrow from './UI/Arrow';
import axios from "axios";

const Center = () => {

    const [source, setSource] = useState("Pivotal cloud foundary");
    const [target, setTarget] = useState("");
    const [destDetails, setDestDetails] = useState({ target_platform: "" });
    const [statusMsg, setStatusMsg] = useState({ migrated: false });

    const clurHandler = async (e) => {
        e.preventDefault();

        let emailValue = document.getElementById("confi-email").value;
        let gitValue = document.getElementById("gitSourceCode").value;
        let targetValue = document.getElementById("target-platform").value;
        setTarget(targetValue);
        console.log("MyTargetValue", targetValue);

        let emailParams = "&EMAIL=" + emailValue;
        let gitParams = "&Repository_URL=" + gitValue;
        const getUrl = document.getElementById("jenkins-url").value;
        var i = getUrl.indexOf('/');
        i = getUrl.indexOf('/', i + 1);
        i = getUrl.indexOf('/', i + 1);

        let alterLink = getUrl.slice(i);

        var url = alterLink; //+ emailParams + gitParams;
        console.log(url);

        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log(xhttp.response, xhttp.status, "*****111", xhttp.readyState);
                    if (xhttp.status === 201) {
                        setStatusMsg({ "migrated": true });

                        const data = { source: source, target: targetValue, status: "Pass", health: "Healthy", endpoint: "" }
                        axios.post("http://localhost:3001/createMigrates", data).then((response) => {
                            console.log("DATA SAVED");
                        });
                    }
                } else {
                    setStatusMsg({ "migrated": false });
                    console.log(xhttp.response, "*****00", xhttp.responseText);
                }
            };

            try {
                xhttp.open("GET", url, true);
                xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
                xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                xhttp.setRequestHeader("Authorization", "Basic dXMyZXIxLW1haWxfY29tOnNlYy1VUkVAMzI0MQ==");
                xhttp.send();

            } catch (err) {
                setStatusMsg({ "migrated": false });
                console.log(err);
            }

        } catch (err) {
            setStatusMsg({ "migrated": false });
            console.log(err);
        }
    }


    return (
        <div className='center'>
            <Arrow />
            <div style={{ paddingTop: '3rem' }}>
                <button className='imigrateButtons btn btn-navy btn-lg text-gold' onClick={clurHandler} data-bs-toggle="modal" data-bs-target="#imigrate-msg"><em>i</em>Migrate</button>
            </div>
            {/* <!-- IMigrate Modal --> */}
            <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="imigrate-msg">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content " >

                        {/* <!-- IMigrate Header --> */}
                        <div className="modal-header font-fam-vijaya ">
                            {(statusMsg.migrated) ? (
                                <React.Fragment>
                                    <p className="modal-title text-dark text-start">
                                        Hi, <br />The migration of your selected application from <span className='fw-bold text-primary'>Pivotal cloud foundary </span> to <span className='fw-bold text-primary'>{target}</span> started, you will get an email notification once the migration is completed.
                                        <br /> <br />
                                        Thank you.
                                    </p>
                                    <button type="button" className="btn-close mt-mins-140 " data-bs-dismiss="modal"></button>
                                </React.Fragment>

                            ) : (
                                <React.Fragment>
                                    <p className="modal-title text-danger font-fam-vijaya text-start p-1">Something went wrong, Please try again later..!</p>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </React.Fragment>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Center