import React, { useEffect, useState } from 'react'
import { useGroups } from '../../hooks/useGroups'
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import JobPostModel from '../../models/JobPostModel';
import { JobPost } from '../HomePage/components/JobPost';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import ApplicationDetailResponse from '../../models/ApplicationDetailResponse';
import { Applications } from './Applications';

export const JobPostsPage = () => {
  const groups = useGroups();
  const [posts, setPosts] = useState<JobPostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
 
  const { authState } = useOktaAuth();

  useEffect(() => {
    const fetchJobPost = async () => {
      if (authState && authState.isAuthenticated) {
        const url = "http://localhost:8080/api/job-posts/me/posts";
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          },
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("can't fetch message!")
        }
        const responseJson = await response.json();
        const responseData = responseJson._embedded.jobPostDTOes;

        const jobPostList: JobPostModel[] = responseData.map((jobPost: any) => (
          new JobPostModel(
            jobPost.id,
            jobPost.title,
            jobPost.company,
            jobPost.whatWeOffer,
            jobPost.whatYouShouldKnow,
            jobPost.qualifications,
            jobPost.educationRequirement,
            jobPost.location,
            jobPost.jobType,
            jobPost.timeAgo,
            jobPost.formattedExpiryDate,
            jobPost.isActive
          )
        ))

        setPosts(jobPostList)
      }
      setIsLoading(false);
    }

    fetchJobPost().catch((err: any) => {
      setHttpError(err.message)
      setIsLoading(false);
    });

  }, [])


  const deletePost = async (postId: string | undefined) => {
    if (authState && authState.isAuthenticated && postId) {
      try {
        const url = `http://localhost:8080/api/job-posts/remove/post/${postId}`;
        const requestOptions = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          },
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Can't not delete post!")
        }

        setPosts(prev => prev.filter(p => p.id !== postId))
      } catch (err: any) {
        setHttpError(err.message);
        setIsLoading(false);
      }
    }
  }


  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className='mt-3 container'>
        {httpError}
      </div>
    )
  }

  if (!groups.includes("Recruiters")) {
    return <Redirect to={"/"} />
  }

  return (
    <div className='container mt-3'>
      <h2 className='text-center text-secondary'>Posts</h2>
      {posts.length > 0 ?
        posts.map(post => (
          <div key={post.id} className='mb-2 job-post'>
            <div key={post.id} className='mt-4 row align-items-center justify-content-center  p-2'>
              <div className='jobPost col-8'>
                <JobPost jobPost={post} />
              </div>
              <button onClick={() => deletePost(post.id)} className='btn btn-danger col-auto'>Delete</button>
            </div>
            <Applications postId={post.id}/>
          </div>
        ))
        : 
        <div>No Posts were found for this Recruiter{authState?.accessToken?.claims.email}</div>
      }
    </div>
  )

}