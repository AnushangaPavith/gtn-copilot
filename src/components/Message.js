import React from 'react';

function Message(props) {
    const { message, sender, isArray } = props;

    let maxLineLength = 0;

    let messageContent;

    if (typeof message === 'string') {
        const lines = message.split('\n'); // Split the message into lines
        maxLineLength = Math.max(...lines.map(line => line.length)); // Find the maximum line length

        messageContent = lines.map((line, index) => (
            <p key={index}>{line}</p> // Wrap each line in a <p> element
        ));
    } else {
        messageContent = message;
    }

    const messageClass = maxLineLength > 68 ? 'message-auto' : 'message-max-content';
    const scrollEnable = isArray ? 'bot-scroll' : '';

    return (
        <div className={`message ${sender} ${messageClass} ${scrollEnable}`}>
            {messageContent}
        </div>
    );
}

export default Message;
