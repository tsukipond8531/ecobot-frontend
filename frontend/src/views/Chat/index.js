import React, { useContext, useEffect } from 'react';

import ChatButton from 'components/ChatButton';
import ChatBox from './chatbox';
import MessageBox from './messagebox';
import StopGenerating from './stopgenerating';
import ModeSelector from './modeselector';
import UserInput from './userinput';

import UserContext from 'hooks/contexts/usercontext';
import { CHATMODE_ECOBOTS, CHATMODE_GUIDED, CHATMODE_STANDARD } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT } from 'hooks/contexts/usercontext';

import { apiGetGpt } from 'hooks/services/userservice';

import { uuid } from 'utils/utils';

import './index.css';

var gpt_messages = [
    "Hello, what is something ecological you always wanted to do, but were never able to do?", 
    "Hello, what are some small, daily changes people can make to contribute to a healthier planet?", 
    "Hello, how do you feel about the current state of the environment?", 
    "Hello, which sustainable innovations or technologies do you find most promising for the future?", 
    "Hello, how do you envision a sustainable future for our planet?", 
    "Hello, do you think technology can be a solution to some of our biggest environmental issues?"
];

export default function Chat () {
    const { chatMode, setChatMode, setChatState, setChatId, chatList, setChatList, loadChatList, setMsgList } = useContext(UserContext);

    useEffect(() => {
        setChatMode(CHATMODE_ECOBOTS);
        setChatState(CHATSTATE_INIT);
        setChatId("");
    }, [])

    async function new_chat_ecobots () {
        setChatMode(CHATMODE_ECOBOTS);
        setChatState(CHATSTATE_INIT);
        setChatId(uuid());

        const chats = await loadChatList();
        setChatList(chats);
        
        setMsgList([]);
    }

    async function new_chat_guided () {
        setChatMode(CHATMODE_GUIDED);
        setChatState(CHATSTATE_INIT);
        setChatId(uuid());

        const chats = await loadChatList();
        setChatList(chats);

        let msg = gpt_messages[Math.floor(Math.random() * gpt_messages.length)];
        setMsgList([msg]);

    }

    async function handleQuestionSubmit(question) {
        let history = JSON.stringify(["user","Hello.\n"],["assistant","Hello! How are you doing today? Is there anything eco-friendly you'd like to talk about or ask me?"]);
        const data = await apiGetGpt({question, history})
        console.log(data);
    }

    return (
        <div className="container-fluid">
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
                <div className="col col-12 col-md-9 chat-box-container">
                    <div className="h-100">
                        <StopGenerating />
                        <ModeSelector />
                        <MessageBox />
                        <UserInput onSubmit={handleQuestionSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}