import React, { useState, useEffect } from 'react';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import gtn_copilot from "../img/B1.png";
import services from '../services/services';


function Copilot() {
    const [messages, setMessages] = useState([]); // State to store messages
    const [inputField, setInputField] = useState('');
    const [selectedOption, setSelectedOption] = useState('dynamic');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (recognition) {
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1][0].transcript;
                console.log(result);
                setInputField(result);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };
        }
    }, [recognition]);

    const updateChat = (message, sender, isArray) => {
        setMessages(prevMessages => [...prevMessages, { message, sender, isArray }]);
    };
    
    const handleSendButton = async () => {
        if (inputField.trim() !== '') {
            const userMessage = inputField;

            if (recognition && listening) {
                recognition.stop(); // Stop speech recognition if it's active
                setListening(false); // Update the listening state
            }

            // Append the user's message to the chat
            updateChat(userMessage, 'user', false);

            // Show a temporary loading message
            const loadingMessage = (
                <div className="loading-animation">
                    <div className="spinner"></div>
                    <div className='spinner-txt' id="loading-text">Sending message...</div>
                </div>
            );
    
            const loadingMessageIndex = updateChat(loadingMessage, 'bot', false);

            // Function to update loading text in a loop
            const loadingTexts = ["Sending message...", "Retrieving data...", "Formatting message..."];
            let textIndex = 1;
            const updateLoadingText = () => {
                const loadingTextElement = document.getElementById("loading-text");
                loadingTextElement.textContent = loadingTexts[textIndex];
                textIndex = (textIndex + 1) % loadingTexts.length;
    
                if (textIndex === loadingTexts.length || textIndex === 0) {
                    // If "Formatting message..." is reached, stop the interval
                    clearInterval(loadingTextInterval);
                }
            };

            // Set an interval to update the loading text
            const loadingTextInterval = setInterval(updateLoadingText, 5000);

            try {
                setInputField(''); // Clear the input field
                // Send the user message to the server and get the bot's response

                if (selectedOption=== "dynamic"){
                    const response = await services.getResponse({ user_request: userMessage}, selectedOption);
                    const response_obj = JSON.parse(response.data.output.output);
                    if (response_obj.type === "text") {
                        // Display the content as text
                        setMessages(prevMessages => {
                            const updatedMessages = [...prevMessages];
                            updatedMessages.pop();
                            return updatedMessages;
                        });
                        updateChat(response_obj.content, 'bot', false);
                    } else if (response_obj.type === "array") {
                        // Display the content as a table
                        // Assuming content is an array of objects
                        const tableContent = (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        {Object.keys(response_obj.content[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {response_obj.content.map((item, index) => (
                                        <tr key={index}>
                                            {Object.values(item).map((value, subIndex) => {
                                                if (typeof value === "object" && !Array.isArray(value)) {
                                                    // Handle nested objects here
                                                    return (
                                                        <td key={subIndex}>
                                                            <table>
                                                                <tbody>
                                                                    {Object.keys(value).map((subKey, subSubIndex) => (
                                                                        <tr key={subSubIndex}>
                                                                            <td>{subKey}</td>
                                                                            <td>{value[subKey]}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    );
                                                } else {
                                                    return <td key={subIndex}>{value}</td>;
                                                }
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );                        
                        setMessages(prevMessages => {
                            const updatedMessages = [...prevMessages];
                            updatedMessages.pop();
                            return updatedMessages;
                        });
                        updateChat(tableContent, 'bot', true);
                    }
                } else {
                    const response = await services.getResponse( userMessage, selectedOption);
                    setMessages(prevMessages => {
                        const updatedMessages = [...prevMessages];
                        updatedMessages.pop();
                        return updatedMessages;
                    });
                    updateChat(response.data.output.content, 'bot', false);
                }

                clearInterval(loadingTextInterval);
               
            } catch (error) {
                // Handle any errors here
                console.error('Error while getting the bot response:', error);
                
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages.pop();
                    return updatedMessages;
                });
                clearInterval(loadingTextInterval);
                updateChat("Try again...", 'bot', false);
            }

            setInputField(''); // Clear the input field
            console.log(messages);
        }
    };

    const handleVoiceButton = () => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            if (!listening) {
                recognition.start();
            } else {
                recognition.stop();
            }
            setListening(!listening);
        } else {
            console.error('Speech recognition is not available in this browser.');
        }
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const isOptionSelected = (value) => {
        return selectedOption === value ? "selected" : "";
    };

    return (
        <div className='gtn-copilot'>
            <div className="chat-container">
                <div className='logo-container'>
                    <img className='copilot-logo' src={gtn_copilot} alt="Logo" />
                </div>
                <div className='logo-text-container'>
                    <h2>GTN Copilot</h2>
                    <p className='copilot-description'>Here are some things Copilot can help you do.</p>
                </div>

                <div className='btn-container'>
                    <div className="option-buttons">
                        <button className={`option-button ${isOptionSelected('dynamic')}`} onClick={() => handleOptionChange('dynamic')} >
                            Dynamic<br />Data Retrieval
                        </button>
                        <button className={`option-button ${isOptionSelected('admin')}`} onClick={() => handleOptionChange('admin')} >
                            Admin<br />Assistance
                        </button>
                        <button className={`option-button ${isOptionSelected('task')}`} onClick={() => handleOptionChange('task')} >
                            Task<br />Automation
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="chat" id='chat'>
                {messages.map((message, index) => (
                    <Message key={index} message={message.message} sender={message.sender} isArray={message.isArray} />
                ))}
            </div>

            <div className="input-container">
                <button className={`btn-voice ${listening ? 'listening' : ''}`} id="voice-button" onClick={handleVoiceButton}><FontAwesomeIcon icon={faMicrophone} /></button>
                <input type="text" id="input-field" value={inputField} onChange={(e) => setInputField(e.target.value)} placeholder="Ask me anything related to GTN..." />
                <button className='btn-send' id="send-button" onClick={handleSendButton}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    );
}

export default Copilot;
