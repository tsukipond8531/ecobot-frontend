import React, { useContext } from 'react';
import ChatItem from '../../components/ChatItem';

import UserContext, { CHATSTATE_START, CHATSTATE_INIT } from '../../hooks/contexts/usercontext';
import { uuid } from '../../utils/utils';

interface Chat {
    id: string;
    title: string;
    mode: string;
    items: any[];
}

interface ChatBoxProps {
    items: Chat[];
    itemActivated?: () => void;
}

export default function ChatBox(props: ChatBoxProps) {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('MyComponent must be used within an AppProvider');
    }

    const { 
        setChatMode, 
        setChatState, 
        setChatId, 
        getChat,
        deleteChat,
        loadChatList,
        setMsgList
    } = context;

    const { items, itemActivated: onItemActivated } = props;

    const itemActivated = async (chatId: string) => {
        const chat = await getChat(chatId);

        if (chat) {
            setChatId(chatId);
            setChatMode(chat.mode);
            setChatState(CHATSTATE_START);
            setMsgList(chat.items);

            onItemActivated && onItemActivated();
        } else {
            console.error(`Chat with ID ${chatId} not found.`);
        }
    };

    const itemDeleted = (chatId: string) => {
        deleteChat(chatId);

        setChatId(uuid());
        setChatState(CHATSTATE_INIT);
        loadChatList();
        setMsgList([]);
    };

    return (
        <div className="chat-box">
            {items?.length > 0 && items.map((it, idx) => (
                <ChatItem chat={it} key={idx} itemActivated={itemActivated} itemDeleted={itemDeleted} />
            ))}
        </div>
    );
}
