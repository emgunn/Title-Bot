import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import './App.css';

import Navigation from './Navigation';
import SiteInput from './SiteInput';

const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    
    console.log(body);
    

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
};

function App() {

    const [connectionMsg, setConnectionMsg] = useState("Eric Gunn 2021");

    // used for testing to see if React is connected to our proxied backend Express server
    // useEffect( () => {
    //     // code to run on component mount
    //     callBackendAPI()
    //         .then(res => {
    //             // console.log(res.express);
    //             setConnectionMsg(res.express);
    //         })
    //         .catch(err => console.log("Error: "  + err));
    // }, []);

    
    return (
        <div className="App">
            <Navigation></Navigation>
            <SiteInput></SiteInput>
            <p>{connectionMsg}</p>
        </div>
    );
}

export default App;
