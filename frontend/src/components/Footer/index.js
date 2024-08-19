import React from 'react';

import './index.css';

export default function Footer () {
    return (
        <footer className="pt-1 bg-gray" style={{backgroundColor: "#F5F6F8"}}>
            <div className="container">
                <div className="d-flex pt-2 copyright">
                    <p className="mt-2 mt-lg-0 mb-3 fw-semibold">Get the EcoBots App</p>
                    <p>
                        <a href="/" className="text-decoration-none text-reset u-text-xs d-flex align-items-center u-w-fit">
                            <svg style={{width: 15, height: 15}} xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><path d="M7.57 14.51c1.12-.15 2.1-1.31 2.72-3.03-.9-.2-1.8-.3-2.72-.31v3.34zM9.36 14.24l.2-.06.16-.05.19-.07.16-.07.19-.07a7.87 7.87 0 0 0 1.6-.97l.15-.11.15-.14.13-.11.15-.15.13-.12.02-.02a8.81 8.81 0 0 0-1.8-.69 6.44 6.44 0 0 1-1.66 2.7l.06-.02.17-.05zM14.62 7.52h-3.13a13.4 13.4 0 0 1-.53 3.6c.69.18 1.35.44 1.98.78a7.23 7.23 0 0 0 1.68-4.38zM7.57 7h3.4a12.92 12.92 0 0 0-.52-3.46c-.95.21-1.91.33-2.88.34V7zM7.57.01v3.35c.91-.01 1.82-.12 2.72-.32C9.67 1.33 8.69.17 7.57.01zM7.57 10.65c.97 0 1.93.12 2.88.34.33-1.13.5-2.3.51-3.47H7.57v3.13zM12.94 2.62c-.63.34-1.3.6-1.98.79.34 1.17.51 2.38.53 3.6h3.13a7.23 7.23 0 0 0-1.68-4.39zM12.59 2.23l-.02-.02-.13-.13-.15-.14-.13-.12-.15-.13-.14-.11a5.59 5.59 0 0 0-.94-.63 7.23 7.23 0 0 0-.17-.1L10.6.77a5.78 5.78 0 0 0-.34-.16l-.19-.08a7.38 7.38 0 0 0-.72-.25L9.2.24 9.13.22a6.44 6.44 0 0 1 1.67 2.7 8.8 8.8 0 0 0 1.79-.69zM0 7h3.13c.01-1.21.2-2.42.53-3.6a9.1 9.1 0 0 1-1.98-.78A7.23 7.23 0 0 0 0 7zM7.05 14.51v-3.34c-.92 0-1.82.12-2.72.31.62 1.72 1.6 2.88 2.72 3.03zM7.05 7.52h-3.4c.02 1.18.2 2.34.52 3.47.94-.22 1.9-.33 2.88-.34V7.52zM7.05.01c-1.12.16-2.1 1.32-2.72 3.03.9.2 1.8.3 2.72.32V0zM7.05 3.88c-.97-.01-1.94-.13-2.88-.34-.33 1.12-.5 2.29-.51 3.46h3.39V3.88zM5.49.22l-.06.02-.17.04-.2.06L4.9.4l-.2.07-.15.06-.19.08a7.57 7.57 0 0 0-.82.42l-.17.1a6.85 6.85 0 0 0-.46.32l-.16.13-.14.1-.15.14-.13.12-.15.14-.13.13-.02.02c.57.3 1.17.52 1.8.68C4.13 1.9 4.71.97 5.48.22zM2.18 12.44l.15.14.13.12.15.14.14.1.16.13.14.1a7.4 7.4 0 0 0 .81.5l.16.09a6.08 6.08 0 0 0 .34.16l.19.07a7.38 7.38 0 0 0 .35.14l.17.05.2.06.16.05.06.01a6.44 6.44 0 0 1-1.67-2.7 8.8 8.8 0 0 0-1.79.7l.02.02.13.12zM1.68 11.9c.62-.34 1.3-.6 1.98-.78a13.4 13.4 0 0 1-.53-3.6H0c.06 1.6.65 3.15 1.68 4.38z"></path></g></svg>
                            <span className="ms-2">Web Browser</span>
                        </a>
                    </p>
                    <p className="mb-3">
                        <a href="https://play.google.com/store/apps/details?id=com.ecobots.ecochatsapp&amp;hl=en_US" className="text-decoration-none text-reset u-text-xs d-flex align-items-center u-w-fit">
                            <svg style={{width: 15, height: 18}} xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><path d="M1.08 5.58h-.05C.47 5.58 0 6.04 0 6.6v4.44c0 .57.47 1.02 1.03 1.02h.05c.56 0 1.03-.46 1.03-1.02V6.6c0-.56-.47-1.02-1.03-1.02zM2.6 12.76c0 .51.42.93.94.93h1.01v2.4c0 .57.47 1.02 1.03 1.02h.05c.57 0 1.03-.46 1.03-1.02v-2.4h1.41v2.4c0 .57.46 1.02 1.03 1.02h.04c.57 0 1.03-.46 1.03-1.02v-2.4h1.01c.52 0 .95-.42.95-.93V5.74H2.6v7.02z"></path><path d="M9.74 1.49l.8-1.23a.17.17 0 0 0-.05-.23.17.17 0 0 0-.24.05l-.83 1.27a5.46 5.46 0 0 0-4.11 0L4.48.08a.17.17 0 0 0-.24-.05.17.17 0 0 0-.05.23l.8 1.23a4.03 4.03 0 0 0-2.4 3.83h9.56l.01-.28c0-1.52-.98-2.85-2.42-3.55zm-4.6 2.2a.46.46 0 0 1-.45-.46c0-.25.2-.45.46-.45a.46.46 0 1 1 0 .91zm4.44 0a.46.46 0 0 1-.46-.46c0-.25.2-.45.46-.45a.46.46 0 1 1 0 .91z" fillRule="nonzero"></path><path d="M13.7 5.58h-.05c-.56 0-1.03.46-1.03 1.02v4.44c0 .57.47 1.02 1.03 1.02h.05c.56 0 1.02-.46 1.02-1.02V6.6c0-.56-.46-1.02-1.03-1.02z"></path></g></svg>
                            <span className="ms-2">Android</span>
                        </a>
                    </p>
                    <p className="mb-3 u-w-fit">
                        <a href="https://apps.apple.com/se/app/ecobots/id6451185273" className="text-decoration-none text-reset u-text-xs lh-sm d-flex align-items-center u-w-fit">
                            <svg style={{width: 19, height: 16}} viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.6 13.9l-1 1.5a1.2 1.2 0 01-2-1.1l.7-1.2c.2-.2.5-.5 1-.4 0 0 1.3 0 1.4.8l-.1.4zM17 10H13.9L11 4.8l-.2-.3c-.3-.4-.7.7-.7.7-.6 1.2 0 2.7.3 3l4 7.1a1.2 1.2 0 002-1.1l-1-1.8s0-.2.2-.2H17c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.2-1.1-1.2zm-5.3 1.6s.1.7-.5.7h-10a1.2 1.2 0 010-2.3h2.5c.5 0 .6-.2.6-.2l3.4-5.9v-.2l-1.2-2a1.2 1.2 0 012-1.1l.6.9.5-1a1.2 1.2 0 012 1.2L6.9 10l.1.1h2.8s1.6 0 1.9 1.6z" fill="currentColor"></path></svg>
                            <span className="ms-2">iOS</span>
                        </a>
                    </p>
                </div>

                <div className="py-4 copyright">
                        <p className="u-text-2xs mb-2 mb-lg-0 pb-0 text-reset">Copyright &copy; 2024 EcoBots, Inc. All rights reserved.</p>
                        
                        <div className="privacyLinks">
                            <a className="text-decoration-none u-text-2xs mb-0 pb-0 text-reset me-1" href="/privacy-policy/">Privacy Policy</a>
                            <a className="text-decoration-none u-text-2xs mb-0 pb-0 text-reset me-1" href="/terms-and-services/">Terms of Services</a>
                        </div>
                    </div>
            </div>
        </footer>
    )
}