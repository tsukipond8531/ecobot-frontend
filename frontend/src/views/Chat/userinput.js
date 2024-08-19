import React, { useContext, useState, useRef, useEffect } from 'react';

import UserContext from 'hooks/contexts/usercontext';
import { CHATMODE_GUIDED } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT } from 'hooks/contexts/usercontext';

export default function UserInput (props) {
    const { chatMode, chatState } = useContext(UserContext);
    const [ message, setMessage ] = useState("");
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const textareaRef = useRef(null);

    const handleChange = event => {
        setMessage(event.target.value);
        adjustTextareaHeight();
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = (event) => {
        if (message.trim() !== '') {
          props.onSubmit && props.onSubmit(message);          
          
          setMessage(''); // Clear the input after submission
          adjustTextareaHeight(true); // Reset the textarea height
        }
    };

    const adjustTextareaHeight = (reset = false) => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = reset ? 'auto' : `${textarea.scrollHeight}px`;
            setTextareaHeight(newHeight);
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const handleStart = (e) => {
        props.onGuidedStart && props.onGuidedStart();
    }

    return (
        <>
            <div className={`user-input h-auto ${(chatMode !== CHATMODE_GUIDED || chatState !== CHATSTATE_INIT) ? "" : "d-none"}`}> 
                <form onSubmit={e => e.preventDefault()} >
                    <div className="box input-box">
                        <textarea 
                            id="message-input" 
                            placeholder="Ask a question" 
                            cols="30" 
                            rows="1" 
                            ref={textareaRef}
                            value={message} 
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <button onClick={handleSubmit} id="send-button"><i className="fa fa-paper-plane-top fa-regular"></i></button>
                    </div>
                </form>
            </div>
            <div className={`user-input ${(chatMode === CHATMODE_GUIDED && chatState === CHATSTATE_INIT) ? "" : "d-none"}`}>
                <button className="guided-start" onClick={handleStart} >Start</button>
            </div>
        </>
    );
}
