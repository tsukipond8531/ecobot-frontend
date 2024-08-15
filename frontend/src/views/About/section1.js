import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

export default function Section1 () {
    return (
        <section className="mb-5 mb-md-2 pt-3 pt-md-2 pt-lg-5 d-relative">
            <div className="container d-relative">
                <div className="row">
                    <div className="col col-12 col-lg-6 text-center text-lg-start mt-5">
                        <h1 className="fs-1 fw-bold lh-1 mb-4"><mark data-controller="mark-text" className="u-text-highlight accent active">About us</mark></h1>
                        <p class="fs-3 fw-normal lh-sm maxw-6 mb-3 mx-auto mx-lg-0">At EcoBots, we believe in harnessing the power of technology to foster a greener, more sustainable future.</p>
                        <div className="w-100 mx-auto mb-6">
                            <div className="maxw-6 mx-auto d-flex flex-column">
                                <input type="hidden" name="source_id" value="Home-animation" />
                                <input type="hidden" name="source_url" value="https://www.ecobots.ai/" />
                                <input type="hidden" name="source_type" value="website" />
                                <div className="d-flex m-auto w-100">
                                    <textarea id="demo_question_text" className="v--signup" href="https://chat.ecobots.ai" placeholder="Ask something ecological ..."></textarea>
                                    <button id="demo_question_button" type="submit" className="pointer" href="https://chat.ecobots.ai">
                                        <div id="send-button">
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2 mb-4 text-center text-lg-start fs-6 fw-normal">
                                <span className="d-inline-block me-2 pb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" className="me-2">
                                        <path d="M9.1.3L4 5.4l-2-2c-.3-.3-.7-.4-1-.3S0 3.5 0 4c0 .4 0 .8.3 1l2.8 2.8c.2.2.5.3.8.3s.6-.1.8-.3l6-5.9c.3-.2.4-.6.3-1a1 1 0 0 0-.8-.8c-.4 0-.8 0-1 .3z" fill="currentColor">
                                        </path>
                                    </svg>
                                    For every 10 questions, we plant 1 tree! 🌳
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-6">
                        
                    </div>
                </div>
            </div>
        </section>
    )
}