import React from 'react';

function Message(props) {
    const { message, sender, isArray } = props;

    const messageClass = message.length > 68 ? 'message-auto' : 'message-max-content';
    const scrollEnable = isArray ? 'bot-scroll' : '';

    return (
        <div className={`message ${sender} ${messageClass} ${scrollEnable}`}>
            {message}
        </div>
    );
}

export default Message;
