import React, { useState, useEffect, createContext } from 'react';
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

    const loadChatList = () => {
        let chats = [];

        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith("chat:")) {
                let chat = localStorage.getItem(localStorage.key(i));
                chats.push(JSON.parse(chat));
            }
        }

        setChatList(chats);
    }

    const addChat = async (chatId, mode, title) => {
        let key = `chat:${chatId}`;
        if (localStorage.getItem(key) == null) {
            let item = {
                id: chatId,
                mode: mode,
                title: title,
                items: [],
            }
            localStorage.setItem(key, JSON.stringify(item));
        }
    }

    const getChat = async (chatId) => {
        let key = `chat:${chatId}`;
        let chat = localStorage.getItem(key);
        if (chat != null)
            return JSON.parse(chat);
        return null;
    }

    const deleteChat = async (chatId) => {
        let key = `chat:${chatId}`;
        localStorage.removeItem(key);
    }

    const saveMsg = async (chatId, role, content, display = "true") => {
        let key = `chat:${chatId}`;
        let chat = JSON.parse(localStorage.getItem(key));

        chat.items.push({role, content, display});

        localStorage.setItem(key, JSON.stringify(chat));
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
                addChat, 
                getChat, 
                deleteChat,
                loadChatList,
                msgList,
                setMsgList,
                saveMsg, 
                talkList,
                setTalkList
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;