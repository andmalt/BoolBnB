import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [isMounted, setIsMounted] = useState<boolean>(true);

    useEffect(() => {
        if (isMounted) {

        }
        return () => setIsMounted(false)
    }, []);

    return (
        <div>
            <div className="container mx-auto bg-gray-400 h-96 rounded-md flex items-center">
                <div className="sm:ml-20 text-gray-50 text-center sm:text-left">
                    <h1 className="text-5xl font-bold mb-4">
                        Book saunas <br />
                        everywhere.
                    </h1>
                    <p className="text-lg inline-block sm:block">The largest online community to rent saunas in Finland.</p>
                    <button className="mt-8 px-4 py-2 bg-gray-600 rounded">Browse saunas</button>
                </div>
            </div>
        </div>
    )
}

export default Home;