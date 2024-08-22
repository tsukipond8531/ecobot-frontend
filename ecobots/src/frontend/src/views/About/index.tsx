import React from 'react';

import Navbar from './../../components/Navbar';
import Footer from './../../components/Footer';

import './index.css';

export default function About () {
    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <h1>About</h1>
            </div>
            <Footer />
        </div>
    );
}