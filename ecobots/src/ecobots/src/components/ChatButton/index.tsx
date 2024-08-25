import React from 'react';

import './index.css';

interface ChatButtonProps {
    icon?: string;
    title?: string;
    onClick?: () => void;
}

export default function ChatButton({ icon = '', title = '', onClick }: ChatButtonProps) {
    const iconClass = `fa ${icon} fa-regular`;

    function buttonClicked() {
        if (onClick) {
            onClick();
        }
    }

    return (
        <button type="button" className="button new_chat_button fs-6" onClick={buttonClicked}>
            <i className={iconClass}></i>
            <span className="button_text">{title}</span>
        </button>
    );
}
