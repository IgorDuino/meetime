import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Main from '../components/MainPart';
import Schedule from '../components/Schedule';
import '../styles/styles.css'

const Home = () => (
    <>
        <div>
            <Header />
            <Main />
            <Schedule />
            <div>
                <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                <span>powered by meetime</span>
            </div>
        </div>
    </>
);

export default Home;
