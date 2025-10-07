import React, { useEffect, useState } from 'react'
import JobPostModel from '../../../models/JobPostModel'
import { Link } from 'react-router-dom'
import { ContentPlaceHolder } from '../../Utils/ContentPlaceHolder'

export const JobPostDetails: React.FC<{ selectedJob: JobPostModel | null}> = (props) => {

  const [displaySelectedJob, setDisplaySelectedJOb] = useState<JobPostModel | null>(
    {
      id: "",
      title: "",
      company: "",
      whatWeOffer: "",
      whatYouShouldKnow: "",
      qualifications: "",
      educationRequirement: "",
      location: "",
      jobType: "",
      expiryDate: "",
    }
  );
  const [isSelectedJobLoading, setIsSelectedJobLoading] = useState(true);

   useEffect(()=>{

    if(!props.selectedJob) return;

    setIsSelectedJobLoading(true);

    const timer = setTimeout(() => {
      setDisplaySelectedJOb(props.selectedJob)
      setIsSelectedJobLoading(false)
    }, 500);

    return () => clearTimeout(timer);
    
   },[props.selectedJob])

   if(isSelectedJobLoading){
    return( 
      <>
    <ContentPlaceHolder/>
    <ContentPlaceHolder/>
    <ContentPlaceHolder/>
      </>
  )
}


  return (
    <div className='p-3'>
      <div className='job-post-detail-panel-top mb-5'>
        <h5 className='mb-0 job-title'>{displaySelectedJob?.title}</h5>
        <p className='mb-3'>{displaySelectedJob?.company}</p>
        <p className='mb-0'>{displaySelectedJob?.location}</p>
        <p>{displaySelectedJob?.jobType}</p>

        <Link className='btn btn-primary rounded rounded-3' to={`/apply-job/${displaySelectedJob?.id}`}>Apply Now</Link>
      </div>
      <hr />
      <div className='job-post-detail-panel-content mb-5'>
        <div>
          <h6>What we offer:</h6>
          <p className='mb-4'>
            {displaySelectedJob?.whatWeOffer}
          </p>
       

          <h6>What you should know:</h6>
          <p className='mb-4'>
            {displaySelectedJob?.whatYouShouldKnow}
          </p>

          <h6>Qualifications:</h6>
          <div className='mb-4'>
            {displaySelectedJob?.qualifications?.split(/[,\.]/)
            .map(q => q.trim()).filter(Boolean)
            .map((q, idx) =>(<p key={idx}>- {q}</p>))}
          </div>
          
          <h6>Education Requirement:</h6>
          <p>
            {displaySelectedJob?.educationRequirement}
          </p>
        </div>
      </div>
      <hr />
      <div className='job-post-detail-panel-content d-flex justify-content-between date-label pt-4'>
          <span>{displaySelectedJob?.posteDate}</span>
          <span>{displaySelectedJob?.expiryDate}</span>
      </div>


    </div>
  )
}
