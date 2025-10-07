import React from 'react'
import { ExperienceHistory } from '../../../models/ApplicationPayLoad';
interface ExperienceProps {
    index: number
    experienceHistory: ExperienceHistory;
    onChange: (index: number, field: keyof ExperienceHistory, value: string) => void;
    errors: {[key: string]: string};
    handleBlur: (field: string, value: string) => void;
    isSubmitting: boolean;
}

export const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className='mt-3 col-12 col-lg-8 mb-3'>
            <fieldset className='border rounded-3 p-4 shadow'>
                <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
                    Experience
                </legend>
                <div className='mb-3'>
                    <div className="form-floating mb-3">
                        <input type="text" className={`form-control ${props.errors[`jobTitle-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`}  id={`floatingJobTitle-${props.index}`}
                            onChange={(e) => props.onChange(props.index, e.target.name as keyof ExperienceHistory, e.target.value)}
                            value={props.experienceHistory.jobTitle}
                            name='jobTitle'
                            onBlur={(e) => {props.handleBlur(`jobTitle-${props.index}`, props.experienceHistory.jobTitle)}}
                            placeholder="Job Title" />
                        <label className='required' htmlFor={`floatingJobTitle-${props.index}`}>Job Title</label>
                         {props.errors[`jobTitle-${props.index}`] && <div className="text-danger mt-1">{props.errors[`jobTitle-${props.index}`]}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"  className={`form-control ${props.errors[`companyName-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`} id={`floatingCompanyName-${props.index}`}
                            onChange={(e) => props.onChange(props.index, e.target.name as keyof ExperienceHistory, e.target.value)}
                            value={props.experienceHistory.companyName}
                            name='companyName'
                            onBlur={() => {props.handleBlur(`companyName-${props.index}`, props.experienceHistory.companyName)}}
                            placeholder="Company Name" />
                        <label className='required' htmlFor={`floatingCompanyName-${props.index}`}>Company Name</label>
                        {props.errors[`companyName-${props.index}`] && <div className="text-danger mt-1">{props.errors[`companyName-${props.index}`]}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date"  className={`form-control ${props.errors[`expStartDate-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`} id={`expFloatingStartDate-${props.index}`}
                            onChange={(e) => props.onChange(props.index, e.target.name as keyof ExperienceHistory, e.target.value)}
                            value={props.experienceHistory.expStartDate}
                            name='expStartDate'
                            onBlur={() => {props.handleBlur(`expStartDate-${props.index}`, props.experienceHistory.expStartDate)}}
                            placeholder="Start Date" />
                        <label className='required' htmlFor={`expFloatingStartDate-${props.index}`}>Start Date</label>
                        {props.errors[`expStartDate-${props.index}`] && <div className="text-danger mt-1">{props.errors[`expStartDate-${props.index}`]}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date" className={`form-control ${props.errors[`expEndDate-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`} id={`expFloatingEndDate-${props.index}`}
                            onChange={(e) => props.onChange(props.index, e.target.name as keyof ExperienceHistory, e.target.value)}
                            value={props.experienceHistory.expEndDate}
                            name='expEndDate'
                            onBlur={() => {props.handleBlur(`expEndDate-${props.index}`, props.experienceHistory.expEndDate)}}
                            placeholder="End Date" />
                        <label className='required' htmlFor={`expFloatingEndDate-${props.index}`}>End Date</label>
                          {props.errors[`expEndDate-${props.index}`] && <div className="text-danger mt-1">{props.errors[`expEndDate-${props.index}`]}</div>}
                    </div>
                </div>
            </fieldset>
        </div>
    )
}
