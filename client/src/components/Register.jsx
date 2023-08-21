import React from 'react'
import Logo from '../Images/sbilifeimage.png'
import '../components/Register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = (props) => {
    const { settoggle } = props;

  const [data, setData] = useState({ designation: '', name: '', email: '', contact_no: '', emp_id: '', password: '' })

  const handleRegister = async (data) => {
    try {
      // if (Data.emp_id === "" || Data.password === "")
      //   alert("Enter credentials.......!!!!!!!!!")
      // else {
        const res = await axios.post("http://localhost:5000/api/v1/users/addUser", {...data,designation:'0'})
        if (res.status == (200)){
          alert("Register Successful")
        }
        else{
        alert("Errrorrrrrrrrr.........")
        }
        // settoggle(1)
      // }
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='register'>

      <div className='register-left'>
        <img src={Logo} alt='NO image found' />
        <h1>Welcome to SBI Life Insurance <br></br> (CRM System) </h1>
      </div>
      <div className='register-right'>
        <form>
          {/* <select className='register-input-select' placeholderm='Designation' required onChange={(e) => { setData({ designation: "0" }) }}>
            <option>Designation</option>
            <option>Admin</option>
            <option>Agent</option>
            <option>CRM</option>
          </select> */}
          <input className='register-input' type='text' placeholder='Name ' required onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
          <input className='register-input' type='email' placeholder='Email-ID ' required onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
          <input className='register-input' type='text' placeholder='Contact Number ' maxLength={10} required onChange={(e) => {
            setData({ ...data, contact_no: e.target.value })
          }} />
          <input className='register-input' type='text' placeholder='Emp-ID ' required onChange={(e) => {
            setData({ ...data, emp_id: e.target.value })
          }} />
          <input className='register-input' type='password' placeholder='Password' required onChange={(e) => {
            setData({ ...data, password: e.target.value })
          }} />
          {/* <Link to='/login'>  */}
          <button className='register-btn' onClick={()=>{handleRegister(data);}}>Register</button>
          {/* </Link> */}
          <div className='no-account'>
            {/* <Link to="/login" style={{ textDecoration: 'none' }}> */}
               <h5 className=''>Already have account? </h5>
               {/* </Link> */}
            {/* <Link to='/login'>  */}
            <button className='login-button' onClick={()=>{settoggle(1)}}>Login</button>
             {/* </Link> */}
          </div>
        </form>

      </div>


    </div>
  )
}

export default Register