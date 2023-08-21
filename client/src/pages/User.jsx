import React, { useEffect } from 'react'
import '../pages/Message.css'
import Navbar from '../pages/Navbar';
import MessageDialogue from '../pages/Messagedialog';

import { useLocation, useNavigate } from "react-router-dom";

const User = (props) => {
    let { socket } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    useEffect(() => {



    }, [])
    return (
        <>
            {user && user.designation && <>

                <div>
      <Navbar/>
      <MessageDialogue/>
      <div className="user">
        <h1 className="user_heading">Hello, Welcome to SBI LIFE Insurance Customer Dashboard</h1>
        <p className="user_info">You can ask your queries to CRM help desk. <br></br>If you have any other query please contact to CRM team via the ChatBot</p>
      </div>
    </div>
            </>}
        </>

    )
}

export default User