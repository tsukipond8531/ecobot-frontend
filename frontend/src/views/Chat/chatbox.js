import React, { useContext } from 'react';
import ChatItem from 'components/ChatItem';

import UserContext from 'hooks/contexts/usercontext';
import { CHATSTATE_START } from 'hooks/contexts/usercontext';
import { CHATSTATE_INIT } from 'hooks/contexts/usercontext';


import { uuid } from 'utils/utils';

export default function ChatBox (props) {
    const { 
        setChatMode, 
        setChatState, 
        setChatId, 
        getChat,
        deleteChat,
        loadChatList,
        setMsgList
    } = useContext(UserContext);

    const { items } = props;

    const itemActivated = async (chatId) => {
        let chat = await getChat(chatId);

        setChatId(chatId);
        setChatMode(chat.mode);
        setChatState(CHATSTATE_START);
        setMsgList(chat.items);

        props.itemActivated && props.itemActivated();
    }

    const itemDeleted = (chatId) => {
        deleteChat(chatId);

        setChatId(uuid());
        setChatState(CHATSTATE_INIT);
        loadChatList();
        setMsgList([]);
    }

    return (
        <div className="chat-box">
            {items?.length > 0 && items.map((it, idx) => (
                <ChatItem chat={it} key={idx} itemActivated={itemActivated} itemDeleted={itemDeleted}/>
            ))}
        </div>
    )
}