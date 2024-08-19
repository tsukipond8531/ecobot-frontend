import React from 'react';

import MsgItem from 'components/MsgItem';

export default function MessageBox (props) {
    const { items, talks } = props;

    return (
        <div className="chat-box">
            <img src="/assets/logos/logo_1024.png" alt="Background" id="placeholder_img"/>
            {items?.length > 0 && items.map((it, idx) => (
                <MsgItem message={it} key={idx} />
            ))}
            {talks?.length > 0 && talks.map((it, idx) => (
                <MsgItem message={it} key={idx} />
            ))}
        </div>
    )
}