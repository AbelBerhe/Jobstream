import React from 'react'
import { EducationHistory } from '../../../models/ApplicationPayLoad'

export const EducationReview: React.FC<{ edu: EducationHistory }> = (props) => {
    return (
        <div key={props.edu.id} className='mb-4'>
            <p className='mb-1'><span className='fw-bold me-2 '>Job Title:</span>{props.edu.schoolName}</p>
            <p className='mb-1'><span className='fw-bold me-2'>Company Name:</span>  {props.edu.degree}</p>
            <p className='mb-1'><span className='fw-bold me-2'>Start Date:</span>  {props.edu.fieldOfStudy}</p>
            <p className='mb-1'><span className='fw-bold me-2'>End Date:</span>  {props.edu.eduStartDate}</p>
            <p className='mb-1'><span className='fw-bold me-2'>End Date:</span>  {props.edu.eduEndDate}</p>
        </div>
    )
}
