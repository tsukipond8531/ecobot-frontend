import React, { useState, useEffect, createContext } from 'react';
import { useLocation }  from 'react-router-dom';
import Cookies from 'universal-cookie';

import { apiFetchUUID } from 'hooks/services/userservice';

const UserContext = createContext();

export const CHATMODE_ECOBOTS       = "chatmode_ecobots";
export const CHATMODE_GUIDED        = "chatmode_guided";
export const CHATMODE_STANDARD      = "chatmode_standard";

export const CHATSTATE_INIT         = "chatstate_init";
export const CHATSTATE_START        = "chatstate_start";
export const CHATSTATE_GENERATING   = "chatstate_generating";

export const UserProvider = ({children}) => {
    const location = useLocation();
    const [chatMode, setChatMode] = useState("");
    const [chatState, setChatState] = useState("");
    const [chatId, setChatId] = useState("");
    const [chatList, setChatList] = useState([]);
    const [msgList, setMsgList] = useState([]);
    const [talkList, setTalkList] = useState([]);

    useEffect(() => {
        const setDeviceUUID = async () => {
            const cookies = new Cookies(null, { path: '/' });

            if (!cookies.get("device_uuid")) {
                const data = await apiFetchUUID();
    
                cookies.set("device_uuid", data.uuid)
            }
        }

        setDeviceUUID();
    }, []);

    const loadChatList = async () => {
        let chats = [];

    }

    return (
        <UserContext.Provider
            value={{ 
                chatMode, 
                setChatMode, 
                chatState, 
                setChatState, 
                chatId, 
                setChatId,
                chatList,
                setChatList,
                loadChatList,
                msgList,
                setMsgList,
                talkList,
                setTalkList
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;