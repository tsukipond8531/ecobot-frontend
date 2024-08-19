import React, { useState } from 'react';

import './index.css';

export default function ChatItem (props) {
    const { chat } = props;
    const [ confirm, setConfirm ] = useState(false);

    const handleOpen = () => {
        props.itemActivated && props.itemActivated(chat.id);
    }

    const handleDelete = () => {
        setConfirm(true);
    }

    const handleYes = () => {
        props.itemDeleted && props.itemDeleted(chat.id);
        setConfirm(false);
    }

    const handleNo = () => {
        setConfirm(false);
    }

    return (
        <div className="chat-item">
            <div className="left" onClick={handleOpen} >
                <i className="fa-regular fa-comments fw-bolder"></i>
                <span className="title mx-2">{chat.title}</span>
            </div>
            <i className={`delete fa-regular fa-trash fw-bolder py-auto ${confirm ? "d-none" : ""}`} onClick={handleDelete}></i>
            <div className={`confirm ${confirm ? "" : "d-none"}`}>
                <i className="fa-regular fa-check fw-bolder me-2" onClick={handleYes}></i>
                <i className="fa-regular fa-x fw-bolder" onClick={handleNo}></i>
            </div>
        </div>
    )
}