import React from 'react';
import '../../../css/index.css';
import { Routes, Route } from 'react-router-dom';
import { Home, About, Dashboard } from '../views';
import { Header, Footer } from '../components';

const Index = () => {
    return (
        <>
            <Header />
            <div id='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Index;
