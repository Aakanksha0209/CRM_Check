import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from "axios";
import './Login.css'

import Logo from '../Images/sbilifeimage.png'
import Lock from '../Images/login.png'




const Login = (props) => {
    const { settoggle } = props;
    const naviagte = useNavigate();
    const [data, setdata] = useState({ email: "", password: "" });
    const { currUser, setcurrUser } = useContext(UserContext);

    const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };


    const handleLogin = async (data) => {
        try {
            if(data.email==='' || data.password===''){
                alert("Enter credentials")
            }else{
                const res1 = await axios.post("http://localhost:5000/api/v1/users/getUserByAuth", data);
                if (res1.data.token) {
                    localStorage.setItem('user', JSON.stringify(res1.data));

                    const res2 = await axios.get("http://localhost:5000/api/v1/users/getCurrUser", {
                        headers: {
                            Authorization: `Bearer ${res1.data.token}`
                        }
                    });
                    setcurrUser(res2.data);

                    await axios.put("http://localhost:5000/api/v1/users/setOnlineStatus", { email: res2.data.email, isonline: '1' }, {
                        headers: {
                            Authorization: `Bearer ${res1.data.token}`
                        }
                    });
                    if (res2 && res2.data.designation === '0') {
                        window.location = `${window.location.origin}/user`;
                    } else if (res2 && res2.data.designation === '1') {
                        window.location = `${window.location.origin}/suppdash`;
                    } else if (res2 && res2.data.designation === '2') {
                        window.location = `${window.location.origin}/admin`;
                    }


                } else {
                    alert("Invalid credentials!!");
                  }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>

<div className='login'>
      
      <div className='login-left'>
        <img src={Logo} alt='NO image found'/>
        <h1>Welcome to SBI Life Insurance <br></br> (CRM System)  </h1>
      </div>
      <div className='login-right'>
        <form>
          <img className='login-img' src={Lock} alt='No image found'/>
          {/* <select className='login-input-select' placeholder='Designation' required onChange={(e)=>{setdata({designation:"0"})}}>
            <option>Designation</option>
            <option>Admin</option>
            <option>Agent</option>
            <option>CRM</option>
          </select> */}
          <input className='login-input' type='text' placeholder='Enter Emp-ID' required onChange={(e)=>{setdata({...data,email:e.target.value})}}/>
          <input className='login-input' type='password' placeholder='Enter Password' required onChange={(e)=>{setdata({...data,password:e.target.value})}}/>
        <button className='login-btn' onClick={()=>{
          handleLogin(data)
          console.log('clicked')
        }}>Login</button>
          <div className='no-account'>
          {/* <Link to='/register' style={{textDecoration: 'none'}}> */}
            <h5 className=''>Don't have account? </h5>
            {/* </Link> */}
          {/* <Link to='/register'> */}
            <button className='register-login-button' onClick={()=>{settoggle(0)}}>Register</button>
            {/* </Link> */}
          </div>
        </form>
         
      </div>


    </div>



        </>
    )
}

export default Login;