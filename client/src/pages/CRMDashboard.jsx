import React from 'react';
import './CRMDashboard.css';
// import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPlus, faSignOutAlt,faUserCircle} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar';
import Sidebar from '../pages/Sidebar';
const CRMDashboard = () => {
 
  const callData = [
    { id: 1, tokenId: '876726', customerName: 'Aakanksha', reqType: 'Call', startTime: '2023-07-18 10:30 AM'},
    { id: 2,tokenId: '876726', customerName: 'Jane Smith', reqType: 'Call', startTime: '2023-07-18 10:28 AM' },
    { id: 3,tokenId: '876726', customerName: 'Mike Johnson', reqType: 'Call', startTime: '2023-07-18 10:31 AM'},
    { id: 4,tokenId: '876726', customerName: 'Emily Brown', reqType: 'Call', startTime: '2023-07-18 10:39 AM'},
    // Add more call data objects as needed
  ];


  // Function to count the number of calls with a specific status
  const countCallsByStatus = (status) => {
    return callData.filter((call) => call.status === status).length;
  };

  return (
    <div className="admin-dashboard">


      <Navbar/>
      <Sidebar/>
      <h1>CRM</h1>
      
      {/* <div className="dashboard-stats">
      <div className="stat">
          <h2>Current Traffic</h2>
          <p>{countCallsByStatus('Attended')}</p>
        </div>
        <div className="stat">
          <h2>Attended calls</h2>
          <p>{countCallsByStatus('Attended')}</p>
        </div>
        <div className="stat">
          <h2>Pending calls</h2>
          <p>{countCallsByStatus('Pending')}</p>
        </div>
        <div className="stat">
          <h2>In-progress Calls</h2>
          <p>{countCallsByStatus('In Progress')}</p>
        </div>
      </div> */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Token ID</th>
              <th>Customer name</th>
              <th>Request Type</th>
              <th>Start Time and Date</th>
            </tr>
          </thead>
          <tbody>
            {callData.map((call) => (
              <tr key={call.id}>
                <td>{call.id}</td>
                <td>{call.tokenId}</td>
                <td>{call.customerName}</td>
                <td>{call.reqType}</td>
                <td>{call.startTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
      <div>
      <Link to="seemore"><button className='see-more'>See more..</button></Link>
      </div>
    </div>
  );
};

export default CRMDashboard;