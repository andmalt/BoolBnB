import React from 'react';
import '../../../css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import {
    Homes,
    Dashboard,
    Login,
    Register,
    Main,
    House,
    NoMatch
} from '../views';
import { Header, Footer } from '../layout';
import { useAppSelector } from '../store/hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { ToastContainer } from 'react-toastify';

interface NavigationProps {
}

const Navigation = (props: NavigationProps) => {
    const { } = props;
    const authSelector = useAppSelector(state => state.auth);

    return (
        <div
            className='bg-black'
            id='body-container'>
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
                <ToastContainer />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/homes' element={<Homes />} />
                    <Route path='/house/:houseId' element={<House />} />
                    <Route path='*' element={<NoMatch />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default Navigation;
