import React, { useEffect } from 'react';
import Header from './Header';
import bg_brick from './images/background.png';

export default function FitmentTest() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className='container'>
                <h3 className='text-primary mt-1'> Fitness : <hr /></h3>
                <table className='mx-5'>
                    <tr>
                        <td>Check your PCF application readiness for Google Kf</td>
                        <td><input type="button" className='btn btn-primary mx-4' value="Submit" title='Click the Kf migrate plan command
    Your application technology stack - <Tech name> ex: Java   [retrive from manifest file]'/></td>
                    </tr>
                    <tr>
                        <td>Check your PCF application readiness for GKE</td>
                        <td><input type="button" className='btn btn-primary mx-4' value="Submit" title='Click the GKE migrate plan command
    Your application technology stack - <Tech name> ex: Java   [retrive from manifest file]' /></td>
                    </tr>
                    <tr>
                        <td>Check your PCF application readiness for AKS</td>
                        <td><input type="button" className='btn btn-primary mx-4' value="Submit" title='Click the AKS migrate plan command
    Your application technology stack - <Tech name> ex: Java   [retrive from manifest file]' /></td>
                    </tr>
                    <tr>
                        <td>Check your PCF application readiness for EKS</td>
                        <td><input type="button" className='btn btn-primary mx-4' value="Submit" title='Click the EKS migrate plan command
    Your application technology stack - <Tech name> ex: Java   [retrive from manifest file]' /></td>
                    </tr>
                    <tr>
                        <td>Check your PCF application readiness for Open Shift</td>
                        <td><input type="button" className='btn btn-primary mx-4' value="Submit" title='Click the Open Shift migrate plan command
    Your application technology stack - <Tech name> ex: Java   [retrive from manifest file]' /></td>
                    </tr>
                </table>
            </div>
        </React.Fragment>
    )
}
