import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1 id='h1'>Home</h1>
            <Link to="about" id='link'>About</Link>
        </div>
    )
}

export default Home;