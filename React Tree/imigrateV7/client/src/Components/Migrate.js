import React, { useEffect } from 'react';
import '../App.css';
import './assets/styles.css';
import Center from './Center';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import bg_brick from './images/background.png';

export default function Migrate() {

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("style", `background-image : url("${bg_brick}"); background-repeat: repeat;
            background-size: auto`);
    }, []);

    return (
        <React.Fragment>
            <Header settingsCog={true} />
            <div className='app'>
                <Left />
                <Center />
                <Right />
            </div>
        </React.Fragment>
    )
}
