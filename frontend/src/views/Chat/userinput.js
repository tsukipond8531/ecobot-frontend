import React, { useContext } from 'react';

import UserContext from 'hooks/contexts/usercontext';

export default function UserInput () {
    const { chatMode } = useContext(UserContext);

    return (
        <div className="user-input h-auto">
            <div className="box input-box">
                <textarea id="message-input" placeholder="Ask a question" cols="30" rows="10"></textarea>
                <div id="send-button">
                    <i className="fa fa-paper-plane-top fa-regular"></i>
                </div>
            </div>
        </div>
    );
}