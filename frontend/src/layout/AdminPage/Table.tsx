import React from 'react'
import { User } from './UsersList'


export const Table: React.FC<{ users: User[] }> = (props) => {

    return (
        <div className='table-responsive mt-4 bg-light mx-auto'>
            <table className="table table-striped">
                <thead>
                    <tr className='table-primary'>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Created at </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map((user, index) => {
                            const createdAt = new Date(user.createdAt).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                            })
                            return (
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.userEmail}</td>
                                    <td>
                                        <div>
                                            <span className='me-1'>{user?.address?.street}</span>
                                            <span className='me-1'>{user?.address?.city}</span>
                                            <span>{user?.address?.provinceOrState}</span>
                                        </div>
                                        <div>
                                            <span className='me-1'>{user?.address?.postalCode}</span>
                                            <span>{user?.address?.country}</span>
                                        </div>
                                    </td>
                                    <td>{createdAt}</td>
                                    <td>
                                        <button className='btn btn-outline-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
