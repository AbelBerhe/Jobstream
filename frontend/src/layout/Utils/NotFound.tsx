import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    const currentPage = (window.location.pathname)
    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className='card shadow text-center not-found-text-color' style={{ width: '600px', height: '400px' }}>
                <div className="card-header fs-2">
                    <strong>Oops...</strong>
                </div>
                <div className="card-body cb-color">
                    <h2>404 - Page Not Found</h2>
                    <p>{`"${currentPage}" is not a valid path`}</p>
                    <Link to='/home'>Home Page</Link>
                </div>
            </div>

        </div>
    )
}
