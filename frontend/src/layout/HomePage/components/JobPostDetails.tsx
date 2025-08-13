import React from 'react'
import JobPostModel from '../../../models/JobPostModel'
import { Link } from 'react-router-dom'
import { ContentPlaceHolder } from '../../Utils/ContentPlaceHolder'

export const JobPostDetails: React.FC<{ selectedJob: JobPostModel}> = (props) => {

  return (
    <div className='p-3'>
      <div className='job-post-detail-panel-top mb-5'>
        <h5 className='mb-0 job-title'>{props.selectedJob.title}</h5>
        <p className='mb-3'>{props.selectedJob.company}</p>
        <p className='mb-0'>{props.selectedJob.location}</p>
        <p>{props.selectedJob.jobType}</p>

        <Link className='btn btn-primary rounded rounded-3' to={'/apply-job'}>Apply Now</Link>
      </div>
      <hr />
      <div className='job-post-detail-panel-content mb-5'>
        <div>
          <h6>What we offer:</h6>
          <p className='mb-4'>
            {props.selectedJob.whatWeOffer}
          </p>

          <h6>What you should know:</h6>
          <p className='mb-4'>
            {props.selectedJob.whatYouShouldKnow}
          </p>

          <h6>Qualifications:</h6>
          <div className='mb-4'>
            {props.selectedJob.qualifications?.split(/[,\.]/)
            .map(q => q.trim()).filter(Boolean)
            .map((q, idx) =>(<p key={idx}>- {q}</p>))}
          </div>

          <h6>Education Requirement:</h6>
          <p>
            {props.selectedJob.educationRequirement}
          </p>
        </div>
      </div>
      <hr />
      <div className='job-post-detail-panel-content d-flex justify-content-between date-label pt-4'>
          <span>{props.selectedJob.posteDate}</span>
          <span>{props.selectedJob.expiryDate}</span>
      </div>


    </div>
  )
}
