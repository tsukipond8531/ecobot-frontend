import React from 'react';

import './index.css';

const user_image = "/assets/chats/user.png";
const gpt_image = "/assets/chats/ecobot.png";

const md = window.markdownit();

export default function MsgItem (props) {
    const { message } = props;

    const image = message.role === "user" ? user_image : gpt_image;

    return (
        <div className={`message-item ${message.display === "false" ? "d-none" : ""} ${message.role === "assistant" ? "ecobot" : ""}`}>
            <div className="role">
                <img src={image} alt="Avatar"></img>
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: md.render(message.content) }} >
            </div>
        </div>
    )
}