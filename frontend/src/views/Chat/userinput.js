import React, { useContext, useState } from 'react';

import UserContext from 'hooks/contexts/usercontext';

export default function UserInput (props) {
    const { chatMode } = useContext(UserContext);
    const [ message, setMessage ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim() !== '') {
          props.onSubmit && props.onSubmit(message);          
          
          setMessage(''); // Clear the input after submission
        }
    };

    return (
        <div className="user-input h-auto">
                <form onSubmit={handleSubmit} >
            <div className="box input-box">
                    <textarea id="message-input" placeholder="Ask a question" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button type="submit" id="send-button"><i className="fa fa-paper-plane-top fa-regular"></i></button>
            </div>
            </form>
        </div>
    );
}