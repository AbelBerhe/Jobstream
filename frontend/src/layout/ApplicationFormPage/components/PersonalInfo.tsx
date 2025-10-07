import { UserInfo } from 'os'
import React, { useState } from 'react'
import { ApplicantInfo } from '../../../models/ApplicationPayLoad'
import { OktaUserInfo } from '../ApplicationFormPage';

interface PersonalInfoProps{
  userInfo: ApplicantInfo;
  oktaUserInfo: OktaUserInfo;
  onChange: (field: keyof ApplicantInfo, value: string) => void;
  onChangeFileResume: (value: File | null) => void;
  onChangeFileCoverLetter: ( value: File | null) => void;
  errors: {[key: string]: string};
  handleBlur: (field: string, value: string) => void;
  isSubmitting: boolean;
}



export const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {

  return (
    <div className='mt-3 col-12 col-lg-8'>
      <fieldset className='border rounded-3 p-4 shadow'>
        <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
          Personal Info
        </legend>
        <div className='mb-3'>
          <div className="form-floating mb-2">
            <input type="text" name='firstName' readOnly className='form-control-plaintext'  id="floatingFirstName"
            defaultValue={props.oktaUserInfo.firstName} placeholder="First Name"
            />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          <div className="form-floating mb-2">
            <input type="text" name='lastName'  readOnly className='form-control-plaintext' id="floatingLastName"
            defaultValue={props.oktaUserInfo.lastName} placeholder="Last Name" />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>
          <div className="form-floating mb-2">
            <input type="email" name='userEmail'  readOnly className='form-control-plaintext' id="floatingUserEmail"
             defaultValue={props.oktaUserInfo.email} placeholder="Email" />
            <label htmlFor="floatingUserEmail">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" name='phoneNumber' className={`form-control ${props.errors.phoneNumber && props.isSubmitting ? 'is-invalid' : ''}`} id="floatingPhoneNumber"
            onChange={(e)=> props.onChange(e.target.name as keyof ApplicantInfo, e.target.value)}
            value={props.userInfo.phoneNumber}  
            onBlur={(e) => props.handleBlur(e.target.name, e.target.value)}
            placeholder="Phone Number" />
            <label htmlFor="floatingLastName">Phone Number</label>
            {props.errors.phoneNumber && <div className="text-danger mt-1">{props.errors.phoneNumber}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="resumeUpload" className="form-label required">Resume:</label>
            <input
              className="form-control"
              type="file"
              id="resumeUpload"
              onChange={(e)=> props.onChangeFileResume(e.target.files?.[0] || null)} 
              name="resumeUrl"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumeUpload" className="form-label required">Cover Letter:</label>
            <input
              className="form-control"
              type="file"
              id="coverLetterUrl"
              onChange={(e)=> props.onChangeFileCoverLetter(e.target.files?.[0] || null)} 
              name="coverLetterUrl"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>
      </fieldset>
    </div>
  )
}
