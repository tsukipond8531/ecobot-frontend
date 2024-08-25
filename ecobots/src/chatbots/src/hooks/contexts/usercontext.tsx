import React, { useState, useEffect, createContext, ReactNode } from 'react';
import Cookies from 'universal-cookie';

import { apiFetchUUID } from '../services/userservice';

import { Message } from '../../types';

// Define types for the context
interface UserContextType {
    chatMode: string;
    setChatMode: React.Dispatch<React.SetStateAction<string>>;
    chatState: string;
    setChatState: React.Dispatch<React.SetStateAction<string>>;
    chatId: string;
    setChatId: React.Dispatch<React.SetStateAction<string>>;
    chatList: ChatItem[];
    setChatList: React.Dispatch<React.SetStateAction<ChatItem[]>>;
    addChat: (chatId: string, mode: string, title: string) => void;
    getChat: (chatId: string) => Promise<ChatItem | null>;
    deleteChat: (chatId: string) => void;
    loadChatList: () => void;
    msgList: Message[];
    setMsgList: React.Dispatch<React.SetStateAction<Message[]>>;
    saveMsg: (chatId: string, role: 'user' | 'assistant', content: string, display?: 'true' | 'false') => Promise<void>;
    talkList: Message[];
    setTalkList: React.Dispatch<React.SetStateAction<Message[]>>;
}

interface ChatItem {
    id: string;
    mode: string;
    title: string;
    items: Message[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const CHATMODE_ECOBOTS = "chatmode_ecobots";
export const CHATMODE_GUIDED = "chatmode_guided";
export const CHATMODE_STANDARD = "chatmode_standard";

export const CHATSTATE_INIT = "chatstate_init";
export const CHATSTATE_START = "chatstate_start";
export const CHATSTATE_GENERATING = "chatstate_generating";

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [chatMode, setChatMode] = useState<string>("");
    const [chatState, setChatState] = useState<string>("");
    const [chatId, setChatId] = useState<string>("");
    const [chatList, setChatList] = useState<ChatItem[]>([]);
    const [msgList, setMsgList] = useState<Message[]>([]);
    const [talkList, setTalkList] = useState<Message[]>([]);

    useEffect(() => {
        const setDeviceUUID = async () => {
            const cookies = new Cookies(null, { path: '/' });

            if (!cookies.get("device_uuid")) {
                const data = await apiFetchUUID();
                cookies.set("device_uuid", data.uuid);
            }
        };

        setDeviceUUID();
    }, []);

    const loadChatList = () => {
        let chats: ChatItem[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("chat:")) {
                let chat = localStorage.getItem(key);
                if (chat) chats.push(JSON.parse(chat) as ChatItem);
            }
        }

        setChatList(chats);
    };

    const addChat = async (chatId: string, mode: string, title: string) => {
        let key = `chat:${chatId}`;
        if (localStorage.getItem(key) == null) {
            let item: ChatItem = {
                id: chatId,
                mode: mode,
                title: title,
                items: [],
            };
            localStorage.setItem(key, JSON.stringify(item));
        }
    };

    const getChat = async (chatId: string): Promise<ChatItem | null> => {
        let key = `chat:${chatId}`;
        let chat = localStorage.getItem(key);
        if (chat != null) return JSON.parse(chat) as ChatItem;
        return null;
    };

    const deleteChat = async (chatId: string) => {
        let key = `chat:${chatId}`;
        localStorage.removeItem(key);
    };

    const saveMsg = async (chatId: string, role: 'user' | 'assistant', content: string, display: 'true' | 'false' = "true") => {
        let key = `chat:${chatId}`;
        let chat = JSON.parse(localStorage.getItem(key)!) as ChatItem;
    
        chat.items.push({ role, content, display });
    
        localStorage.setItem(key, JSON.stringify(chat));
    };

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
                setTalkList,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;