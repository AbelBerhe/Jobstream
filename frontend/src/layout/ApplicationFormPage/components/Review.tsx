import React, { useEffect } from 'react'
import ApplicationPayload from '../../../models/ApplicationPayLoad'
import { ExperienceReview } from './ExperienceReview'
import { EducationReview } from './EducationReview'
import { OktaUserInfo } from '../ApplicationFormPage';
import ApplicationFormData from '../../../models/ApplicationFormData';
interface ReviewProps {
  formData: ApplicationFormData;
  oktaUserInfo: OktaUserInfo;
  resume: File | null;
  coverLetter : File | null;
}
export const Review: React.FC<ReviewProps> = (props) => {


  return (
    <div className='mt-3 col-12 col-lg-8'>
      <div className='border shadow-sm rounded rounded-3 p-4 bg-light'>
        <h5 className='text-center mb-3'>Personal Info</h5>
        <p className='mb-1'><span className='fw-bold me-2 '>First Name:</span>{props.oktaUserInfo.firstName}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Last Name:</span>  {props.oktaUserInfo.lastName}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Email:</span>  {props.oktaUserInfo.email}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Phone Number:</span>  {props.formData.applicantInfo.phoneNumber}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Resume:</span>  {props.resume?.name}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Cover Letter:</span>{props.coverLetter?.name}</p>

        <h5 className='text-center my-3'>Address</h5>
        <hr />

        <p className='mb-1'><span className='fw-bold me-2 '>Street:</span>{props.formData.addressInfo.street}</p>
        <p className='mb-1'><span className='fw-bold me-2'>City:</span>  {props.formData.addressInfo.city}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Province/State:</span>  {props.formData.addressInfo.provinceOrState}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Postal Code:</span>  {props.formData.addressInfo.postalCode}</p>
        <p className='mb-1'><span className='fw-bold me-2'>Country:</span>  {props.formData.addressInfo.country}</p>


        <h5 className='text-center my-3'>Experience</h5>
        <hr />
        {props.formData.experiences.map((exp, index) =>
          <ExperienceReview key={exp.id} exp={exp} />
        )}

        <h5 className='text-center my-3'>Education</h5>
        <hr />
        {props.formData.educations.map((edu, index) =>
          <EducationReview key={edu.id} edu={edu} />
        )}
      </div>


    </div>
  )
}
