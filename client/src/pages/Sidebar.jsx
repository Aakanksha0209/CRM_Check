import React from 'react'
import '../pages/Navbar.css'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


  return (
    <>
     <FontAwesomeIcon icon={faBars} size='lg' className="toggle-button" onClick={toggleSidebar} />
 <div className={`sidebar ${isOpen ? 'open' : ''}`}>

<ul className="sidebar-nav">
    <li><FontAwesomeIcon icon={faBars} />Home</li>
    <li><FontAwesomeIcon icon={faBars} /> About</li>
    <li><FontAwesomeIcon icon={faBars} /> Services</li>
    <li><FontAwesomeIcon icon={faBars} /> Contact</li>
</ul>
</div>
    </>
  )
}

export default Sidebar