import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ChatNavbar from './navbar';
import ChatButton from 'components/ChatButton';
import ChatBox from './chatbox';
import MessageBox from './messagebox';
import StopGenerating from './stopgenerating';
import ModeSelector from './modeselector';
import UserInput from './userinput';

import UserContext from 'hooks/contexts/usercontext';
import { CHATMODE_ECOBOTS, CHATMODE_GUIDED } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT, CHATSTATE_START } from 'hooks/contexts/usercontext';

import { apiGetGpt } from 'hooks/services/userservice';

import { uuid } from 'utils/utils';

import './index.css';
import { CHATSTATE_GENERATING } from 'hooks/contexts/usercontext';

var gpt_messages = [
    "Hello, what is something ecological you always wanted to do, but were never able to do?", 
    "Hello, what are some small, daily changes people can make to contribute to a healthier planet?", 
    "Hello, how do you feel about the current state of the environment?", 
    "Hello, which sustainable innovations or technologies do you find most promising for the future?", 
    "Hello, how do you envision a sustainable future for our planet?", 
    "Hello, do you think technology can be a solution to some of our biggest environmental issues?"
];

export default function Chat () {
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
    } = useContext(UserContext);

    const [reqMessage, setReqMessage] = useState("");

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
    }, [])

    useEffect(() => {
        handleQuestionSubmit(reqMessage);
    }, [reqMessage])

    function addMsg (role, content, display="true") {
        let list = msgList;
        let message = {role, content, display};
        list.push(message);
        return list;
    }

    function getHistory () {
        let history = [];
        msgList.forEach(e => {
            const item = [e.role, e.content];
            history.push(item);
        });

        return JSON.stringify(history);
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function new_chat_ecobots () {
        setChatState(CHATSTATE_INIT);
        setChatId(uuid());

        loadChatList();
        
        setMsgList([]);
    }

    async function new_chat_guided () {
        setChatMode(CHATMODE_GUIDED);
        setChatState(CHATSTATE_START);
        setChatId(uuid());

        loadChatList();
        
        let list = [];

        let msg = "Start a conversation with me about sth ecological.";
        list.push({role: "user", content: msg, display: "false"});

        msg = gpt_messages[Math.floor(Math.random() * gpt_messages.length)];
        list.push({role: "assistant", content: msg, display: "true"});
        setMsgList(list);

    }

    async function handleQuestionSubmit(question) {
        if (chatId === "" || question === "")
            return;

        let history = getHistory();

        let list = [];
        list.push({role: "user", content: question, display: "true"});
        list.push({role: "assistant", content: "", display: "loading"});
        setTalkList(list);

        addChat(chatId, chatMode, question.substr(0, 20));
        loadChatList();

        const req = apiGetGpt({
            mode: chatMode,
            question, 
            history
        })

        setChatState(CHATSTATE_GENERATING);

        req.then(res => {

            list = addMsg("user", question);
            saveMsg(chatId, "user", question);
            setMsgList(list);
    
            list = addMsg("assistant", res.answer);
            saveMsg(chatId, "assistant", res.answer);
            setMsgList(list);
    
            setTalkList([]);
            setChatState(CHATSTATE_START);
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
                        <MessageBox items={msgList} talks={talkList} />
                        <UserInput onSubmit={handleQuestionSubmit} onGuidedStart={new_chat_guided} />
                    </div>
                </div>
            </div>
        </div>
    )
}