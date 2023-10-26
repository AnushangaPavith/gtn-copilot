import React from 'react';

function Message(props) {
    const { message, sender } = props;

    return (
        <div className={`message ${sender}`}>
            {message}
        </div>
    );
}

export default Message;
