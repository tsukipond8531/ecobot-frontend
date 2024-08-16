import React from 'react';

import './index.css';

export default function ChatButton (props) {
    let icon = "fa fa-regular " + (props.icon && props.icon);

    function buttonClicked () {
        props.onClick && props.onClick();
    }

    return (
        <button type="button" className="button new_chat_button fs-6" onClick={buttonClicked}>
            <i className={icon}></i>
            <span className="button_text">{props.title && props.title}</span>
        </button>
    )
}