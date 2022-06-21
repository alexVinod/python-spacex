import React, { useState } from 'react';
import '../App.css'
import Arrow from './UI/Arrow'

const Center = () => {

    const [destDetails, setDestDetails] = useState({ target_platform: "" });
    const [statusMsg, setStatusMsg] = useState({ migrated: false });

    const clurHandler = async (e) => {
        e.preventDefault();

        var url = "/job/Gradle-builder/buildWithParameters?token=token&TEST=fromgit";
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log(xhttp.response, xhttp.status, "*****111", xhttp.readyState);
                    if (xhttp.status === 201) {
                        setStatusMsg({ "migrated": true });
                    }
                } else {
                    setStatusMsg({ "migrated": false });
                    console.log(xhttp.response, "*****00", xhttp.responseText);
                }
            };

            try {
                setDestDetails({ "target_platform": document.getElementById("target-platform").value });

                xhttp.open("GET", url, true);
                xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
                xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                xhttp.setRequestHeader("Authorization", "Basic dXMyZXIxLW1haWxfY29tOnNlYy1VUkVAMzI0MQ==");
                xhttp.send();

                // console.log("Triggered", xhttp.response);
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
                <button className='imigrateButtons btn btn-navy btn-lg text-gold' onClick={clurHandler} data-bs-toggle="modal" data-bs-target="#imigrate-msg">iMigrate</button>
            </div>
            {/* <!-- IMigrate Modal --> */}
            <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="imigrate-msg">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-trans-blue " >

                        {/* <!-- IMigrate Header --> */}
                        <div className="modal-header border bg-trans-blue ">
                            {(statusMsg.migrated) ? (
                                <React.Fragment>
                                    <p className="modal-title text-light text-start">
                                        Hi, <br />The migration of your selected application from <span className='text-warning'>Pivotal cloud foundary </span> to <span className='text-warning'>{destDetails.target_platform}</span> started, you will get an email notification once the migration is completed.
                                        <br /> <br />
                                        Thank you.
                                    </p>
                                    <button type="button" className="btn-close mt-mins-140 " data-bs-dismiss="modal"></button>
                                </React.Fragment>

                            ) : (
                                <React.Fragment>
                                    <p className="modal-title text-light text-start">Something went wrong!</p>
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