import React from 'react'

export const Experience = () => {
    return (
        <div className='mt-3 col-12 col-lg-8 mb-3'>
            <fieldset className='border rounded-3 p-4 shadow'>
                <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
                    Experience
                </legend>
                <div className='mb-3'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingJobTitle" placeholder="Job Title" />
                        <label htmlFor="floatingJobTitle">Job Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingCompanyName" placeholder="Company Name" />
                        <label htmlFor="floatingCompanyName">Company Name</label>
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
