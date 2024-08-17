import React, { useContext, useEffect } from 'react';

import ChatButton from 'components/ChatButton';
import ChatBox from './chatbox';
import StopGenerating from './stopgenerating';
import ModeSelector from './modeselector';
import UserInput from './userinput';

import UserContext from 'hooks/contexts/usercontext';
import { CHATMODE_ECOBOTS, CHATMODE_GUIDED, CHATMODE_STANDARD } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT } from 'hooks/contexts/usercontext';

import { uuid } from 'utils/utils';

import './index.css';

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

        setMsgList([]);
        setChatList([]);

        await loadChatList();
    }

    async function new_chat_guided () {

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
                        <div className="chat-box">
                            <img src="/assets/logos/logo_1024.png" alt="Background" id="placeholder_img"/>
                        </div>
                        <UserInput />
                    </div>
                </div>
            </div>
        </div>
    )
}