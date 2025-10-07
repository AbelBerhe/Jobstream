import React, { useEffect, useState } from 'react'
import { Table } from './Table'
import { SpinnerLoading } from '../Utils/SpinnerLoading';

interface Address {
    id: string;
    street: string;
    city: string;
    provinceOrState: string;
    postalCode?: string;
    country?: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    oktaId: string;
    userEmail: string;
    phoneNumber: string;
    profilePicture: string;
    resumeUrl: string;
    createdAt: string;
    address: Address;
}
export const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState('');
    const [searchName, setSearchName] = useState('firstName')

    useEffect(() => {
        const fetchAllUsers = async () => {
            const url = `http://localhost:8080/api/users?sort=${searchName},asc`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong all users!");
            }

            const responseJson = await response.json();
            setUsers(responseJson._embedded.users);
            setIsLoading(false);
        }

        fetchAllUsers().catch((err) => {
            setIsLoading(false);
            setHttpError("Error" + err.message);
        })
    }, [searchName])

    if (isLoading) {
        return (<SpinnerLoading />)
    }

    if (httpError) {
        return (<p>{httpError}</p>)
    }

    const handleSelect = (selectedName: string) => {
        setSearchName(selectedName)
    }

    return (
        <div className='mt-3'>
            <h6 className='text-muted mb-3'>Total Users: {users.length} </h6>
            <div className='row  col-4'>
                <label className='form-label'>Sort Users:</label>
                <select className="form-select"
                    onChange={(e) => handleSelect(e.target.value)}
                    value={searchName} aria-label="Default select example">
                    <option value="FirstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="createdAt">Created At</option>
                </select>
            </div>

            <Table users={users} />
        </div>
    )
}
