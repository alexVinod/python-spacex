import React, { useState, useEffect } from 'react';
import '../App.css';
import Arrow from './UI/Arrow';
import axios from "axios";
import rocket from './images/rocketry2.png';
import cog_icon from "./images/cog.png";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "./UI/LoadingSpinner";
import "./assets/bubbly-button.css";
import party from "party-js";

export default function Center() {
    const [source, setSource] = useState("Pivotal cloud foundary");
    const [target, setTarget] = useState("");
    const [statusMsg, setStatusMsg] = useState({ migrated: false });

    const [errorStatus, setErrorStatus] = useState({ sourceGitCode: false, email: false, jenkinsUrl: false });
    const errorMsgs = {
        sourceGitCodeMsg: "Source code configuration is mandatory. Please update",
        emailMsg: "Email configuration is mandatory. Please update",
        jenkinsUrlMsg: "Jenkins URL configuration is mandatory. Please update"
    };

    const [delayed, setDelayed] = useState(false);

    const techStackLists = {
        "java-maven": ["Java - Maven", "prerequisite-generator-java-maven"],
        "java-gradle": ["Java - Gradle", "prerequisite-generator-java-gradle"],
        "nodejs": ["NodeJS", "prerequisite-generator-nodejs"],
        "python": ["Python", "prerequisite-generator-python"],
        "dotnet": ["Dot Net", "prerequisite-generator-dotnet"]
    }

    useEffect(() => {
        const btnChange = document.querySelector("#migrateTrigger");
        btnChange.addEventListener("click", function () {
            //     // // party.confetti(this, {
            //     // //     count: party.variation.range(20, 60),
            //     // //     size: party.variation.range(0.8, 1.2),
            //     // //     // ... and more!
            //     // // });
            //     // party.sparkles(this);
            const buttonStyle = `background-color: rgb(149, 165, 166) !important; 
        border-color: rgba(232, 236, 241, 0.7) !important; 
        box-shadow: 0 2px 25px rgba(232, 236, 241, 0.7) !important; color: #FFF !important `;
            btnChange.setAttribute("style", buttonStyle);
        });

        let animateButton = function (e) {
            //reset animation
            e.target.classList.remove("animate");
            e.target.classList.add("animate");
            setTimeout(function () {
                e.target.classList.remove("animate");
            }, 700);
        };

        let bubblyButtons = document.getElementsByClassName("bubbly-button");

        for (const element of bubblyButtons) {
            element.addEventListener("click", animateButton, false);
        }

    }, []);

    const clurHandler = async (e) => {
        e.preventDefault();

        setTimeout(() => { setDelayed(true); }, 5000);

        // Tech Stack Params
        let techStackSelect = document.querySelector("#techStackSelect").value;
        let techStackLabel = techStackLists[techStackSelect][0];
        let techStackPath = techStackLists[techStackSelect][1];

        console.log(techStackLabel, techStackPath);

        // Common Params
        let emailValue = document.getElementById("confi-email").value;
        let gitValue = document.getElementById("gitSourceCode").value;
        let getUrl = document.getElementById("jenkins-url").value;

        let targetValue = document.getElementById("target-platform").value;
        setTarget(targetValue);
        console.log("MyTargetValue", targetValue);

        // Alter Params
        let projectIdValue = document.querySelector("#target-project").value;
        let clusterNameValue = document.querySelector("#cluster").value;
        let targetLocationValue = "us-east1-b";

        if (gitValue.trim() !== "" && emailValue.trim() !== "" && getUrl.trim() !== "") {
            document.getElementById("gitSourceCode").style.borderColor = "none";

            // Passing Params to Jenkins_Route
            let techStackPathParams = `${techStackPath}/`;
            let buildParams = "buildWithParameters?token=token&TEST=fromgit";
            let emailParams = "&EMAIL=" + emailValue;
            let gitParams = "&Repository_URL=" + gitValue;
            let projectParams = "&GKE_PROJECT_ID=" + projectIdValue;
            let clusterParams = "&GKE_CLUSTER_NAME=" + clusterNameValue;
            let locationParams = "&GKE_LOCATION=" + targetLocationValue;


            let i = getUrl.indexOf('/');
            i = getUrl.indexOf('/', i + 1);
            i = getUrl.indexOf('/', i + 1);

            let alterLink = getUrl.slice(i);

            let urlConcatParams = `${techStackPathParams}${buildParams}${emailParams}${gitParams}${projectParams}${clusterParams}${locationParams}`;
            console.log("**********", alterLink + urlConcatParams);

            // "https://cors-anywhere.herokuapp.com/"
            let url = alterLink + urlConcatParams;

            try {
                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        console.log(xhttp.response, xhttp.status, "*****111", xhttp.readyState);
                        if (xhttp.status === 201) {
                            setStatusMsg({ "migrated": true });

                            const today = new Date();
                            const formatToday = today.toDateString() + " " + today.getHours() + ":" + today.getMinutes();
                            console.log(formatToday);
                            const data = { source: source, target: targetValue, status: "Pass", health: "Healthy", endpoint: "", createdDate: `"${formatToday}"` }
                            axios.post("http://localhost:3001/createMigrates", data).then((_response) => {
                                console.log("DATA SAVED");
                                setDelayed(false);
                            }).catch(error => {
                                toast.error('There was an error, while saving Migration Data..!', error);
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

            let gitError = (gitValue.trim() === "") ? (true) : (false);
            let emailError = (emailValue.trim() === "") ? (true) : (false);
            let jenkinsError = (getUrl.trim() === "") ? (true) : (false);
            setErrorStatus({ sourceGitCode: gitError, email: emailError, jenkinsUrl: jenkinsError });

            document.querySelector("#gitSourceCode").style.borderColor = "#ced4da";
            document.querySelector("#gitErrorMsg").innerHTML = "";

            document.querySelector("#confi-email").style.borderColor = "#ced4da";
            document.querySelector("#configEmailErrorMsg").innerHTML = "";

            document.querySelector("#jenkins-url").style.borderColor = "#ced4da";
            document.querySelector("#configJenkinsErrorMsg").innerHTML = "";
        } else {
            setStatusMsg({ "migrated": false });
            let gitError = (gitValue.trim() === "") ? (true) : (false);
            let emailError = (emailValue.trim() === "") ? (true) : (false);
            let jenkinsError = (getUrl.trim() === "") ? (true) : (false);
            setErrorStatus({ sourceGitCode: gitError, email: emailError, jenkinsUrl: jenkinsError });

            if (gitError) {
                document.querySelector("#gitSourceCode").style.borderColor = "red";
                document.querySelector("#gitErrorMsg").innerHTML = errorMsgs.sourceGitCodeMsg;
                document.querySelector("#gitSourceCode").focus();
            } else {
                document.querySelector("#gitSourceCode").style.borderColor = "#ced4da";
                document.querySelector("#gitErrorMsg").innerHTML = "";
            }

            if (emailError) {
                document.querySelector("#confi-email").style.borderColor = "red";
                document.querySelector("#configEmailErrorMsg").innerHTML = errorMsgs.emailMsg;
            } else {
                document.querySelector("#confi-email").style.borderColor = "#ced4da";
                document.querySelector("#configEmailErrorMsg").innerHTML = "";
            }

            if (jenkinsError) {
                document.querySelector("#jenkins-url").style.borderColor = "red";
                document.querySelector("#configJenkinsErrorMsg").innerHTML = errorMsgs.jenkinsUrlMsg;
            } else {
                document.querySelector("#jenkins-url").style.borderColor = "#ced4da";
                document.querySelector("#configJenkinsErrorMsg").innerHTML = "";
            }
        }
    }

    const delayFalse = () => {
        setDelayed(false);
    }


    return (
        <div className='center'>
            <ToastContainer />
            <Arrow />
            <div style={{ paddingTop: '3rem' }}>
                <button
                    id="migrateTrigger"
                    className='btn btn-navy btn-lg text-gold bubbly-button'
                    onClick={clurHandler}
                    data-bs-toggle="modal"
                    data-bs-target="#imigrate-msg"
                ><em>i</em>Migrate</button>
            </div>
            {/* <!-- IMigrate Modal --> */}
            <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="imigrate-msg">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content " >

                        {/* <!-- IMigrate Header --> */}
                        <div className="modal-header font-fam-vijaya rounded">
                            {(delayed === true) ? (statusMsg.migrated) ? (
                                <React.Fragment>
                                    <div className='row'>
                                        <div className='col-3'>
                                            <img src={rocket} alt="user" className='shadow-dark rocket-eclipse mt-5' />
                                        </div>
                                        <div className='col-9'>
                                            <p className="modal-title text-dark text-start">
                                                The migration of your selected application from <span className='fw-bold text-primary'>Pivotal cloud foundary </span> to <span className='fw-bold text-primary'>{target}</span> started, you will get an email notification once the migration is completed.
                                                <br /> <br />
                                                Thank you.
                                            </p>
                                            <button type="button" className="btn-close mt-mins-140 float-end" onClick={delayFalse} data-bs-dismiss="modal"></button>
                                        </div>
                                    </div>
                                </React.Fragment>

                            ) : (delayed === true) ? (
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
                                    <button type="button" className="btn-close mt-mins-20" onClick={delayFalse} data-bs-dismiss="modal"></button>
                                </React.Fragment>
                            ) : (<div className="loadingSpinnerContainer"><LoadingSpinner /></div>)
                                : (<div className="loadingSpinnerContainer"><LoadingSpinner /></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
