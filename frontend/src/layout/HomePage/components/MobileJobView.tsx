import React from 'react'
import { JobPostDetails } from './JobPostDetails'
import { JobPost } from './JobPost'
import JobPostModel from '../../../models/JobPostModel'

interface MobileJobViewProps {
    jobPosts: JobPostModel[];
    selectedJobPost: JobPostModel | null;
    handleJobPostDetailMobile: (jobPost: JobPostModel) => void;
    goBack: () => void;
    isMobileDetailView?: boolean;
}

export const MobileJobView: React.FC<MobileJobViewProps> = (props) => {
  return (
    <div  className="d-md-none mt-3">
     {!props.isMobileDetailView ? (
        <div>
          {props.jobPosts.map(jobPost => (
            <div key={jobPost.id} className="mb-3" onClick={() => props.handleJobPostDetailMobile(jobPost)}>
              <JobPost jobPost={jobPost} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button className="btn btn-outline-secondary mb-2" onClick={props.goBack}>← Back</button>
          <JobPostDetails selectedJob={props.selectedJobPost} />
        </div>
      )}
    </div>
  )
}
