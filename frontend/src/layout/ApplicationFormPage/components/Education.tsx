import React from 'react'
import { EducationHistory } from '../../../models/ApplicationPayLoad';

interface EducationProps {
  index: number
  educationHistory: EducationHistory;
  onChange: (index: number, field: keyof EducationHistory, value: string) => void;
  errors: {[key: string]: string};
  handleBlur: (field: string, value: string) => void;
  isSubmitting: boolean;
}

export const Education: React.FC<EducationProps> = (props) => {
  return (
    <div className='mt-3 col-12 col-lg-8 mb-3'>
      <fieldset className='border rounded-3 p-4 shadow'>
        <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
          Education
        </legend>
        <div className='mb-3'>
          <div className="form-floating mb-3">
            <input type="text" className={`form-control ${props.errors[`schoolName-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`}  id={`floatingSchoolName-${props.index}`}
              onChange={(e) => props.onChange(props.index, e.target.name as keyof EducationHistory, e.target.value)}
              value={props.educationHistory.schoolName}
              name='schoolName'
              onBlur={() => {props.handleBlur(`schoolName-${props.index}`, props.educationHistory.schoolName)}}
              placeholder="School Name" />
            <label className='required' htmlFor={`floatingSchoolName-${props.index}`}>School Name</label>
            {props.errors[`schoolName-${props.index}`] && <div className="text-danger mt-1">{props.errors[`schoolName-${props.index}`]}</div>}
          </div>
      <label className='required'  htmlFor={`degree-${props.index}`}>Degree:  </label>
        <select name='degree' className="form-select mb-3" aria-label="Education Level" id={`degree-${props.index}`}
            onChange={(e) => props.onChange(props.index, e.target.name as keyof EducationHistory, e.target.value)}
            value={props.educationHistory.degree}
          >
            <option value="" disabled>Select Degree</option>
            <option value="Highschool Certificate">High School Certificate</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
          </select>

          <div className="form-floating mb-3">
            <input type="text" className={`form-control ${props.errors[`fieldOfStudy-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`} id={`floatingFieldOfStudy-${props.index}`}
              onChange={(e) => props.onChange(props.index, e.target.name as keyof EducationHistory, e.target.value)}
              value={props.educationHistory.fieldOfStudy}
              name='fieldOfStudy'
              onBlur={() => {props.handleBlur(`fieldOfStudy-${props.index}`, props.educationHistory.schoolName)}}
              placeholder="field Of Study" />
            <label className='required' htmlFor={`floatingFieldOfStudy-${props.index}`}>field Of Study</label>
             {props.errors[`fieldOfStudy-${props.index}`] && <div className="text-danger mt-1">{props.errors[`fieldOfStudy-${props.index}`]}</div>}
          </div>
          <div className="form-floating mb-3">
            <input type="date" className={`form-control ${props.errors[`eduStartDate-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`} id={`eduFloatingStartDate-${props.index}`}
              onChange={(e) => props.onChange(props.index, e.target.name as keyof EducationHistory, e.target.value)}
              value={props.educationHistory.eduStartDate}
              name='eduStartDate'
              onBlur={() => {props.handleBlur(`eduStartDate-${props.index}`, props.educationHistory.eduStartDate)}}
              placeholder="Start Date" />
            <label className='required' htmlFor={`eduFloatingStartDate-${props.index}`}>Start Date</label>
            {props.errors[`eduStartDate-${props.index}`] && <div className="text-danger mt-1">{props.errors[`eduStartDate-${props.index}`]}</div>}
          </div>

          <div className="form-floating mb-3">
            <input type="date" className={`form-control ${props.errors[`eduEndDate-${props.index}`] && props.isSubmitting ? 'is-invalid' : ''}`} id={`eduFloatingEndDate-${props.index}`}
              onChange={(e) => props.onChange(props.index, e.target.name as keyof EducationHistory, e.target.value)}
              value={props.educationHistory.eduEndDate}
              name='eduEndDate'
              onBlur={() => {props.handleBlur(`eduEndDate-${props.index}`, props.educationHistory.eduEndDate)}}
              placeholder="End Date" />
            <label  className='required'htmlFor={`eduFloatingEndDate-${props.index}`}>End Date</label>
            {props.errors[`eduEndDate-${props.index}`] && <div className="text-danger mt-1">{props.errors[`eduEndDate-${props.index}`]}</div>}
          </div>
        </div>
      </fieldset>
    </div>
  )
}
