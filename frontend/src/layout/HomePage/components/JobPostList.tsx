import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import JobPostModel from '../../../models/JobPostModel'
import { JobPost } from './JobPost'
import { SpinnerLoading } from '../../Utils/SpinnerLoading'
import { JobPostDetails } from './JobPostDetails'
import { Link } from 'react-router-dom'
import { MobileJobView } from './MobileJobView'


type JobPost = {
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
export const JobPostList = () => {
    const [jobPosts, setJobPosts] = useState<JobPostModel[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoadingJobPosts, setIsLoadingJobPosts] = useState(true);
    const [httpError, setHttpError] = useState("");
    const [isMobileDetailView, setIsMobileDetailView] = useState(false);
    const [selectedJobPost, setSelectedJobPost] = useState<JobPostModel | null>({
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
    });
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
  



    useEffect(() => {
        const fetchJobPosts = async () => {
            const baseUrl: string = "http://localhost:8080/api/job-posts";   

            let url: string = '';

            if(searchUrl === ''){
                url = baseUrl;
            }else{
                url = baseUrl + searchUrl;
            }

  

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!- job-posts')
            }

       

            const responseJson = await response.json();
            const responseData = responseJson._embedded?.jobPostDTOes || [];
                
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

            setJobPosts(jobPostList);
            setTotalAmount(responseJson.page.totalElements)
            setSelectedJobPost(jobPostList[0])
            setIsLoadingJobPosts(false);
        }

        fetchJobPosts().catch((error: any) => {
            setIsLoadingJobPosts(false);
            setHttpError(error.message);
            console.log("error occurred!");
        })
    }, [searchUrl])


    if(isLoadingJobPosts){
        return (
            <SpinnerLoading/>
        )
    }

    if(httpError){
        return(
              <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const handleJobPostDetail = (jobPost: JobPostModel)=>{
         setSelectedJobPost(jobPost)
    }

    const handleJobPostDetailMobile = (jobPost: JobPostModel)=>{
        setSelectedJobPost(jobPost)
        setIsMobileDetailView(true);
   }

    const handleJobPostSearchHandel = () => {
        if (location === '') {
            setSearchUrl('');
            setIsError(true);
            setErrorMessage('');
        } else {
            const regex = /^\s*[A-Za-z]+(?:\s+[A-Za-z]+)*\s*,?\s*[A-Za-z]{2}\s*$/;

          
            if (regex.test(location)) {
                const locationInput: string[] = location.split(',');

                if (locationInput.length === 2) {
                    const city = locationInput[0].trim(); // Optional: normalize internal spacing
                    const province = locationInput[1].trim();
                    const sanitizedLocation: string = `${city}, ${province}`;
                    setIsError(false);
                    setSearchUrl(`/search-jobs?title=${title}&location=${sanitizedLocation}`); ///search-jobs?title=&location=Toronto,ON
                } else {
                    setIsError(true);
                    setErrorMessage("Invalid format. Eg: Toronto, ON");
                }
            } else {
                  
                setIsError(true);
                setErrorMessage("Invalid format. Eg: Toronto, ON");
            }
           
        }

    }



    return (
        <div className='mt-5 job-post-list'>
            {isMobileDetailView ? <></> :(<div className='search-container'>
                <form className="d-flex flex-column flex-md-row gap-2 justify-content-center" role='search'>
                    <div className="search-box col-lg-6">
                        <label htmlFor="jobSearchKeyword" className="visually-hidden">Search</label>
                        <span className='search-icon'><FontAwesomeIcon icon={faSearch} /></span>
                        <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text" 
                        className="form-control input-search rounded-3 " id="jobSearchKeyword" placeholder='Job Title'
                        aria-label='search: Job Title' enterKeyHint='search' />
                    </div>
                    <div className="search-box col-lg-3">
                        <label htmlFor="jobSearchLocation" className="visually-hidden">Search</label>
                        <span className='search-icon'><FontAwesomeIcon icon={faSearch} /></span>
                        <input onChange={(e) =>{setLocation(e.target.value);  setErrorMessage('');}} value={location} type="text"
                         className="form-control input-search rounded-3 " id="jobSearchLocation" placeholder='Location (e.g. Toronto, ON)'
                        aria-label='search: Job Title, Keywords, or company' enterKeyHint='search' />
                      {isError && <span className='ms-3 text-danger' style={{fontSize: '.8rem', fontStyle: 'italic'}}>{errorMessage}</span>}
                    </div>
                    <div className="search-btn ms-2">
                        <button onClick={() => handleJobPostSearchHandel()} type="button" className="btn btn-outline-primary rounded-4 shadow w-100">Find Job</button>
                    </div>
                </form>
            </div>)}


            {jobPosts.length > 0 ? 
            <>
            <div className='row d-none d-md-flex mt-3 main-panel-job-row'>
                <div className='col-md-6 p-2 job-posts-panel'>
                    <div className='d-flex total-jobs-label'>
                        <p className='ms-auto me-4'>Total Jobs :  {totalAmount}</p>
                    </div>
                    <div className='mt-3 job-post'>
                        {jobPosts.map(jobPost => (
                            <div key={jobPost.id} className='mb-3' onClick={()=> handleJobPostDetail(jobPost)}>
                                <JobPost jobPost={jobPost} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='col-md-6 p-2 border job-post-detail-panel'>
                   <JobPostDetails selectedJob={selectedJobPost} />
                </div>
            </div> 




                    <MobileJobView jobPosts={jobPosts}
                        selectedJobPost={selectedJobPost}
                        handleJobPostDetailMobile={handleJobPostDetailMobile}
                        goBack={() => setIsMobileDetailView(false)}
                        isMobileDetailView={isMobileDetailView} 
                        />
                </>
                :
            <div className='mt-5 text-center'>
                <div>No Jobs are matched to the <span className='text-secondary fw-bold'>{`${title ? title :'title'} in ${location}`}</span></div>
            </div>

        }
        </div>
    )
}
