import React from 'react';

export default function StopGenerating () {
    return (
        <div className="stop-generating">
            <button id="cancelButton" className="border-0 m-auto fw-bold">
                <span>Stop Generating</span>
                <i className="fa-regular fa-stop ms-2 fw-bold"></i>
            </button>
        </div>
    )
}