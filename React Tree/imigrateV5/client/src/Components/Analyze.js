import React, { useEffect } from 'react';
import Header from './Header';
import bg_brick from './images/background.png';
// import bg_analyze_icon from './images/analyze.jpeg';

export default function Analyze() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);
    // style={{ "backgroundColor": "rgba(0,0,0,0.4)", "background": "rgba(0,0,0,0.4)" }}
    return (
        <React.Fragment>
            <Header />
            <div className='container ' >
                <h3 className='text-primary mt-1'> Analyze <hr /></h3>
                <ol>
                    <li>Know your Source</li>
                </ol>
                <table className='mx-5 '>
                    <tr>
                        <td>a. Cloud foundry platform - IBM/Vmware/Pivotal</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>b. Know your Organisation</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>c. Know your Space</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>d. Know your credentials for CF Platform (API Keys)</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>e. Know your applications</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>f. Know your Services</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>g. Know your Database</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>h. Know your Tech Stack (based on the buildpack used in manifest)</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>i. Know your Source Code Repository</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>j. Know your Droplets replica count</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>k. Know your droplet capacity</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>a. Cloud foundry platform - IBM/Vmware/Pivotal</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                </table>
                <ol start="2" className='mt-4'>
                    <li>Know your Target</li>
                </ol>
                <table className='mx-5'>
                    <tr>
                        <td>a. Identify your Target Kubernetes platform <br />(Google Kf, Google Kubernetes Engine, Azure Kubernetes Services, <br />AWS EKS, Open Shift)</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>b. Know your Project ID for Google (both Kubernetes Engine and Kf)</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                    <tr>
                        <td>c. Know your Resource Group for Azure</td>
                        <td><input type="text" className='mx-1 form-control' /></td>
                    </tr>
                </table>

                <input type="button" className='btn btn-primary mt-5 text offset-3 ' value="Submit" />

            </div>
        </React.Fragment>
    )
}
