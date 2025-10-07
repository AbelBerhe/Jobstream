import React from 'react'
import JobPostModel from '../../models/JobPostModel'

export const Review:React.FC<{jobPost: JobPostModel}> = (props) => {
  return (
    <div className='p-4 col-12  col-lg-8 bg-light'>
        <div className='me-1 mb-2'><span className='fw-bold me-1'>Title:</span> {props.jobPost.title}</div>
        <div className='me-1 mb-2'><span className='fw-bold me-1'>Company:</span>{props.jobPost.company}</div>
        <div className='me-1 mb-2'><span className='fw-bold me-1'>WhatW we offer: </span> 
          <p className='mt-2'>{props.jobPost.whatWeOffer}</p>
        </div>
        <div className='me-1 mb-2'><span className='fw-bold me-1'>What you should know</span>
          <p className='mt-2'>{props.jobPost.whatYouShouldKnow}</p>
        </div>
        <div className='me-1 mb-2'><span className='fw-bold me-1'>Qualifications:</span>
          <p className='mt-2'>{props.jobPost.qualifications}</p>
        </div>
        <div className='me-2 mb-2'> <span className='fw-bold me-1'>Education requirement:</span>
          <p className='mt-2'>{props.jobPost.educationRequirement}</p>
        </div>
        <p className='me-1 mb-2'> <span className='fw-bold me-1'>Location: </span>{props.jobPost.location}</p>
        <p className='me-1 mb-2'> <span className='fw-bold me-1'>Jop Type</span> {props.jobPost.jobType}</p>
        <p className='me-1 mb-2'> <span className='fw-bold me-1'>Expire Date:</span>{props.jobPost.expiryDate}</p>
    </div>
  )
}
