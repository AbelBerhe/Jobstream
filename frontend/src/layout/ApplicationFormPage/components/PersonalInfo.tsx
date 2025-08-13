import React from 'react'

export const PersonalInfo = () => {
  return (
    <div className='mt-3 col-12 col-lg-8'>
      <fieldset className='border rounded-3 p-4 shadow'>
        <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
          Personal Info
        </legend>
        <div className='mb-3'>
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>
          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="floatingLastEmail" placeholder="Email" />
            <label htmlFor="floatingLastEmail">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingPhoneNumber" placeholder="Phone Number" />
            <label htmlFor="floatingLastName">Phone Number</label>
          </div>
          <div className="mb-3">
            <label htmlFor="resumeUpload" className="form-label">Resume</label>
            <input
              className="form-control"
              type="file"
              id="resumeUpload"
              name="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumeUpload" className="form-label">Cover Letter</label>
            <input
              className="form-control"
              type="file"
              id="coverLetterUpload"
              name="coverLetter"
              accept=".pdf,.doc,.docx"
            />
          </div>

        </div>
      </fieldset>
    </div>
  )
}
