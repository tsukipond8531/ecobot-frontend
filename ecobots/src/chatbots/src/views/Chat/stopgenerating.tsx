import React, { useContext } from 'react';
import UserContext from '../../hooks/contexts/usercontext';
import { CHATSTATE_GENERATING } from '../../hooks/contexts/usercontext';

const StopGenerating: React.FC = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('MyComponent must be used within an AppProvider');
    }

    const { chatState } = context;

    return (
        <div className={`stop-generating ${chatState !== CHATSTATE_GENERATING ? "d-none" : ""}`}>
            <button id="cancelButton" className="border-0 m-auto fw-bold">
                <span>Stop Generating</span>
                <i className="fa-regular fa-stop ms-2 fw-bold"></i>
            </button>
        </div>
    );
}

export default StopGenerating;
