
import React from 'react'
import '../pages/Profile.css'
import profile from '../Images/profile.jpg'
import Navbar from '../pages/Navbar'

function Profile() {
  return (
   <>
   <Navbar/>
   <div className='profile'>
    
        <img src={profile} className='profile-image' alt='No Image Found'/>
        <h3 className='profile-tag'>Name:  Aakanksha Atugade</h3>
        <h3 className='profile-tag'>Designation: Admin</h3>
        <h3 className='profile-tag'>Emp Id: E64797 </h3>
        <h3 className='profile-tag'>Email Id: aakanksha.atugade@sbilife.co.in </h3>
        <h3 className='profile-tag'>Contact No: 1234567896</h3>
        <div className='profile-button-group'>
        <button className='profile-button'>Edit</button>
        <button className='profile-button'>Save</button>
        </div>
   </div>
   
   </>
    
  )
}

export default Profile