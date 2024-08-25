import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ChatNavbar from './navbar';
import ChatButton from '../../components/ChatButton';
import ChatBox from './chatbox';
import MessageBox from './messagebox';
import StopGenerating from './stopgenerating';
import ModeSelector from './modeselector';
import UserInput from './userinput';

import UserContext from '../../hooks/contexts/usercontext';
import { CHATMODE_ECOBOTS, CHATMODE_GUIDED } from '../../hooks/contexts/usercontext';
import { CHATSTATE_INIT, CHATSTATE_START, CHATSTATE_GENERATING } from '../../hooks/contexts/usercontext';

import { apiGetGpt, apiSaveMessage } from '../../hooks/services/userservice';

import { uuid } from '../../utils/utils';

import { Message } from '../../types';

import './index.css';

var gpt_messages = [
    "Hello, what is something ecological you always wanted to do, but were never able to do?", 
    "Hello, what are some small, daily changes people can make to contribute to a healthier planet?", 
    "Hello, how do you feel about the current state of the environment?", 
    "Hello, which sustainable innovations or technologies do you find most promising for the future?", 
    "Hello, how do you envision a sustainable future for our planet?", 
    "Hello, do you think technology can be a solution to some of our biggest environmental issues?"
];

// Define Message and Chat interfaces

interface Chat {
    id: string;
    mode: string;
    lastMessage: string;
}

// Define the component's props interface
interface ChatProps {
    chatMode: typeof CHATMODE_ECOBOTS | typeof CHATMODE_GUIDED;
    setChatMode: (mode: typeof CHATMODE_ECOBOTS | typeof CHATMODE_GUIDED) => void;
    setChatState: (state: typeof CHATSTATE_INIT | typeof CHATSTATE_START | typeof CHATSTATE_GENERATING) => void;
    chatId: string;
    setChatId: (id: string) => void;
    chatList: Chat[];
    addChat: (id: string, mode: string, lastMessage: string) => void;
    loadChatList: () => void;
    msgList: Message[];
    setMsgList: (messages: Message[]) => void;
    saveMsg: (chatId: string, role: 'user' | 'assistant', content: string) => void;
    talkList: Message[];
    setTalkList: (messages: Message[]) => void;
}

export default function Chat() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('MyComponent must be used within an AppProvider');
    }

    const { 
        chatMode, 
        setChatMode, 
        setChatState, 
        chatId,
        setChatId, 
        chatList, 
        addChat, 
        loadChatList, 
        msgList, 
        setMsgList, 
        saveMsg, 
        talkList, 
        setTalkList 
    } = context

    const [reqMessage, setReqMessage] = useState<string>("");
    const [showRate, setShowRate] = useState<boolean>(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");

    useEffect(() => {
        if (message) {
            setChatMode(CHATMODE_ECOBOTS);
            setChatState(CHATSTATE_START);
            setChatId(uuid());
    
            loadChatList();
            setMsgList([]);
            setReqMessage(message);
        } else {
            setChatMode(CHATMODE_ECOBOTS);
            setChatState(CHATSTATE_INIT);
            setChatId(uuid());
    
            loadChatList();
            setMsgList([]);
            setReqMessage("");
        }
    }, [message]);

    useEffect(() => {
        handleQuestionSubmit(reqMessage);
    }, [reqMessage]);

    function getHistory(): string {
        let history: [string, string][] = [];
        msgList.forEach(e => {
            const item: [string, string] = [e.role, e.content];
            history.push(item);
        });
        return JSON.stringify(history);
    }

    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    async function new_chat_ecobots() {
        setChatState(CHATSTATE_INIT);
        setChatId(uuid());

        loadChatList();
        setMsgList([]);
        setShowRate(false);
    }

    async function new_chat_guided() {
        setChatMode(CHATMODE_GUIDED);
        setChatState(CHATSTATE_START);
        setChatId(uuid());

        loadChatList();
        
        let list: Message[] = [];
        let msg = "Start a conversation with me about sth ecological.";
        list.push({ role: "user", content: msg, display: "false" });

        msg = gpt_messages[Math.floor(Math.random() * gpt_messages.length)];
        list.push({ role: "assistant", content: msg, display: "true" });
        setMsgList(list);
        setShowRate(false);
    }

    async function handleQuestionSubmit(question: string) {
        if (chatId === "" || question === "")
            return;
        
        setShowRate(false);
        setChatState(CHATSTATE_GENERATING);

        let history = getHistory();

        let list: Message[] = [];
        await sleep(200);
        list.push({ role: "user", content: question, display: "true" });
        setTalkList(list);

        await sleep(200);
        list.push({ role: "assistant", content: "", display: "loading" });
        setTalkList(list);

        addChat(chatId, chatMode, question.substr(0, 20));
        loadChatList();

        const req = apiGetGpt({
            mode: chatMode,
            question,
            history
        });

        await sleep(200);
        req.then(res => {
            list = msgList;

            let message: Message;
            message = { role: "user", content: question, display: "true" };
            list.push(message);
            saveMsg(chatId, "user", question);
            setMsgList(list);
    
            message = { role: "assistant", content: res.answer, display: "true" };
            list.push(message);
            saveMsg(chatId, "assistant", res.answer);
            setMsgList(list);

            apiSaveMessage({
                chatid: chatId,
                messages: [question, res.answer]
            }).then();

            setTalkList([]);
            setChatState(CHATSTATE_START);
            setShowRate(true);
        });
    }

    return (
        <div className="container-fluid">
            <ChatNavbar chats={chatList} onAddClick={new_chat_ecobots} />
            <div className="row chat-container">
                <div className="col col-12 col-md-3 d-md-block d-none sidebar-container">
                    <div className="sidebar-top">
                        <div className="chat-tool-container">
                            <ChatButton title="New Empty Conversation" icon="fa-plus-circle" onClick={new_chat_ecobots} />
                            <ChatButton title="New Guided Conversation" icon="fa-plus-hexagon" onClick={new_chat_guided} />
                        </div>
                        <ChatBox items={chatList} />
                        <div className="spinner"></div>
                    </div>
                </div>
                <div className="col col-12 col-md-9 message-box-container">
                    <div className="h-100">
                        <StopGenerating />
                        <ModeSelector />
                        <MessageBox chatId={chatId} items={msgList} talks={talkList} showRate={showRate} />
                        <UserInput onSubmit={handleQuestionSubmit} onGuidedStart={new_chat_guided} />
                    </div>
                </div>
            </div>
        </div>
    );
}
