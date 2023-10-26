import React, { useState, useEffect } from 'react';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import gtn_copilot from "../img/B1.png";



function Copilot() {
    const [messages, setMessages] = useState([]); // State to store messages
    const [inputField, setInputField] = useState('');
    const [selectedOption, setSelectedOption] = useState('dynamic');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

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

    const updateChat = (message, sender) => {
        setMessages(prevMessages => [...prevMessages, { message, sender }]);
    };

    const handleSendButton = () => {
        if (inputField.trim() !== '') {
            const userMessage = inputField;

            // Append the user's message to the chat
            updateChat(userMessage, 'user');

            // Simulate a bot response after a delay
            setTimeout(() => {
                const botResponse = "Hello, how can I assist you?"; // Replace this with the actual server response
                updateChat(botResponse, 'bot');
            }, 1000);

            setInputField(''); // Clear the input field
            console.log(messages);
        }
    };

    const handleVoiceButton = () => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            recognition.start();
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
                    <Message key={index} message={message.message} sender={message.sender} />
                ))}
            </div>

            <div className="input-container">
                <button className='btn-voice' id="voice-button" onClick={handleVoiceButton}><FontAwesomeIcon icon={faMicrophone} /></button>
                <input type="text" id="input-field" value={inputField} onChange={(e) => setInputField(e.target.value)} placeholder="Ask me anything related to GTN..." />
                <button className='btn-send' id="send-button" onClick={handleSendButton}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    );
}

export default Copilot;
