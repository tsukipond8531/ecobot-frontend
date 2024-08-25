import React, { useEffect, useRef } from 'react';

import MsgItem from '../../components/MsgItem';
import RateSelector from './rateselector';

import { Message } from '../../types';

interface MessageBoxProps {
    chatId: string;
    items: Message[];
    talks: Message[];
    showRate: boolean;
}

export default function MessageBox(props: MessageBoxProps) {
    const { chatId, items, talks, showRate } = props;
    const chatBoxRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom whenever items or talks are updated
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [items, talks]);

    return (
        <div className="message-box" ref={chatBoxRef}>
            <img src="/assets/logos/logo_1024.png" alt="Background" id="placeholder_img" />
            {items?.length > 0 && items.map((it, idx) => (
                <MsgItem message={it} key={idx} />
            ))}
            {talks?.length > 0 && talks.map((it, idx) => (
                <MsgItem message={it} key={idx} />
            ))}
            <RateSelector chatid={chatId} messages={items} show={showRate} />
        </div>
    );
}
