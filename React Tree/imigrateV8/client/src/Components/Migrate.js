import React, { useEffect } from 'react';
import '../App.css';
import './assets/styles.css';
import Center from './Center';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import bg_brick from './images/background.png';
import cld_migrate_icon from './images/cld-migrate.png';

export default function Migrate() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    return (
        <React.Fragment>
            <Header settingsCog={true} />
            <div className='container-fluid'>
                <div className='bg-primary text-light p-1 mt-1 rounded'>
                    <h3 className='mt-1 mx-4'> <img src={cld_migrate_icon} alt="migrate" className='xsa-icon mt-mins-5' /> Migrate </h3>
                </div>
                <hr className='text-info' />
                <div className='app'>
                    <Left />
                    <Center />
                    <Right />
                </div>
            </div>
        </React.Fragment>
    )
}
