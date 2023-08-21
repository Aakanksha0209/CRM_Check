import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import sbilifeimage1 from '../Images/sbilifeimage.png'
import { useState } from 'react';
import MessageDialogue from './Messagedialog';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Navbar.css'; // Import your custom CSS file for styling
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import axios from 'axios';
// import Profile from './Profile';

const Navbar = () => {
    const navigate = useNavigate();
    const { currUser } = useContext(UserContext);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const flushReq = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/v1/support/deleteAll", { email: currUser.email }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        } catch (e) {
            console.log(e);
        }

    }
    const setOnlineStatus = async (isonline) => {
        try {
            const res = await axios.put("http://localhost:5000/api/v1/users/setOnlineStatus", { email: currUser.email, isonline: isonline }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        } catch (e) {
            console.log(e);
        }

    }


    // const [isOpen, setIsOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };

    return (<>
        {/* <FontAwesomeIcon icon={faBars} size='lg' className="toggle-button" onClick={toggleSidebar} /> */}

        {/* <LucideSidebar /> */}
        {/* <button className="toggle-button" onClick={toggleSidebar}>
                Toggle Sidebar
            </button> */}
        {/* <div className={`sidebar ${isOpen ? 'open' : ''}`}>

            <ul className="sidebar-nav">
                <li><FontAwesomeIcon icon={faHome} />Home</li>
                <li><FontAwesomeIcon icon={faBars} /> About</li>
                <li><FontAwesomeIcon icon={faBars} /> Services</li>
                <li><FontAwesomeIcon icon={faBars} /> Contact</li>
            </ul>
        </div> */}

        {/* <Sidebar/> */}
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    <img src={sbilifeimage1} id='sbillogo' />
                </Link>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="/home" className="navbar__link" >Home</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/Profile" className="navbar__link" >Profile</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/logout" className="navbar__link">
                            <FontAwesomeIcon icon={faSignOutAlt} size='lg'onClick={() => {
                            localStorage.removeItem('user');
                            if (currUser.designation === '0') {
                                flushReq();
                            }

                            setOnlineStatus('0');
                            window.location = `${window.location.origin}/authentication`;
                        }}/>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        {/* <MessageDialogue/> */}
        {/* <div className='welcome-text'> */}
        {/* <h1 className='welcome-text'>Welcome to Agent Dashboard</h1> */}
        {/* {showDialog && (
            <div className="dialog">
                <h2>Select an option:</h2>
                <button className="dialogbutton" onClick={() => handleOptionSelect('Call')}>Call</button>
                <button className="dialogbutton" onClick={() => handleOptionSelect('Video')}>Video</button>
                <button className="dialogbutton" onClick={() => handleOptionSelect('Chat')}>Chat</button>
                <button onClick={() => setShowDialog(false)}>Cancel</button>
            </div>
        )} */}
        {/* <button className='needbutton' onClick={handleHelp}>Need More help?</button> */}
        {/* </div> */}
    </>
    );
};

export default Navbar;
//  adjust the sidebar and navbar side by side