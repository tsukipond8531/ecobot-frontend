import React, { useState, useEffect, createContext } from 'react';
import { useLocation }  from 'react-router-dom';

const UserContext = createContext();

export const CHATMODE_ECOBOTS   = "chatmode_ecobots";
export const CHATMODE_GUIDED    = "chatmode_guided";
export const CHATMODE_STANDARD  = "chatmode_standard";

export const CHATSTATE_INIT     = "chatstate_init";
export const CHATSTATE_START    = "chatstate_start";

export const UserProvider = ({children}) => {
    const location = useLocation();
    const [chatMode, setChatMode] = useState("");
    const [chatState, setChatState] = useState("");

    useEffect(() => {

    }, []);

    return (
        <UserContext.Provider
            value={{ chatMode, setChatMode, chatState, setChatState }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;