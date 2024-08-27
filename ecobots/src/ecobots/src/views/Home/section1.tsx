import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

import { CHATBOT_URL } from '../../App';

export default function Section1() {
    const [message, setMessage] = useState<string>("");

    const handleSendClick = () => {
        if (message != "") {
            const encodedMessage = encodeURIComponent(message);
            window.location.href = `${CHATBOT_URL}/?message=${encodedMessage}`;
        }
    };

    const handleKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
        if (evt.key === 'Enter' && !evt.shiftKey) {
            evt.preventDefault();
            if (message != "") {
                const encodedMessage = encodeURIComponent(message);
                window.location.href = `${CHATBOT_URL}/?message=${encodedMessage}`;
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    return (
        <section>
            <div className="container pb-5">
                <div className="row d-flex flex-wrap justify-content-center align-items-start">
                    <div className="col col-12 col-lg-5 mx-auto ms-lg-0 mb-4 mb-lg-0 pt-3 pt-md-4 pt-lg-5">
                        <div className="text-center text-lg-start">
                            <h2 className="u-text-4xl mb-3">
                                AI for <br /> <span className="u-text-mark">Ecology!</span>
                            </h2>
                            <p className="u-text-lg mb-5">
                                EcoBots is a chatbot offering insights on environmental issues, eco-education, and funding for ecological initiatives.
                            </p>
                            <div className="w-100 mx-auto mb-6">
                                <img
                                    className="maxw-2"
                                    src="assets/images/ask_question.png"
                                    srcSet="assets/images/ask_question.png"
                                    loading="lazy"
                                    alt="Ask Question"
                                />
                                <div className="maxw-6 mx-auto d-flex flex-column">
                                    <input type="hidden" name="source_id" value="Home-animation" />
                                    <input type="hidden" name="source_url" value="https://www.ecobots.ai/" />
                                    <input type="hidden" name="source_type" value="website" />
                                    <div className="d-flex m-auto w-100">
                                        <textarea
                                            id="demo_question_text"
                                            className="v--signup"
                                            placeholder="Ask something ecological ..."
                                            value={message}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <button
                                            id="demo_question_button"
                                            className="pointer"
                                            onClick={handleSendClick}
                                        >
                                            <div id="send-button">
                                                <i className="fa-regular fa-paper-plane-top"></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 mb-4 text-center text-lg-start u-text-p7">
                                    <span className="d-inline-block me-2 pb-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" className="me-2">
                                            <path
                                                d="M9.1.3L4 5.4l-2-2c-.3-.3-.7-.4-1-.3S0 3.5 0 4c0 .4 0 .8.3 1l2.8 2.8c.2.2.5.3.8.3s.6-.1.8-.3l6-5.9c.3-.2.4-.6.3-1a1 1 0 0 0-.8-.8c-.4 0-.8 0-1 .3z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        For every 10 questions, we plant 1 tree! 🌳
                                    </span>
                                </p>
                            </div>
                            <div className="w-100 d-flex flex-column flex-lg-row justify-content-start align-items-center">
                                <p className="u-text-xl text-body-emphasis mb-2 mb-lg-0">
                                    Powered by data from:
                                </p>
                                <img
                                    className="maxw-4 ms-lg-4"
                                    src="assets/images/companies.6e0fe351605d1f1344408894defb929e887e3f228037dab0d6f19abb858e9a34.png"
                                    srcSet="assets/images/companies_huf5a8460ee35e2e2e56c3937ed66d5d30_5828_360x0_resize_lanczos_3.png 360w, assets/images/companies_huf5a8460ee35e2e2e56c3937ed66d5d30_5828_454x0_resize_lanczos_3.png 454w, assets/images/companies_huf5a8460ee35e2e2e56c3937ed66d5d30_5828_548x0_resize_lanczos_3.png 548w, assets/images/companies_huf5a8460ee35e2e2e56c3937ed66d5d30_5828_642x0_resize_lanczos_3.png 642w, assets/images/companies_huf5a8460ee35e2e2e56c3937ed66d5d30_5828_736x0_resize_lanczos_3.png 736w"
                                    alt="Known brands use LiveChat"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-7">
                        <div className="d-relative d-none d-md-block" style={{ maxHeight: 640 }}>
                            <video
                                preload="none"
                                loop
                                playsInline
                                autoPlay
                                muted
                                src="assets/videos/ecobots.mp4"
                                style={{ width: "100%", aspectRatio: "736/640" }}
                                title=""
                                data-lazyplay-target="video"
                                poster="/assets/images/ecobots.jpg"
                            ></video>
                        </div>
                        <img
                            className="d-block d-md-none maxw-6 mx-auto"
                            src="assets/images/ecobots.jpg"
                            srcSet="assets/images/ecobots.jpg"
                            alt="Live chat app view"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
