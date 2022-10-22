import React, { useEffect, useState } from 'react';
import '../../../css/index.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Login } from '../views';
import { Header, Footer } from '../layout';

export interface IndexProps {
}

const Index = (props: IndexProps) => {
    // const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
    }, []);

    return (
        <>
            <Header />
            <div id='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Index;
