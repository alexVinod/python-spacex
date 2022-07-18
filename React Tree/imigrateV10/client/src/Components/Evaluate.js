import React, { useEffect, useState } from 'react';
import Header from './Header';
import bg_brick from './images/background.png';
import evaluate_icon from './images/test-eval.png';
import sort_icon from './images/sort-iconl2.png';
import { Link } from "react-router-dom";
import cnxnParams from "../connectionParams.json";
import axios from "axios";

export default function Evaluate() {
    const hostname = cnxnParams.HOSTCONNECTION.hostname;

    const [migrateList, setMigrateList] = useState([{ source: "", target: "", status: "", health: "", endpoint: "", createdDate: "" }]);
    const [order, setOrder] = useState("ASC");

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...migrateList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setMigrateList(sorted);
            setOrder("DSC");
        }

        if (order === "DSC") {
            const sorted = [...migrateList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setMigrateList(sorted);
            setOrder("ASC");
        }
    }

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);

        axios.get(`${hostname}/getMigrates`).then((response) => {
            setMigrateList(response.data);
            // console.log("----", migrateList)
        });
    }, [""]);

    const dateHandler = (timestamp) => {
        // toUTCString() toLocaleString
        return new Date(timestamp).toLocaleString();
    }

    return (
        <React.Fragment>
            <Header />
            <div className='container'>
                <div className='bg-danger text-light p-1 mt-1 rounded'>
                    <h3 className='mt-1'> <img src={evaluate_icon} alt="evaluate" className='xsa-icon mt-mins-5' /> Evaluate </h3>
                </div>
                <hr className='text-info' />
                <p>Dashboard of Migrated applications</p>
                <div className="table-responsive card card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className='bg-navy text-light' style={{ "backgroundColor": "#337ab7" }}>
                                <th onClick={() => sorting("source")}>Source <img src={sort_icon} alt="sorticon" className='xss-icon' /></th>
                                <th onClick={() => sorting("target")}>Target <img src={sort_icon} alt="sorticon" className='xss-icon' /></th>
                                <th onClick={() => sorting("createdDate")}>When <img src={sort_icon} alt="sorticon" className='xss-icon' /></th>
                                <th onClick={() => sorting("status")}>Status <img src={sort_icon} alt="sorticon" className='xss-icon' /></th>
                                <th onClick={() => sorting("health")}>Health <img src={sort_icon} alt="sorticon" className='xss-icon' /></th>
                                <th onClick={() => sorting("endpoint")}>End point <img src={sort_icon} alt="sorticon" className='xss-icon' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {migrateList.map((migrate, i) => {
                                return (
                                    // .slice(0, 25)
                                    <tr key={i}>
                                        <td>{migrate.source}</td>
                                        <td>{migrate.target}</td>
                                        {/* <td>{migrate.createdDate.substring(0, 10) + " " + migrate.createdDate.substring(11, 19)}</td> */}
                                        <td>{dateHandler(migrate.createdDate)}</td>
                                        <td>{migrate.status}</td>
                                        <td>{migrate.health}</td>
                                        <td>{migrate.endpoint}</td>
                                    </tr>
                                )
                            })}
                            { }
                        </tbody>
                    </table>
                </div>
                <p>For more information of applications <Link to="#" className="btn btn-link">Click here</Link> </p>
            </div>
        </React.Fragment >
    )
}


/**
 *     // const convertDateFormat = (timestamp) => {
    //     let format = new Date(`${timestamp}`)
    //     console.log(format);
    //     var convertStr = String(format);
    //     // console.log("********************************", convertStr);
    //     // var formated = convertStr.slice(0, 24);
    //     // // console.log(formated);
    //     return convertStr;
    // }

    // const [migrateList, setMigrateList] = useState([{ "environment": "", "projectId": "", "resourceGroup": "", "application": "", "region": "", "cluster": "", "nameSpace": "", "serviceKey": "", "endpoint": "", "orgName": "", "space": "", "username": "", "password": "" }]);



//             < tr >
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
// </tr> 
 */