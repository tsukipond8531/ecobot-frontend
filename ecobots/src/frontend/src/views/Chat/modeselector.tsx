import React, { useRef, useEffect, useContext } from 'react';
import UserContext, { CHATMODE_ECOBOTS, CHATMODE_GUIDED, CHATMODE_STANDARD, CHATSTATE_INIT } from '../../hooks/contexts/usercontext';

const ModeSelector: React.FC = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('MyComponent must be used within an AppProvider');
    }
    
    const { 
        chatMode, 
        setChatMode, 
        chatState, 
        setChatState 
    } = context

    const modeEcobotsRef = useRef<HTMLButtonElement>(null);
    const modeGuidedRef = useRef<HTMLButtonElement>(null);
    const modeStandardRef = useRef<HTMLButtonElement>(null);

    const handleChatMode = (mode: string, ref: React.RefObject<HTMLButtonElement>) => {
        if (chatMode !== mode) {
            setChatMode(mode);
            setChatState(CHATSTATE_INIT);
        }
        
        ref.current?.focus();
    };

    useEffect(() => {
        if (modeEcobotsRef.current) {
            window.bootstrap.Popover(modeEcobotsRef.current, {
                title: "Our most accurate model teaching you about local and global ecology.",
                content: "Available to all users for free.",
                trigger: "focus",
                placement: "bottom",
                customClass: "custom-popover",
            });
        }

        if (modeGuidedRef.current) {
            window.bootstrap.Popover(modeGuidedRef.current, {
                title: "Use our Standard model will ask you questions about ecology and sustainability.",
                content: "Available to all users for free.",
                trigger: "focus",
                placement: "bottom",
                customClass: "custom-popover",
            });
        }

        if (modeStandardRef.current) {
            window.bootstrap.Popover(modeStandardRef.current, {
                title: "Standard model assisting you with everyday inquiries.",
                content: "Available to all users for free.",
                trigger: "focus",
                placement: "bottom",
                customClass: "custom-popover",
            });
        }
    }, []);

    return (
        <div className={`mode-selector-container w-lg-50 w-75 ${chatState !== CHATSTATE_INIT ? "d-none" : ""}`}>
            <div className="mode-selector">
                <button 
                    className={`btn btn-success mode-button ${chatMode === CHATMODE_ECOBOTS ? "active" : ""}`} 
                    ref={modeEcobotsRef}
                    onClick={() => handleChatMode(CHATMODE_ECOBOTS, modeEcobotsRef)}
                >
                    EcoBots
                </button>
                <button 
                    className={`btn btn-success mode-button ${chatMode === CHATMODE_GUIDED ? "active" : ""}`} 
                    ref={modeGuidedRef}
                    onClick={() => handleChatMode(CHATMODE_GUIDED, modeGuidedRef)}
                >
                    Guided
                </button>
                <button 
                    className={`btn btn-success mode-button ${chatMode === CHATMODE_STANDARD ? "active" : ""}`} 
                    ref={modeStandardRef} 
                    onClick={() => handleChatMode(CHATMODE_STANDARD, modeStandardRef)}
                >
                    Standard
                </button>
            </div>
        </div>
    );
}

export default ModeSelector;
