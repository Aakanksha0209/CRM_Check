import React, { useEffect } from "react";
import { useState,useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { VideoCallContext } from "./contexts/VideoCallContext";
import { ChatBotContext } from "./contexts/ChatBotContext";
import { UserContext } from "./contexts/UserContext";
import Authentication from "./pages/Authentication";
import Admin from "./pages/Admin";
import CRMDashboard from "./pages/CRMDashboard"
import User from "./pages/User";
import Videocall from "./pages/Videocall";
import Chatbot from "./pages/Chatbot/Chatbot";
import UserSupport from "./pages/UserSupport";
import Logs from "./pages/Logs";
import Logss from "./pages/Logss";
import RegisterSupport from "./pages/RegisterSupport";
import Profile from "./pages/Profile";
import Suppdash from "./pages/Suppdash";
import { Navbar } from "./components/Navbar";
import axios from "axios";
// import RegistrationForm from "./pages/RegistrationForm";
import io from "socket.io-client"
import MessageDialogue from "./pages/Messagedialog";
let socket = io.connect("http://localhost:5000");
function App() {
  const location=useLocation();
  const user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
  //user states
  const [currUser, setcurrUser] = useState({name:"",emp_id:"",email:"",designation:"",contact_no:""});
  //chat states
  const [vis, setvis] = useState(0);
  const [chat, setchat] = useState([]);
  const [room, setRoom] = useState(''); 
  const [disconnectVis, setdisconnectVis] = useState(0);
  const [support_log,setLog]=useState({support_user:"",req_user:"",support_req:"",start_time:"",end_time:"",status:""})

  //video call states
  const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
  const fetchUser = async () => {
      try {
          const res = await axios.get("http://localhost:5000/api/v1/users/getCurrUser", {
              headers: {
                  Authorization: `Bearer ${user.token}`
              }
          });
          setcurrUser(res.data);
      } catch (e) {
          console.log(e);
      }
  }
  useEffect(()=>{
    if(user){
      fetchUser();
    }
  },[])
  return (
    <>
    <UserContext.Provider value={{currUser,setcurrUser}}>
   
    <ChatBotContext.Provider value={{vis,setvis,chat,setchat,room,setRoom,disconnectVis,setdisconnectVis,support_log,setLog}}>

    <VideoCallContext.Provider value={{stream,setStream,receivingCall,setReceivingCall,caller,setCaller,callerSignal,setCallerSignal,callAccepted,setCallAccepted,idToCall,setIdToCall,callEnded,setCallEnded,name,setName,myVideo,userVideo,socket}}>
    {/* {location.pathname!='/' && location.pathname!='/authentication' && location.pathname!='/videocall' && user &&  <Navbar/>} */}
    {location.pathname!='/' && location.pathname!='/authentication' && user && <MessageDialogue/>}
       <Routes>
   
         <Route path="/" element={<Navigate to="/authentication" replace />} />
        <Route path="/authentication" element={<Authentication/>}/>
       
        {
          user && currUser.designation==='0' && <>
          <Route path="/user" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <User socket={socket}/>}/>
          <Route path="/profile" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <Profile socket={socket}/>}/>
          <Route path="/home" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <User socket={socket}/>}/>
          </>
        }
       
        {user && <Route path="/videocall" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <Videocall socket={socket}/>}/>}
        {
          user && currUser.designation==='1' &&   <Route path="/suppdash" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <Suppdash socket={socket}/>}/>
        }
        {
          user && currUser.designation==='2' &&  <>
        <Route path="/logss" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <Logss/>}/>
         <Route path="/registersupport" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <RegisterSupport/>}/>
          <Route path="/admin" element={!localStorage.getItem('user') ?<Navigate to="/authentication" replace />: <Admin/>}/>
          </> 
        }

        

   
      

      </Routes>
    </VideoCallContext.Provider>
    </ChatBotContext.Provider>
    </UserContext.Provider>
 
    </>
  );
}

export default App;
