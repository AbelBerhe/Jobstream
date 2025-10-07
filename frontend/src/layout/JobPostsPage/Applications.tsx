import React, { useEffect, useState } from 'react'
import ApplicationDetailResponse from '../../models/ApplicationDetailResponse';
import { useOktaAuth } from '@okta/okta-react';

export const Applications: React.FC<{ postId: string }> = (props) => {

  const [applicationsByPost, setApplicationsByPost] = useState<{[key: string]: ApplicationDetailResponse[]}>({});
  const {authState} = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const showApplications = async () => {
      if (authState && authState.isAuthenticated && props.postId) {
        const url = `http://localhost:8080/api/application/job-post/${props.postId}/applications`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          }
        }
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Can't not fetch post!")
        }
        const responseJson = await response.json();
    
        setApplicationsByPost(prev => ({
          ...prev,
          [props.postId]: responseJson
        }));

      }
    }

    showApplications().catch((err: any) => {
      setHttpError(err.message)
    })

  }, [])


  if(httpError){
    return (
      <div className='container mt-3'>
        {httpError}
      </div>
    )
  }


  return (
    <div className='d-flex flex-column align-items-center post-applications'>
      <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
        data-bs-target={`#applications${props.postId}`} aria-expanded="false" aria-controls={`applications${props.postId}`}>
        <h6>View Applications({applicationsByPost[props.postId]?.length | 0})</h6>
      </button>

      <div className="collapse mt-2" id={`applications${props.postId}`}>
        <ul className="list-group">
          {(applicationsByPost[props.postId] || []).map((appDetail, index) => (
            <li key={index} className="list-group-item p-3" style={{cursor: 'pointer'}}>
              <div>
                <span>Job Title: <span className='text-secondary'>{appDetail.applicationInfo.jobTitle}</span>&nbsp;</span>
                <span>|&nbsp;First Name: <span className='text-secondary'>{appDetail.applicantInfo.firstName}</span>&nbsp;</span>
                <span>|&nbsp;Last Name: <span className='text-secondary'>{appDetail.applicantInfo.lastName}</span>&nbsp;</span>
                <span>|&nbsp;Location: <span className='text-secondary'>{appDetail.applicantInfo.addressInfo.city},{appDetail.applicantInfo.addressInfo.provinceOrState}</span>&nbsp;</span>
                <span>|&nbsp;Applied At: <span className='text-secondary'>{appDetail.applicationInfo.appliedAt}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
