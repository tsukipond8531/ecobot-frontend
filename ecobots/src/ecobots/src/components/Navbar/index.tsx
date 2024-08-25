import React from 'react';

import './index.css';

export default function Navbar () {
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-white border-bottom">
            <div className="container d-flex">
                <a className="navbar-brand order-1 order-lg-0" href="/">
                    <img src="/assets/logos/logo_225_color.png" alt="EcoBots logo" style={{width: 70, height: 70}} />
                </a>
                <div className="d-flex order-2 order-lg-2">
                    <a className="btn btn-outline-success fw-semibold" href="/chat/">Try it now</a>
                </div>
                <button className="navbar-toggler order-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon me-1"></span>Menu
                </button>
                <div className="offcanvas offcanvas-top flex-row navbar-collapse order-lg-1" id="navbarToggler">
                    <div className="offcanvas-body">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about/">About us</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}