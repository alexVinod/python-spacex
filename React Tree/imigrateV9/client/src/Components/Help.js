import React, { useEffect } from 'react'
import Header from './Header';
import bg_brick from './images/background.png';
import { Link } from "react-router-dom";

export default function Help() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className='container mt-3'>
                <label className='fw-bold'>FAQ</label>
                <ol>
                    <li className='mt-3 bg-lywhite'>
                        <span className='fw-bold'>Is there any pre-requisites are there to access Cloud Foundry environment ? </span><br />
                        <em>
                            Yes. You must download and install the latest version of the cf CLI v7 or v8. For more information, see Installing the Cloud Foundry Command Line Interface.
                            Using CF CLI, you may execute the commands to access and deploy applications in Cloud Foundry platform
                        </em>
                    </li>
                    <li className='mt-3 bg-lywhite'>
                        <span className='fw-bold'>How to login to CF Platform?</span>
                        <em>
                            <ol type='a'>
                                <li>Run: <code>cf login -a API-URL -u USERNAME -p PASSWORD -o ORG -s SPACE </code>Where:</li>
                                <ul style={{ "listStyleType": "disc" }}>
                                    <li>API-URL is your API endpoint, the URL of the Cloud Controller in your Cloud Foundry instance.</li>
                                    <li><code>USERNAME</code> is your username.</li>
                                    <li><code>PASSWORD</code> is your password. Cloud Foundry discourages using the -p option, as it may record your password in your shell history.</li>
                                    <li><code>ORG</code> is the org where you want to deploy your apps.</li>
                                    <li><code>SPACE</code> is the space in the org where you want to deploy your apps.</li>
                                    <p> When you successfully log in, you see output like the example below:</p>
                                    <pre className='jumbotron bg-secondary text-light p-3'>
                                        <span className=''> $ cf login -a https://api.example.com -u username@example.com -o example-org -s development API endpoint: https://api.example.com
                                            <br />{`${"Password>"}`} Authenticating... OK
                                            <br />Targeted org example-org
                                            <br />Targeted space development
                                            <br />API endpoint:   https://api.example.com User:           username@example.com Org:            example-org Space:          development
                                        </span>
                                    </pre>
                                </ul>
                            </ol>
                        </em>
                    </li>
                    <li className='mt-3 bg-lywhite'>
                        <span className='fw-bold'>How to get Org and Space information from Cloud Foundry ?</span>
                        <ol type='a'>
                            <li>
                                <em>
                                    After login to CF platform, execute the command <code>cf orgs</code> for getting the list of Orgs and <code>cf spaces</code> for fetching list of "spaces"
                                </em>
                            </li>
                        </ol>
                    </li>
                    <li className='mt-3 bg-lywhite'>
                        <span className='fw-bold'>How to list apps in Cloud Foundry ?</span>
                        <em>
                            <ol type='a'>
                                <li>
                                    First login to Org and Space where your apps are running. You may use this command -
                                    <code>cf login -a API-URL -u USERNAME -p PASSWORD -o ORG -s SPACE</code>
                                </li>
                                <li>Post logging to Org and Space, execute <code>cf apps</code> command to fetch the list of apps</li>
                            </ol>
                        </em>
                    </li>
                    <li className='mt-3 bg-lywhite'>
                        <span className='fw-bold'>How to find the memory, Disk, Routes, Services information of CF applications ?</span>
                        <em>
                            <ol type='a'>
                                <li>In Cloud foundry, there is a manifest file <code>manifest.yaml</code> which hold all configurations like memory, cpu, disk, routes, services etc.</li>
                                <li>
                                    Find below the sample manifest.yaml
                                </li>
                                <pre className='jumbotron bg-secondary text-light p-3'>
                                    ---
                                    version: 1 <br />
                                    applications: <br />
                                    <span className='mx-3'>- name: my-app</span><span className='text-warning'>// name of application</span> <br />
                                    <span className=''>memory: 512M</span> <span className='text-warning'>// memory information</span><br />
                                    instances: 2 <span className='text-warning'>// number of replicas/droplets</span><br />
                                    buildpacks: <span className='text-warning'>// Based on the technology stack, we have to define the build pack. In this case, its go - go_buildpack</span><br />

                                    env:<br />
                                    <span className='mx-2'>GOPACKAGENAME: go_calls_ruby</span><br />
                                    <span className='mx-2'>command: go_calls_ruby</span>
                                </pre>
                            </ol>
                        </em>
                    </li>
                    <li className='mt-3 bg-lywhite'>
                        <span className='fw-bold'>What is a Route in Cloud Foundry ?</span>
                        <em>
                            <ol>
                                <li>Route is the URL for application for accessing it over the browser. It can be defined in manifest. Yaml or can be used as imperative commands</li>
                                <li>Configuring Routes and Domains | Cloud Foundry Docs <br /> Routes belong to a space, and developers can only map apps to a route in the same space.<br />
                                    From <a href="https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#routes" target="_tab" className='btn-link'>${"<https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#routes>"}</a><br />
                                    Ref: Configuring Routes and Domains | Cloud Foundry Docs</li>
                            </ol>
                        </em>
                    </li>
                    <li className='mb-5 mt-3 bg-lywhite'>
                        <span className='fw-bold'>What are services ?</span> <br />
                        <em>
                            Cloud Foundry offers a marketplace of services that operators can use to provision reserved resources on demand. Marketplace services include resources such as databases on a shared or dedicated server, or accounts on a SaaS app. These resources are known as service instances and the systems that deliver and operate these resources are known as services.
                            <br />
                            For a service to be available in the Marketplace, an operator must integrate the service with Cloud Foundry using APIs.
                            <ol className='a'>
                                <li>Cf services is the command to fetch the list of services</li>
                                <li>Ref: Managing Service Instances with the cf CLI | Cloud Foundry Docs</li>
                            </ol>
                        </em>
                    </li>
                </ol>
            </div>
        </React.Fragment>
    )
}
