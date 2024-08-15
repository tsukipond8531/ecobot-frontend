import React from 'react';

export default function Section3 () {
    return (
        <section>
            <div>
                <div className="py-5" style={{backgroundColor: "#177f4e"}}>
                    <div className="container">
                        <div className="row d-flex flex-column-reverse flex-lg-row">
                            <div className="col col-12 col-lg-6 text-white">
                                <p className="fs-3 fw-bold lh-sm my-5 mt-lg-0">
                                    <span className="d-inline-block" style={{marginLeft: "-1rem"}}>“</span>From programming to entrepreneurship, my path has been about impact. Each question to our chatbot is a step towards a greener future. Together, we're making change through technology.
                                </p>
                                <p className="fs-5 fw-normal"><strong className="fs-5 fw-semibold">Robin Krambroeckers</strong>,<br/>Founder at EcoBots</p>
                            </div>
                            <div className="col col-12 col-lg-6 mt-5 mt-lg-0">
                                <img src="/assets/images/robinkbr.png" srcSet="/assets/images/robinkbr.png" alt="Robin Krambroeckers" className="maxw-5" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <svg viewBox="0 0 1440 36" className="d-block w-100 h-auto" xmlns="http://www.w3.org/2000/svg" style={{margin: "-1px 0"}}>
                        <rect className="w-100 h-100" fill="#177f4e"></rect>
                        <path d="M1440 36V8.2s-105.6-1.2-160.7-6a877 877 0 00-150.5 2.5c-42.1 3.9-140 15-223 15C754 19.6 700.3 6.8 548.8 7c-143.7 0-273.4 11.5-350 12.6-76.6 1.2-198.8 0-198.8 0V36h1440z" fill="white"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}