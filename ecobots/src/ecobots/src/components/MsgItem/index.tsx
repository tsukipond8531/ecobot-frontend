import React from 'react';
import MarkdownIt from 'markdown-it';
import './index.css';

import { Message } from '../../types';

const user_image = "/assets/chats/user.png";
const gpt_image = "/assets/chats/ecobot.png";

const md = new MarkdownIt();

interface MsgItemProps {
    message: Message;
}

export default function MsgItem({ message }: MsgItemProps) {
    const image = message.role === "user" ? user_image : gpt_image;

    return (
        <div className={`message-item ${message.role === "assistant" ? "ecobot" : ""} ${message.display === "false" ? "d-none" : ""}`}>
            <div className="role">
                <img src={image} alt="Avatar"></img>
            </div>
            <div className={`content ${message.display === "loading" ? "d-none" : ""}`} dangerouslySetInnerHTML={{ __html: md.render(message.content) }} />
            <div className="content">
                {message.display === "loading" && <div className="loading"></div>}
            </div>
        </div>
    );
}
