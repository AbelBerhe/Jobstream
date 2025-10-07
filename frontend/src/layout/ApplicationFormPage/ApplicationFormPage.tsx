import React, { useEffect, useState } from 'react'
import { Review } from './components/Review'
import { Address } from './components/Address'
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { PersonalInfo } from './components/PersonalInfo';
import ApplicationPayload, { AddressInfo, ApplicantInfo, EducationHistory, ExperienceHistory } from '../../models/ApplicationPayLoad';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import ApplicationFormData from '../../models/ApplicationFormData';

interface JobPostParams {
    id: string
}

export interface OktaUserInfo {
    firstName: string;
    lastName: string;
    email: string;
}

export const ApplicationFormPage = () => {
    const { id } = useParams<JobPostParams>();
    const history = useHistory();
    const { authState } = useOktaAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [isReview, setIsReview] = useState(false);
    const [resume, setResume] = useState<File | null>(null)
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [coverLetter, setCoverLetter] = useState<File | null>(null)
    const [oktaUserInfo, setOktaUserInfo] = useState<OktaUserInfo>({
        firstName: '',
        lastName: '',
        email: ''
    })


    const [applicationData, setApplicationData] = useState<ApplicationFormData>({
        applicantInfo: {
            phoneNumber: '',
        },
        addressInfo: {
            street: '',
            city: '',
            provinceOrState: '',
            postalCode: '',
            country: '',
        },
        experiences: [{
            id: '',
            jobTitle: '',
            companyName: '',
            expStartDate: '',
            expEndDate: ''
        }],
        educations: [{
            id:'',
            schoolName: '',
            degree: '',
            fieldOfStudy: '',
            eduStartDate: '',
            eduEndDate: ''
        }],

    });




    useEffect(() => {
        const fetchOktaUserInfo = async () => {
            if (authState && authState?.isAuthenticated) {
                const fullName = authState.idToken?.claims.name || '';
                const [firstName, lastName] = fullName.split(' ');
                setOktaUserInfo({
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email: authState.accessToken?.claims.sub || 'email'
                });
            }
        }

        fetchOktaUserInfo();

    }, [authState]);

    useEffect(() => {
        const fetchExistingApplication = async () => {
            if (authState && authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/application/existing-application-detail`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(url, requestOptions);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const responseData = await response.json();
                setApplicationData(responseData);
            }
            setIsLoading(false);
        }

        fetchExistingApplication().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    },[]);


    const validatePhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        if (!phone) return '';
        return /^\d{10,15}$/.test(cleaned)
            ? ''
            : 'Please enter a valid phone number (10-15 digits).';
    };


    const validatePostalCode = (postalCode: string ) =>{
        const regex = /^[A-Za-z0-9\s\-]{3,10}$/;
        if(postalCode.trim() === ''){
            return 'This field is required';
        }else if(!regex.test(postalCode)){
            return 'Please enter a valid postal code.';
        }else{
            return '';  
        }   
    }

    const validateEmptyField = (fieldValue: string) => {
        if(fieldValue.trim() === ''){
            return 'This field is required';    
        }else{
            return '';
        }   
    }

       

    //validation
    const handleBlur = (field: string, value: string) => {
        setIsSubmitting(false);

        let error = '';
        if (field === 'phoneNumber') {
            error = validatePhone(value);
        }else if(field === 'postalCode') {
            error = validatePostalCode(value);
        }else{
            error = validateEmptyField(value);
        }

        if (error) {
            setErrors(prev => ({ ...prev, [field]: error }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        };
    }


    const validateForm = () => {
         setIsSubmitting(true);
        const newErrors: {[key: string]: string} = {};
        // Validate personal info
        const phoneError = validatePhone(applicationData.applicantInfo.phoneNumber);
        if (phoneError) newErrors.phoneNumber = phoneError;

        // Validate address info
        const streetError = validateEmptyField(applicationData.addressInfo.street);
        if (streetError) newErrors.street = streetError;
        const postalCodeError = validatePostalCode(applicationData.addressInfo.postalCode);
        if (postalCodeError) newErrors.postalCode = postalCodeError;
        const cityError = validateEmptyField(applicationData.addressInfo.city);
        if (cityError) newErrors.city = cityError;
        const provinceError = validateEmptyField(applicationData.addressInfo.provinceOrState);
        if (provinceError) newErrors.provinceOrState = provinceError;
        const countryError = validateEmptyField(applicationData.addressInfo.country);
        if (countryError) newErrors.country = countryError;

        //validate experience
        applicationData.experiences.forEach((exp, index) => {
            const jobTitleError = validateEmptyField(exp.jobTitle);
            if (jobTitleError) newErrors[`jobTitle-${index}`] = jobTitleError;
            const companyNameError = validateEmptyField(exp.companyName);
            if (companyNameError) newErrors[`companyName-${index}`] = companyNameError;
            const expStartDateError = validateEmptyField(exp.expStartDate);
            if (expStartDateError) newErrors[`expStartDate-${index}`] = expStartDateError;
            const expEndDateError = validateEmptyField(exp.expEndDate);
            if (expEndDateError) newErrors[`expEndDate-${index}`] = expEndDateError;
        }
        );

        //validate education
        applicationData.educations.forEach((edu, index) => {
            const schoolNameError = validateEmptyField(edu.schoolName);
            if (schoolNameError) newErrors[`schoolName-${index}`] = schoolNameError;
            const degreeError = validateEmptyField(edu.degree);
            if (degreeError) newErrors[`degree-${index}`] = degreeError;
            const fieldOfStudyError = validateEmptyField(edu.fieldOfStudy);
            if (fieldOfStudyError) newErrors[`fieldOfStudy-${index}`] = fieldOfStudyError; 
            const eduStartDateError = validateEmptyField(edu.eduStartDate);
            if (eduStartDateError) newErrors[`eduStartDate-${index}`] = eduStartDateError;
            const eduEndDateError = validateEmptyField(edu.eduEndDate);
            if (eduEndDateError) newErrors[`eduEndDate-${index}`] = eduEndDateError;
        }   
        );

        setErrors(newErrors);

        console.log(newErrors);
     

        if (Object.keys(newErrors).length > 0) {
            window.scrollTo({top:0, behavior:'smooth'});
            return;
        }

        setIsReview(!isReview);
    }


    //onChange

    const handlePersonalInfoChange = (field: keyof ApplicantInfo, value: string) => {
        setApplicationData(prev => ({
            ...prev,
            applicantInfo: { ...prev?.applicantInfo, [field]: value }
        }));

    };

    const handleFileResume = (value: File | null) => {
       
        setResume(value)
    };
    const handleFileCoverLetter = (value: File | null) => {
        setCoverLetter(value)
    };


    const handleAddressChange = (field: keyof AddressInfo, value: string) => {
        setApplicationData(prev => ({
            ...prev,
            addressInfo: { ...prev.addressInfo, [field]: value }
        }));
    };


    const handleExperienceChange = (index: number, field: keyof ExperienceHistory, value: string) => {
        setApplicationData(prev => ({
            ...prev,
            experiences: prev.experiences.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
        }));
    };


    const handleEducationChange = (index: number, field: keyof EducationHistory, value: string) => {
        setApplicationData(prev => ({
            ...prev,
            educations: prev.educations.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            )
        }));
    };



    //add section
    const addExperienceSection = () => {
        setApplicationData(prev => ({
            ...prev,
            experiences: [...prev.experiences,
            {
                id:(Date.now() + Math.random()).toString(),
                jobTitle: '',
                companyName: '',
                expStartDate: '',
                expEndDate: '',
                isNew: true
            }]
        }));
    }

    const addEducationSection = () => {
        setApplicationData(prev => ({
            ...prev,
            educations: [...prev.educations,
            {
                id: (Date.now() + Math.random()).toString(),
                schoolName: '',
                degree: '',
                fieldOfStudy: '',
                eduStartDate: '',
                eduEndDate: '',
                isNew: true
            }]
        }));
    }



    //remove section
    const removeExperience = (id: string) => {
        setApplicationData(prev => ({
            ...prev,
            experiences: prev.experiences.filter(exp => exp.id !== id)
        }))
    }



    const removeEducation = (id: string) => {
        setApplicationData(prev => ({
            ...prev,
            educations: prev.educations.filter(edu => edu.id !== id)
        }))
    }




    const handelSubmitApplication = async () => {
        if (authState && authState.isAuthenticated) {
            try {
                const formData = new FormData();

                const payloadData = {
                    ...applicationData,
                    experiences: applicationData.experiences.map(({isNew, ...rest}) => rest),
                    educations: applicationData.educations.map(({isNew, ...rest}) => rest),
                    jobPostId: id
                }

                formData.append('applicationDetail', JSON.stringify(payloadData));
                if (resume) formData.append('resume', resume);
                if (coverLetter) formData.append('coverLetter', coverLetter);

                const url = 'http://localhost:8080/api/application/store/job-application';
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    },
                    body: formData
                };

                const response = await fetch(url, requestOptions);
            
                if (!response.ok) {
                    throw new Error("Can't create job");
                }

                console.log(formData)
                  
                setIsSubmitSuccessful(true);
                window.scrollTo({top:0, behavior:'smooth'});
                setTimeout(() => {
                    setIsSubmitSuccessful(false);
                    history.push("/applications");
                }, 2000);
            } catch (err: any) {
                setHttpError(err.message);
            }
        }
    }

    if (httpError) {
        return (
            <div className='container mt-3'>
                {httpError}
            </div>
        )
    }



    return (
        <div className='container application-page'>
            <h2 className='p-4 my-3 text-secondary text-center bg-light rounded rounded-2'>{isReview ? 'Review Application' : 'Job Application Form'}</h2>
            {isSubmitSuccessful && <div className="alert alert-success col-12 col-md-4 mx-auto text-center" role="alert">
                Your application has been successfully submitted!
            </div>}
            {(Object.keys(errors).length > 0) && isSubmitting &&
                <div className="alert alert-danger col-12 col-md-6 mx-auto text-center" role="alert">
                  Please correct the errors in the highlighted fields before proceeding.
                </div>}
            <form className='d-flex flex-column align-items-center needs-validation' noValidate>
                {!isReview ?
                    <>
                        <PersonalInfo userInfo={applicationData.applicantInfo}
                            oktaUserInfo={oktaUserInfo}
                            onChange={handlePersonalInfoChange}
                            onChangeFileResume={handleFileResume}
                            onChangeFileCoverLetter={handleFileCoverLetter}
                            errors={errors}
                            handleBlur={handleBlur}
                            isSubmitting={isSubmitting}
                        />
                        <Address 
                         addressInfo={applicationData.addressInfo}
                         onChange={handleAddressChange}
                         handleBlur={handleBlur}
                         errors={errors}
                         isSubmitting={isSubmitting}
                         />
                        {applicationData.experiences.map((exp, index) => (
                            <React.Fragment key={exp.id}>
                                <Experience 
                                index={index} 
                                experienceHistory={applicationData.experiences[index]} 
                                onChange={handleExperienceChange}
                                errors={errors}
                                handleBlur={handleBlur} 
                                isSubmitting={isSubmitting} 
                                />
                                {exp.isNew &&
                                    <button type='button' className='btn btn-danger' onClick={() => removeExperience(exp.id)}>Remove</button>
                                }
                            </React.Fragment>
                        ))}
                        <button type='button' className='btn btn-secondary mt-3' onClick={addExperienceSection}>Add Experience</button>

                        {applicationData.educations.map((edu, index) => (
                            <React.Fragment key={edu.id}>
                                <Education 
                                index={index} 
                                educationHistory={applicationData.educations[index]} 
                                onChange={handleEducationChange}
                                errors={errors}
                                handleBlur={handleBlur} 
                                isSubmitting={isSubmitting} 
                                />
                                {edu.isNew &&
                                    <button type='button' className='btn btn-danger' onClick={() => removeEducation(edu.id)}>Remove</button>
                                }
                            </React.Fragment>
                        ))}
                        <button type='button' className='btn btn-secondary mt-3' onClick={addEducationSection}>Add Education</button>
                    </>
                    :
                    <Review
                        formData={applicationData}
                        oktaUserInfo={oktaUserInfo}
                        resume={resume}
                        coverLetter={coverLetter} />
                }

                <button onClick={() => validateForm()} type='button' className='btn btn-outline-primary mt-3 w-25 py-2  rounded rounded-2'>{isReview ? 'Back' : 'Next'}</button>
                <button type='button' onClick={handelSubmitApplication} className='btn btn-outline-primary mt-3 w-25 py-2  rounded rounded-2' disabled={!isReview}>Submit</button>
                <p>

                </p>
            </form>
        </div>
    )

}
