import React from 'react'

export const Education = () => {
  return (
    <div className='mt-3 col-12 col-lg-8 mb-3'>
      <fieldset className='border rounded-3 p-4 shadow'>
        <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
          Education
        </legend>
        <div className='mb-3'>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingSchoolName" placeholder="School Name" />
            <label htmlFor="floatingFirstName">School Name</label>
          </div>
          <select className="form-select mb-3" aria-label="Education Level">
            <option value="" selected disabled>Select education level</option>
            <option value="highschool">High School Certificate</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
          </select>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingFieldOfStudy" placeholder="field Of Study" />
            <label htmlFor="floatingFieldOfStudy">field Of Study</label>
          </div>
          <div className="form-floating mb-3">
            <input type="date" className="form-control" id="floatingStartDate" placeholder="Start Date" />
            <label htmlFor="floatingStartDate">Start Date</label>
          </div>

          <div className="form-floating mb-3">
            <input type="date" className="form-control" id="floatingEndDate" placeholder="End Date" />
            <label htmlFor="floatingEndDate">End Date</label>
          </div>

        </div>
      </fieldset>
    </div>
  )
}
