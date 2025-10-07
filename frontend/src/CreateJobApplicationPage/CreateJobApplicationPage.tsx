import React, { useEffect, useState } from 'react'
import { CreateJobForm } from './components/CreateJobForm'
import { Review } from './components/Review';
import { useOktaAuth } from '@okta/okta-react';
import JobPostModel from '../models/JobPostModel';
import { json } from 'stream/consumers';
import { useGroups } from '../hooks/useGroups';
import { Redirect } from 'react-router-dom';

export const CreateJobApplicationPage = () => {
  const groups = useGroups();
  const [isReview, setIsReview] = useState(false);
  const { authState, oktaAuth } = useOktaAuth();
  const [jobPost, setJobPost] = useState<JobPostModel>({
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
  })



  const submitJobPost = async () => {
    const newJobPost = {
      title: jobPost.title,
      company: jobPost.company,
      whatWeOffer: jobPost.whatWeOffer,
      whatYouShouldKnow: jobPost.whatYouShouldKnow,
      qualifications: jobPost.qualifications,
      educationRequirement: jobPost.educationRequirement,
      location: jobPost.location,
      jobType: jobPost.jobType,
      expiryDate: jobPost.expiryDate
    }

    if (authState && authState.isAuthenticated) {
      const url = 'http://localhost:8080/api/job-posts/new-job-post';
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJobPost)
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Can't create job");
      }
    }
  }

  const handleFormChange = (field: keyof JobPostModel, value: string) => {

    setJobPost(prev => (
      {
        ...prev,
        [field]: value
      }
    ));
    console.log(jobPost)
  }

  if(!groups.includes("Recruiters")){
    return <Redirect to={"/"}/>
  }
  return (
    <div className='container'>
      <h5 className='p-4 text-secondary text-center my-2 bg-light'>Create Job</h5>
      <div className='d-flex flex-column align-items-center mt-3'>
        {jobPost.whatWeOffer}
        {!isReview ?
          <CreateJobForm jobPost={jobPost} onChange={handleFormChange} />
          :
          <Review jobPost={jobPost}/>
        }
        <button onClick={() => setIsReview(!isReview)} type='button' className='btn btn-outline-primary mt-3 w-25 py-2  rounded rounded-2'>{isReview ? 'Back' : 'Next'}</button>
        <button type='button' onClick={submitJobPost} className='btn btn-outline-primary mt-3 w-25 py-2  rounded rounded-2' disabled={!isReview}>Submit</button>
      </div>
    </div>

  )
}
