import React from 'react';

export default function ChatBox (props) {
    const { items } = props;

    return (
        <>
        {items?.length > 0 && items.map((it) => (
            <div>
                
            </div>
        ))}
        </>
    )
}