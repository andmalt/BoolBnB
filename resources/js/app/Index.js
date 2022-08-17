import React from 'react'
import '../../css/index.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'

const Index = () => {
    return (
        <div id='container'>
            <h1>Hello World!!</h1>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
            </Routes>
        </div>
    )
}

export default Index;
