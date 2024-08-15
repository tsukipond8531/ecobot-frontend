import React from 'react'

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
import Section5 from './section5';

import './index.css';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="wrapper">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
            </div>
            <Footer />
        </>
    );
}