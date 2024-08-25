import React from 'react';
import ChatBox from './chatbox';

// Define the type for props
interface ChatNavbarProps {
    chats: any[]; // Replace `any` with the appropriate type for chat items
    onAddClick?: () => void;
}

const ChatNavbar: React.FC<ChatNavbarProps> = (props) => {
    const { chats, onAddClick } = props;

    const handleClick = () => {
        onAddClick && onAddClick();
    };

    const handleActivate = () => {
        const offcanvasElement = document.getElementById("chatNavbarToggler");
        if (offcanvasElement) {
            const offcanvasInstance = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
            offcanvasInstance.hide(); // Close offcanvas when a link is clicked
        }
    };

    return (
        <div className="chat-navbar">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-success border-bottom d-flex d-md-none">
                <div className="container-fluid d-flex">
                    <a className="navbar-brand order-1 order-lg-0" href="/">
                        <p className="my-auto fw-normal fs-5">Welcome to EcoBots</p>
                    </a>
                    <div className="d-flex order-2 order-lg-2">
                        <button className="btn btn-outline-success fw-semibold text-white" onClick={handleClick}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button
                        className="navbar-toggler order-0 border-0"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#chatNavbarToggler"
                        aria-controls="chatNavbarToggler"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon me-1"></span>
                    </button>
                    <div className="offcanvas offcanvas-top flex-row navbar-collapse order-lg-1" id="chatNavbarToggler">
                        <div className="offcanvas-body">
                            <ChatBox items={chats} itemActivated={handleActivate} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default ChatNavbar;
