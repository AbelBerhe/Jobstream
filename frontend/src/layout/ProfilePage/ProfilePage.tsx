import { useOktaAuth } from '@okta/okta-react';
import React, { use, useEffect, useState } from 'react'
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { UserWithAddress } from '../../models/UserWithAddress';


interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState<UserWithAddress>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const { authState } = useOktaAuth();


    useEffect(() => {
        const fetchUserInfo = async () => {
            if (authState && authState?.isAuthenticated) {
                const url: string = 'http://localhost:8080/api/users/single-user';
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const userInfo = await response.json();
                setUserInfo(userInfo);
            };
            setIsLoading(false);
        }
        fetchUserInfo().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, [authState]);



    if (isLoading) {
        return (<SpinnerLoading />)
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }


    return (

        <div className='container  py-3 mt-4 bg-light rounded shadow-sm'>
            <h5 className='mb-4'>Profile</h5>
            <div className='row justify-content-around'>
                <div className='col-12 col-lg-4 p-3'>
                    <h6 className='mb-4'>Personal Info</h6>
                    <div className='d-flex mb-2'>
                        {/* <button className='ms-auto btn btn-outline-primary'>Edit</button> */}
                    </div>
                    <ul className="list-group  list-group-flush">
                        <li className="list-group-item"><span className='me-2'>First Name:</span><span className='text-secondary'>{userInfo?.firstName.toUpperCase()}</span></li>
                        <li className="list-group-item"><span className='me-2'>Last Name:</span><span className='text-secondary'>{userInfo?.lastName.toUpperCase()}</span></li>
                        <li className="list-group-item"><span className='me-2'>Email:</span><span className='text-secondary'>{userInfo?.email.toUpperCase()}</span></li>
                    </ul>
                </div>
                {userInfo && userInfo.addressInfo &&
                    <div className='col-12 col-lg-4 p-3'>
                        <h6 className='mb-4'>Address</h6>
                        <div className='d-flex mb-2'>
                            {/* <button className='ms-auto btn btn-outline-primary'>Edit</button> */}
                        </div>
                        <ul className="list-group  list-group-flush">
                            <li className="list-group-item"><span className='me-2'>Street:</span><span className='text-secondary'>{userInfo.addressInfo.street}</span></li>
                            <li className="list-group-item"><span className='me-2'>City:</span><span className='text-secondary'>{userInfo.addressInfo.city}</span></li>
                            <li className="list-group-item"><span className='me-2'>Province/State:</span><span className='text-secondary'>{userInfo.addressInfo.provinceOrState}</span></li>
                            <li className="list-group-item"><span className='me-2'>Postal Code:</span><span className='text-secondary'>{userInfo.addressInfo.postalCode}</span></li>
                            <li className="list-group-item"><span className='me-2'>Country:</span><span className='text-secondary'>{userInfo.addressInfo.country}</span></li>
                        </ul>
                    </div>}

            </div>
        </div>
    )
}
