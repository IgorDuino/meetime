import React from 'react';
import Header from '../components/Header';
import Main from '../components/MainPart';
import '../styles/styles.css'

const Home = () => (
    <>
        <div>
            <Header />
            <Main />
            <div>
                <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                <span>powered by meetime</span>
            </div>
        </div>
    </>
);

export default Home;
