import React, { useEffect, useState } from 'react';
import '../../../css/index.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Login, Register } from '../views';
import { Header, Footer } from '../layout';
import { useAppSelector } from '../store/hooks';
import Loading from '../components/Loading';

interface IndexProps {
}

const Index = (props: IndexProps) => {

    const authSelector = useAppSelector(state => state.auth);

    useEffect(() => {
    }, []);

    return (
        <>
            {
                authSelector.isLoading ?
                    <Loading />
                    :
                    null
            }
            <Header />
            <div id='containe'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Index;
