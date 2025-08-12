import React from 'react'
import JobPostModel from '../../../models/JobPostModel'

export const JobPost: React.FC<{ jobPost: JobPostModel }> = (props) => {
  return (
      <div className="card  shadow rounded rounded-3 jobPost">
        <div className="card-body card-content">
          <h5 className="card-title job-title mb-0">{props.jobPost.title}</h5>
           <p className="card-text location mt-0 mb-3">{props.jobPost.company}</p>
          <p className="card-text location mb-0">{props.jobPost.location}</p>
          <p className='card-text jobType mb-2'>{props.jobPost.jobType}</p>
          <p className='card-text qualifications'>{props.jobPost.qualifications}</p>
        </div>
          <hr className='m-0'/>
        <div className='date-label'>
          <p className='d-flex p-0 justify-content-center align-items-center'>
            <span className='ms-2 mt-2'>{props.jobPost.posteDate}</span>
            <span className='ms-auto me-3 expiry-date-jobPost'>Expiry Date : {props.jobPost.expiryDate}</span>
          </p>
        </div>
      </div>
  )
}
