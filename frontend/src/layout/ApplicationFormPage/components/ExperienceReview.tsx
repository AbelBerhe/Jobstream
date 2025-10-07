import React from 'react'
import { ExperienceHistory } from '../../../models/ApplicationPayLoad'

export const ExperienceReview: React.FC<{ exp: ExperienceHistory }> = (props) => {
    return (
        <div key={props.exp.id} className='mb-4'>
            <p className='mb-1'><span className='fw-bold me-2 '>Job Title:</span>{props.exp.jobTitle}</p>
            <p className='mb-1'><span className='fw-bold me-2'>Company Name:</span>  {props.exp.companyName}</p>
            <p className='mb-1'><span className='fw-bold me-2'>Start Date:</span>  {props.exp.expStartDate}</p>
            <p className='mb-1'><span className='fw-bold me-2'>End Date:</span>  {props.exp.expEndDate}</p>
        </div>
    )
}
