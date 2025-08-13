import React, { useState } from 'react'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { PersonalInfo } from './components/PersonalInfo'
import { Review } from './components/Review'

export const ApplicationFormPage = () => {
    const [experienceSection, setExperienceSection] = useState([{ id: 1, data: {} }]);
    const [educationSection, setEducationSection] = useState([{ id: 1, data: {} }]);
    const [isReview, setIsReview] = useState(false);

    const addExperienceSection = () => {
        setExperienceSection(prev => [...prev, { id: prev.length + 1, data: {} }]);
    }

    const removeExperience = (id: number) => {
        setExperienceSection(prev => prev.filter(section => section.id !== id))
    }

    const removeEducation = (id: number) => {
        setEducationSection(prev => prev.filter(section => section.id !== id))
    }

    const addEducationSection = () => {
        setEducationSection(prev => [...prev, { id: prev.length + 1, data: {} }]);
    }


    return (
        <div className='container'>
            <div className='d-flex flex-column align-items-center'>
                <h2 className='p-4 my-3 text-secondary bg-light rounded rounded-2'>{isReview ? 'Review Application' :'Job Application Form'}</h2>

                {!isReview ?
                    <>
                        <PersonalInfo />
                        {experienceSection.map((section, index) => (
                            <React.Fragment key={section.id}>
                                <Experience />
                                {index > 0 &&
                                    <button type='button' className='btn btn-danger' onClick={() => removeExperience(section.id)}>Remove</button>
                                }
                            </React.Fragment>
                        ))}
                        <button type='button' className='btn btn-secondary mt-3' onClick={addExperienceSection}>Add Experience</button>
                        {educationSection.map((section, index) => (
                            <React.Fragment key={section.id}>
                                <Education />
                                {index > 0 &&
                                    <button type='button' className='btn btn-danger' onClick={() => removeEducation(section.id)}>Remove</button>
                                }
                            </React.Fragment>
                        ))}
                        <button type='button' className='btn btn-secondary mt-3' onClick={addEducationSection}>Add Education</button>
                    </>
                    :
                    <Review />
                }

                <button onClick={()=> setIsReview(!isReview)} type='button' className='btn btn-outline-primary mt-3 w-25 py-2  rounded rounded-2'>{isReview ? 'Back' : 'Next'}</button>
                <button type='button' className='btn btn-outline-primary mt-3 w-25 py-2  rounded rounded-2' disabled={!isReview}>Submit</button>
            </div>
        </div>

    )
}
