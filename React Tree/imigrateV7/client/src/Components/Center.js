import React, { useState } from 'react';
import '../App.css';
import Arrow from './UI/Arrow';
import axios from "axios";
import cog_icon from "./images/cog.png";
import { ToastContainer, toast } from "react-toastify";

const Center = () => {

    const [source, setSource] = useState("Pivotal cloud foundary");
    const [target, setTarget] = useState("");
    // const [destDetails, setDestDetails] = useState({ target_platform: "" });
    const [statusMsg, setStatusMsg] = useState({ migrated: false });

    const [errorStatus, setErrorStatus] = useState({ sourceGitCode: false, email: false, jenkinsUrl: false });
    const errorMsgs = {
        sourceGitCodeMsg: "Source code configuration is mandatory. Please update",
        emailMsg: "Email configuration is mandatory. Please update",
        jenkinsUrlMsg: "Jenkins URL configuration is mandatory. Please update"
    };

    const clurHandler = async (e) => {
        e.preventDefault();

        let emailValue = document.getElementById("confi-email").value;
        let gitValue = document.getElementById("gitSourceCode").value;
        let getUrl = document.getElementById("jenkins-url").value;

        let targetValue = document.getElementById("target-platform").value;
        setTarget(targetValue);
        console.log("MyTargetValue", targetValue);

        if (gitValue.trim() !== "" && emailValue.trim() !== "" && getUrl.trim() !== "") {
            document.getElementById("gitSourceCode").style.borderColor = "none";
            let emailParams = "&EMAIL=" + emailValue;
            let gitParams = "&Repository_URL=" + gitValue;
            var i = getUrl.indexOf('/');
            i = getUrl.indexOf('/', i + 1);
            i = getUrl.indexOf('/', i + 1);

            let alterLink = getUrl.slice(i);

            var url = alterLink; //+ emailParams + gitParams; //"https://cors-anywhere.herokuapp.com/" + getUrl
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
                                // toast.success('Migration Data Saved Successful...');
                            }).catch(error => {
                                toast.error('There was an error, while saving Migration Data..!', error);
                            });;
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
        } else {
            let gitError = (gitValue.trim() === "") ? (true) : (false);
            let emailError = (emailValue.trim() === "") ? (true) : (false);
            let jenkinsError = (getUrl.trim() === "") ? (true) : (false);
            setErrorStatus({ sourceGitCode: gitError, email: emailError, jenkinsUrl: jenkinsError });

            if (gitError) {
                document.getElementById("gitSourceCode").style.borderColor = "red";
                document.getElementById("gitErrorMsg").innerHTML = errorMsgs.sourceGitCodeMsg;
                document.querySelector("#gitSourceCode").focus();
            }
            if (emailError) {
                document.querySelector("#confi-email").style.borderColor = "red";
                document.querySelector("#configEmailErrorMsg").innerHTML = errorMsgs.emailMsg;
            }
            if (jenkinsError) {
                document.querySelector("#jenkins-url").style.borderColor = "red";
                document.querySelector("#configJenkinsErrorMsg").innerHTML = errorMsgs.jenkinsUrlMsg;
            }
        }
    }


    return (
        <div className='center'>
            <ToastContainer />
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
                                    <p className="modal-title text-danger font-fam-vijaya text-start p-1">
                                        Something went wrong, Please try again later..! <br />
                                        {(errorStatus.sourceGitCode || errorStatus.email || errorStatus.jenkinsUrl) ?
                                            (
                                                <em className='mt-1'>
                                                    All mandatory fields must fill <br />
                                                    {(errorStatus.sourceGitCode) ? (<mark className='mx-1 bg-dark text-light p-1'>Config Source Code,</mark>) : ("")}
                                                    {(errorStatus.email) ? (
                                                        <mark className='mx-1 bg-dark text-light p-1'>
                                                            <img src={cog_icon} alt="cog_image" className='xs-icon' style={{ "marginTop": "-5px" }} />
                                                            {" > "} Email,</mark>
                                                    ) : ("")}
                                                    {(errorStatus.jenkinsUrl) ? (
                                                        <mark className='mx-1 bg-dark text-light p-1'>
                                                            <img src={cog_icon} alt="cog_image" className='xs-icon' style={{ "marginTop": "-5px" }} />
                                                            {" > "} Jenkins Url</mark>) : ("")}
                                                </em>

                                            ) : ("")}
                                    </p>
                                    <button type="button" className="btn-close mt-mins-60" data-bs-dismiss="modal"></button>
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