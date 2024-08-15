import React from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Section1 from './section1';

import './index.css';

export default function About () {
    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <Section1 />
            </div>
            <Footer />
        </div>
    );
}