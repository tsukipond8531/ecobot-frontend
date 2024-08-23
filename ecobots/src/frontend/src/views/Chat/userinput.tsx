import React, { useContext, useState, useRef, useEffect, FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import UserContext from '../../hooks/contexts/usercontext';
import { CHATMODE_GUIDED, CHATSTATE_INIT } from '../../hooks/contexts/usercontext';

// Define the props interface for the component
interface UserInputProps {
    onSubmit?: (message: string) => void;
    onGuidedStart?: () => void;
}

const UserInput: React.FC<UserInputProps> = (props) => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('MyComponent must be used within an AppProvider');
    }

    const { chatMode, chatState } = context;
    const [message, setMessage] = useState<string>('');
    const [textareaHeight, setTextareaHeight] = useState<string>('auto');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
        adjustTextareaHeight();
    };
    
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
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

    const handleStart = () => {
        props.onGuidedStart && props.onGuidedStart();
    };

    return (
        <>
            <div className={`user-input h-auto ${(chatMode !== CHATMODE_GUIDED || chatState !== CHATSTATE_INIT) ? "" : "d-none"}`}>
                <form onSubmit={(e: FormEvent) => e.preventDefault()}>
                    <div className="box input-box">
                        <textarea 
                            id="message-input" 
                            placeholder="Ask a question" 
                            cols={30} 
                            rows={1} 
                            ref={textareaRef}
                            value={message} 
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <button onClick={handleSubmit} id="send-button">
                            <i className="fa fa-paper-plane-top fa-regular"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className={`user-input ${(chatMode === CHATMODE_GUIDED && chatState === CHATSTATE_INIT) ? "" : "d-none"}`}>
                <button className="guided-start" onClick={handleStart}>Start</button>
            </div>
        </>
    );
}

export default UserInput;
