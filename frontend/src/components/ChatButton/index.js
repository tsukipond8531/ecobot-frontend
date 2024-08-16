import React from 'react';

import './index.css';

export default function ChatButton (props) {
    let icon = `fa ${props?.icon} fa-regular`;

    function buttonClicked () {
        props.onClick && props.onClick();
    }

    return (
        <button type="button" className="button new_chat_button fs-6" onClick={buttonClicked}>
            <i className={icon}></i>
            <span className="button_text">{props?.title}</span>
        </button>
    )
}