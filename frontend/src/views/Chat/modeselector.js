import React, { useRef, useEffect, useContext } from 'react';

import UserContext from 'hooks/contexts/usercontext';
import { CHATMODE_ECOBOTS, CHATMODE_GUIDED, CHATMODE_STANDARD } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT } from 'hooks/contexts/usercontext';

export default function ModeSelector () {

    const { chatMode, setChatMode, chatState, setChatState } = useContext(UserContext);

    const modeEcobotsRef = useRef();
    const modeGuidedRef = useRef();
    const modeStandardRef = useRef();

    const handleChatMode = (mode, ref) => {
        if (chatMode !== mode) {
            setChatMode(mode);
            setChatState(CHATSTATE_INIT)
        }
        
        ref.current.focus();
    }

    useEffect(() => {
        new window.bootstrap.Popover(modeEcobotsRef.current, {
            title: "Our most accurate model teaching you about local and global ecology.",
            content: "Available to all users for free.",
            trigger: "focus",
            placement: "bottom",
            customClass: "custom-popover",
        })
        
        new window.bootstrap.Popover(modeGuidedRef.current, {
            title: "Use our Standard model will ask you questions about ecology and sustainablility.",
            content: "Available to all users for free.",
            trigger: "focus",
            placement: "bottom",
            customClass: "custom-popover",
        })
        
        new window.bootstrap.Popover(modeStandardRef.current, {
            title: "Standard model assisting you with everyday inquiries.",
            content: "Available to all users for free.",
            trigger: "focus",
            placement: "bottom",
            customClass: "custom-popover",
        })
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
    )
}