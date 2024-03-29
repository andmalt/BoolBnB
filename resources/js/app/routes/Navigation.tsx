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
    NoMatch,
    ForgotPassword,
    ResetPassword,
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
            <div id='main-container' className='bg-slate-100 dark:bg-[#111827] flex justify-center items-center'>
                <ToastContainer />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
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
