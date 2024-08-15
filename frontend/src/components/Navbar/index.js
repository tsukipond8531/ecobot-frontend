import React from 'react';

export default function Navbar () {
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="/assets/logos/logo_225_color.png" alt="EcoBots logo" style={{width: 70, height: 70}} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about/">About us</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <a className="btn btn-outline-success" href="/chat/">Try it now</a>
                </div>
            </div>
        </nav>
    )
}