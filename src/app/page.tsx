import React from 'react';
import Header from '../components/Header';
import Main from '../components/MainPart';
import '../styles/styles.css'

const Home = () => (
    <>
        <div>
            <Header />
            <Main />
            <div className="max-w-6xl mx-auto p-8">
                <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                <span>powered by meetime</span>
            </div>
        </div>
    </>
);

export default Home;
