import { useState, useEffect, useRef } from 'react';
import './Messagedialog.css';
import chatbotimage from '../Images/chatboticon.png'
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MessageDialogue = (props) => {

    //Firstly the file state is null


    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [showActionButtons, setShowActionButtons] = useState(false);
    const chatBoxRef = useRef(null);


    // const hiddenFileInput = React.useRef(null);

    useEffect(() => {
        // Automatically scroll to the latest message when a new message is added
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleClearClick = () => {
        // Clear all chat messages
        setMessages([]);
    };

    const handleUserInput = () => {
        const userMessage = userInput.trim();
        if (userMessage === '') return;

        setMessages((prevMessages) => [...prevMessages, { text: userMessage, isUser: true }]);
        setUserInput('');

        // Simulate bot response (Replace this with your actual chatbot logic)
        setTimeout(() => {
            setShowActionButtons(true);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Sorry, currently I don't have an answer for that question.", isUser: false },
            ]);
        }, 500);
    };



    const handlekeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    };

    const handleActionClick = (action) => {
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `You selected: ${action}`, isUser: true },
                { text: 'Your action will be processed.', isUser: false },
            ]);
            setShowActionButtons(false);
        }, 500)

    };

    const [showChatContainer, setShowChatContainer] = useState(false);

    const handleChatIconClick = () => {
        setShowChatContainer(!showChatContainer);
    };

    useEffect(() => {
        // Automatically scroll to the latest message when a new message is added
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const [selectedFile, setselectedFile] = useState(null);

    const onFileChange = event => {
        setselectedFile({ selectedFile: event.target.files[0] });
    }

    const onFileUpload = () => {
        //create a function on formdata
        var formData = {};

        // upload file 
        formData = {
            'file': setselectedFile,
            'name': setselectedFile.name
        };

        // formData = }
        //details of uplaod file
        console.log(selectedFile);



        // request made by backend API
        axios.post("api/uploadfile", formData);
    }

    const fileData = () => {
        if (selectedFile) {
            return (
                <>
                    <h1>file details : </h1>
                    <p>File name : {selectedFile.name}</p>
                    <p>File type : {selectedFile.type}</p>
                    <p>
                        Last Modified : {" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <b style={{ color: 'white' }}>Choose Before pressing upload Button</b>
                </>
            );
        }
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        // props.handleFile(fileUploaded);
    };

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        
<>
        <div>
            
            <img src={chatbotimage} id="image" alt="Hello please allow javascript" onClick={handleChatIconClick}></img>

            {showChatContainer && (
                <div className="chat-container">

                    {/* Chat header */}
                    <div className="chatheader">
                        {/* Chat header content */}
                    </div>

                    {/* Chat messages */}
                    <div className="chatbox" ref={chatBoxRef}>
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>

                    <div className={`fixed-action-buttons ${showActionButtons ? 'show-buttons' : ''}`}>
                        <button className="fixed-action-button" onClick={() => handleActionClick('Chat')}>
                            Chat
                        </button>
                        <button className="fixed-action-button" onClick={() => handleActionClick('Call')}>
                            Call
                        </button>
                        <button className="fixed-action-button" onClick={() => handleActionClick('Video Call')}>
                            Video Call
                        </button>

                        <div>
                            {/* <button className='fixed-action-button' onClick={handleClick}>Choose File
                            </button> */}
                            <input
                                type="file"
                                className='input-button'
                                ref={hiddenFileInput}
                                onChange={handleChange}
                            // style={{ display: 'value' }}
                            />
                            <button className="upload-button" onChange={onFileChange} onClick={onFileUpload}>
                                Upload!
                            </button>

                            {fileData()}
                        </div>
                    </div>
                    {/* User input */}
                    <div className={`user-input ${showActionButtons ? 'show-buttons' : ''}`}>
                        <input
                            type="text"
                            className='inputtext'
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            onKeyPress={handlekeyPress}

                        />
                        {/* {fileData()} */}
                        <button className="send-button">
                            Send
                        </button>
                    </div>
                    {/* Clear button */}
                </div>
            )}

            {/* Need More Help button */}
            {/* <button className="needbutton" onClick={handleChatIconClick}>
                Need More help?
            </button> */}
        </div>
        </>
    );

};

export default MessageDialogue;