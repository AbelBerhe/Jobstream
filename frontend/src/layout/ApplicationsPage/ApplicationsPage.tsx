import React, { use, useEffect, useState } from 'react'
import ApplicationsByUser from '../../models/ApplicationsByUser';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { useOktaAuth } from '@okta/okta-react';


export const ApplicationsPage = () => {
    const [applications, setApplications] = useState<ApplicationsByUser[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const { authState } = useOktaAuth();

    const statusColors: { [key: string]: string} = {
        "Received": "bg-secondary p-1 text-white rounded",
        "In Review": "text-primary",           
        "Accepted": "text-success",
        "Rejected": "text-danger"
    };

    useEffect(() => {
        const fetchApplications = async () => {

            if (authState && authState?.isAuthenticated) {

                const url: string = `http://localhost:8080/api/application/applicant-applications`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const response = await fetch(url, requestOptions);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const responseJson = await response.json();
                setApplications(responseJson._embedded.applicationsByUserResponseDtoes);
            }


            setLoading(false);
        }
        fetchApplications().catch((error: any) => {
            setLoading(false);
            setHttpError(error.message);
        });

    }, []);

    const deleteApplication = async (applicationId: string) => {
        if (authState && authState?.isAuthenticated && applicationId) {
            try {
                const url: string = `http://localhost:8080/api/application/remove-application/${applicationId}`;
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                    }
                };
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                setApplications(applications.filter(application => application.id !== applicationId));
                setShowSuccess(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setShowSuccess(false), 2000);
            } catch (error: any) {
                setHttpError(error.message);
            }
        }
    }

    if (loading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }


    return (
        <div className='container mt-3'>
            <h2>Applications</h2>
            {showSuccess &&<div className="alert alert-success col-12 col-md-4 mx-auto text-center" role="alert">
               Your application has been successfully deleted!
            </div>}
        
            <div className="container mt-5">
                <div className="row row-cols-1 g-3 row-cols-md-3">
                    {applications.length > 0 ? (
                        applications.map(application => (
                            <div className="col" key={application.id}>
                                <div className="card mb-3 shadow p-3 mb-5 bg-body rounded-3">
                                    <div className='card-header'>
                                        <h5 className="card-title text-center">{application.jobTitle}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text"><b>Company:</b> {application.company}</p>
                                        <p className="card-text"><b>Location:</b> {application.location}</p>
                                        <p className="card-text"><b>Status:</b> <span className={`${statusColors[application.status]}`}>{application.status}</span></p>
                                        <hr/>
                                        <p className="card-text"><b>Applied At:</b> {application.appliedAt}</p>
                                    </div>
                                    <div className="card-footer mt-3">
                                        <button onClick={() => deleteApplication(application.id)} className='btn btn-danger'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col">
                            <h3 className='text-secondary'>No Applications found</h3>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
