import React, { useEffect } from 'react';
import '../../../css/index.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Login, Register } from '../views';
import { Header, Footer } from '../layout';
import { useAppSelector } from '../store/hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';

interface NavigationProps {
}

const Navigation = (props: NavigationProps) => {
    const { } = props;
    const authSelector = useAppSelector(state => state.auth);

    useEffect(() => {
        //  
    }, []);

    return (
        <>
            {
                authSelector.isError ?
                    <Error />
                    :
                    null
            }
            {
                authSelector.isLoading ?
                    <Loading />
                    :
                    null
            }
            <Header />
            <div id='main-container'>
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

export default Navigation;
