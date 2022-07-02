import React, { useEffect, useState } from 'react';
import Header from './Header';
import bg_brick from './images/background.png';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Evaluate() {

    // const convertDateFormat = (timestamp) => {
    //     let format = new Date(`${timestamp}`)
    //     console.log(format);
    //     var convertStr = String(format);
    //     // console.log("********************************", convertStr);
    //     // var formated = convertStr.slice(0, 24);
    //     // // console.log(formated);
    //     return convertStr;
    // }

    // const [migrateList, setMigrateList] = useState([{ "environment": "", "projectId": "", "resourceGroup": "", "application": "", "region": "", "cluster": "", "nameSpace": "", "serviceKey": "", "endpoint": "", "orgName": "", "space": "", "username": "", "password": "" }]);
    const [migrateList, setMigrateList] = useState([{ source: "", target: "", status: "", health: "", endpoint: "", createdDate: "" }]);

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);

        axios.get("http://localhost:3001/getMigrates").then((response) => {
            setMigrateList(response.data);
            // console.log("----", migrateList)
        });
    }, [""]);

    return (
        <React.Fragment>
            <Header />
            <div className='container'>
                <h3 className='text-primary mt-1'> Evaluate <hr /></h3>
                <p>Dashboard of Migrated applications</p>
                <div className="table-responsive card card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className='bg-navy text-light' style={{ "backgroundColor": "#337ab7" }}>
                                <th>Source</th>
                                <th>Target</th>
                                <th>When</th>
                                <th>Status</th>
                                <th>Health</th>
                                <th>End point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {migrateList.map((migrate, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{migrate.source}</td>
                                        <td>{migrate.target}</td>
                                        <td>{migrate.createdDate.slice(0, 24)}</td>
                                        <td>{migrate.status}</td>
                                        <td>{migrate.health}</td>
                                        <td>{migrate.endpoint}</td>
                                    </tr>
                                )
                            })}
                            {/* //             < tr >
                        //         <td>CF</td>
                        //         <td>GKE</td>
                        //         <td>June 23 1:02</td>
                        //         <td>Pass</td>
                        //         <td>Healthy</td>
                        //         <td>IP:Port</td>
                        //     </tr>
                        // <tr>
                        //     <td>CF</td>
                        //     <td>EKS</td>
                        //     <td>June 25</td>
                        //     <td>Pass</td>
                        //     <td>Healthy</td>
                        //     <td>IP:Port</td>
                        // </tr>
                        // <tr>
                        //     <td>CF</td>
                        //     <td>AKS</td>
                        //     <td>June 27</td>
                        //     <td>Pass</td>
                        //     <td>Healthy</td>
                        //     <td></td>
                        // </tr>
                        // <tr>
                        //     <td>CF</td>
                        //     <td>Open Shift</td>
                        //     <td></td>
                        //     <td>Pass</td>
                        //     <td>Healthy</td>
                        //     <td></td>
                        // </tr>
                        // <tr>
                        //     <td>CF</td>
                        //     <td>Google Kf</td>
                        //     <td></td>
                        //     <td>Pass</td>
                        //     <td>Healthy</td>
                        //     <td></td>
                        // </tr> */}
                        </tbody>
                    </table>
                </div>
                <p>For more information of applications <Link to="#" className="btn btn-link">Click here</Link> </p>
            </div>
        </React.Fragment >
    )
}
