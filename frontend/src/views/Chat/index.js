import React, { useContext, useEffect } from 'react';

import ChatButton from 'components/ChatButton';
import ChatBox from './chatbox';
import MessageBox from './messagebox';
import StopGenerating from './stopgenerating';
import ModeSelector from './modeselector';
import UserInput from './userinput';

import UserContext from 'hooks/contexts/usercontext';
import { CHATMODE_ECOBOTS, CHATMODE_GUIDED, CHATMODE_STANDARD } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT, CHATSTATE_START } from 'hooks/contexts/usercontext';

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
    const { chatMode, setChatMode, setChatState, setChatId, chatList, setChatList, loadChatList, msgList, setMsgList, talkList, setTalkList } = useContext(UserContext);

    useEffect(() => {
        setChatMode(CHATMODE_ECOBOTS);
        setChatState(CHATSTATE_INIT);
        setChatId("");
    }, [])

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
        setChatState(CHATSTATE_START);
        setChatId(uuid());

        const chats = await loadChatList();
        setChatList(chats);

        let msg = "Start a conversation with me about sth ecological.";
        let list = addMsg("user", msg, "false");
        setMsgList(list);

        msg = gpt_messages[Math.floor(Math.random() * gpt_messages.length)];
        list = addMsg("assistant", msg);
        setMsgList(list);

    }

    async function handleQuestionSubmit(question) {
        let history = getHistory();

        let list = [];
        list.push({role: "user", content: question, display: "true"});
        list.push({role: "assistant", content: "", display: "true"});
        setTalkList(list);

        const data = await apiGetGpt({
            mode: chatMode,
            question, 
            history
        })

        list = addMsg("user", question);
        setMsgList(list);

        list = addMsg("assistant", data.answer);
        setMsgList(list);

        setTalkList([]);
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
                        <MessageBox items={msgList} talks={talkList} />
                        <UserInput onSubmit={handleQuestionSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}