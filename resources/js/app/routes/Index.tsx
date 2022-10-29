import React, { useEffect, useState } from 'react';
import '../../../css/index.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Login } from '../views';
import { Header, Footer } from '../layout';
import { useAppSelector } from '../util/hooks';
import Loading from '../components/Loading';

interface IndexProps {
}

const Index = (props: IndexProps) => {

    const authSelector = useAppSelector(state => state.auth);

    useEffect(() => {
    }, []);

    if (authSelector.isLoading) {
        return <Loading />
    }

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
