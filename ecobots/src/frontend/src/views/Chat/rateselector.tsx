import React, { useEffect, useState } from 'react';
import { apiSetRate } from '../../hooks/services/userservice';

interface Message {
    content: string;
}

interface RateSelectorProps {
    chatid: string;
    messages: Message[];
    show: boolean;
}

export default function RateSelector(props: RateSelectorProps) {
    const { chatid, messages, show } = props;

    const [rate, setRate] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        setRate("");
        setCopied(false);
    }, [show]);

    const handleLike = async () => {
        await apiSetRate({
            chatid,
            rate: "like",
        });
        setRate("like");
    }

    const handleDislike = async () => {
        await apiSetRate({
            chatid,
            rate: "dislike",
        });
        setRate("dislike");
    }

    const handleCopy = () => {
        const msg = messages.length > 0 ? messages[messages.length - 1] : { content: "" };
        navigator.clipboard.writeText(msg.content);
        setCopied(true);
    }

    return (
        <div className={`rate-section message-item ${show ? "" : "d-none"}`}>
            <div className={`badge badge_like ${rate === "" ? "text-bg-primary" : rate === "like" ? "text-bg-success" : "text-bg-secondary"}`} role="button" onClick={handleLike}>
                <i className="fa-thumbs-up far" aria-hidden="true"></i> Rate
            </div>
            <div className={`badge badge_dislike ${rate === "" ? "text-bg-danger" : rate === "like" ? "text-bg-secondary" : "text-bg-success"}`} role="button" onClick={handleDislike}>
                <i className="fa-thumbs-down far" aria-hidden="true"></i> Rate
            </div>
            <div className="badge badge_copy text-bg-secondary" role="button" onClick={handleCopy}>
                <i className="fa-copy far" aria-hidden="true"></i> {copied ? "Text copied!" : "Copy"}
            </div>
        </div>
    );
}
