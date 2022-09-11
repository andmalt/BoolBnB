import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true)
        if (isMounted) {

        }
        return () => {
            setIsMounted(false)
        }
    }, []);

    return (
        <div>
            <h1 id='h1'>Home</h1>
            <Link to="about" id='link'>About</Link>
        </div>
    )
}

export default Home;