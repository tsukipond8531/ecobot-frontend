import React from 'react';

import './index.css';

const user_image = "/assets/chats/user.png";
const gpt_image = "/assets/chats/ecobot.png";

const md = window.markdownit();

export default function MsgItem (props) {
    const { message } = props;

    const image = message.role === "user" ? user_image : gpt_image;

    return (
        <div className={`message-item ${message.role === "assistant" ? "ecobot" : ""} ${message.display === "false" ? "d-none" : ""} `}>
            <div className="role">
                <img src={image} alt="Avatar"></img>
            </div>
            <div className={`content ${message.display === "loading" ? "d-none" : ""}`} dangerouslySetInnerHTML={{ __html: md.render(message.content) }} >
            </div>
            <div className="content">
                {message.display === "loading" && (<div className="loading"></div>)}
            </div>
        </div>
    )
}