import React, { useState } from 'react'
import { Sidebar } from '../components';

const Dashboard = () => {

    return (
        <div className="top-margin-header">
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">

                {/* <!-- Sidebar --> */}
                <Sidebar />

                <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

                    {/* <!-- Statistics Cards --> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;