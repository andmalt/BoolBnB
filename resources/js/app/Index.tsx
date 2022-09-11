import React from 'react';
import '../../css/index.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Header from './components/Header';

const Index = () => {
    return (
        <>
            <Header />
            <div id='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<About />} />
                </Routes>
            </div>
        </>
    )
}

export default Index;
