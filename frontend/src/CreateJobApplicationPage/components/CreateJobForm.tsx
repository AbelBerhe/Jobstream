import React from 'react'
import JobPostModel from '../../models/JobPostModel'

interface JobPostProps{
jobPost: JobPostModel;
onChange: (field: keyof JobPostModel, value: string) => void
}

export const CreateJobForm: React.FC<JobPostProps> = (props) => {
    return (
        <div className='col-12 col-lg-8'>
            <div className="form-floating mb-3">
                <input type="email" className="form-control mb-3" id="floatingTile"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.title}
                name='title'
                 placeholder="Job Title" />
                <label htmlFor="floatingTile">Title</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control mb-3" id="floatingCompany"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.company}
                name='company'
                 placeholder="Company" />
                <label htmlFor="floatingCompany">Company</label>
            </div>
             <div className="form-floating">
                <input type="text" className="form-control mb-3" id="floatingLocation"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.location}
                name='location'
                 placeholder="Location" />
                <label htmlFor="floatingLocation">Location</label>
            </div>
             <div className="form-floating">
                <input type="text" className="form-control mb-3" id="floatingJobType"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.jobType}
                 name='jobType'
                 placeholder="Job type" />
                <label htmlFor="floatingJobType">Job type</label>
            </div> 
            <div className="form-floating">
                <textarea className="form-control mb-3" id="floatingWhatWeOffer"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.whatWeOffer}
                name='whatWeOffer' 
                placeholder="What we offer" style={{height:'200px'}}></textarea>
                <label htmlFor="floatingWhatWeOffer">What we offer</label>
            </div>
             <div className="form-floating">
                <textarea className="form-control mb-3" id="floatingWhatYouShouldKnow"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.whatYouShouldKnow}
                name='whatYouShouldKnow'
                 placeholder="what you should know" style={{height:'200px'}}></textarea>
                <label htmlFor="floatingWhatYouShouldKnow">what you should know</label>
            </div>
             <div className="form-floating">
                <input type='text' className="form-control mb-3" id="floatingQualification"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.qualifications}
                name='qualifications'
                 placeholder="Qualification" />
                <label htmlFor="floatingQualification">Qualification</label>
            </div>
             <div className="form-floating">
                <textarea className="form-control mb-3" id="floatingEducationRequirement"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.educationRequirement}
                name='educationRequirement'
                 placeholder="Education requirement" style={{height:'200px'}}></textarea>
                <label htmlFor="floatingEducationRequirement">Education requirement</label>
            </div>
           <div className="form-floating">
                <input type="date" className="form-control" id="floatingExpiryDate"
                onChange={(e)=> props.onChange(e.target.name as keyof JobPostModel, e.target.value)}
                value={props.jobPost.expiryDate}
                name='expiryDate'
                 placeholder="Expiry date" />
                <label htmlFor="floatingExpiryDate">Expiry date</label>
            </div>
        </div>
    )
}
