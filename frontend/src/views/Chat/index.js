import React from 'react';

import ChatButton from 'components/ChatButton';
import StopGenerating from './stopgenerating';
import ModeSelector from './modeselector';

import './index.css';

export default function Chat () {
    function new_conversation () {
        console.log("a");
    }

    function new_conversation_guided () {

    }

    return (
        <div className="container-fluid">
            <div className="row chat-container">
                <div className="col col-12 col-md-3 d-md-block d-none sidebar-container">
                    <div className="sidebar-top">
                        <div className="chat-tool-container">
                            <ChatButton title="New Empty Conversation" icon="fa-plus-circle" onClick={new_conversation} />
                            <ChatButton title="New Guided Conversation" icon="fa-plus-hexagon" onClick={new_conversation_guided} />
                        </div>
                        <div className="spinner"></div>
                    </div>
                </div>
                <div className="col col-12 col-md-9 chat-box-container">
                    <div className="h-100">
                        <StopGenerating />
                        <ModeSelector />
                        <div className="chat-box">
                            <img src="/assets/logos/logo_1024.png" id="placeholder_img"/>
                        </div>
                        <div className="user-input h-auto">
                            <div className="box input-box">
                                <textarea id="message-input" placeholder="Ask a question" cols="30" rows="10"></textarea>
                                <div id="send-button">
                                    <i className="fa fa-paper-plane-top fa-regular"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}