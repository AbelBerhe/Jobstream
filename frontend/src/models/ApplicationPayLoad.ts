export interface EducationHistory {
    id: string;
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    eduStartDate: string;
    eduEndDate: string;
    isNew?: boolean;
}

export interface ExperienceHistory {
    id: string;
    jobTitle: string;
    companyName: string;
    expStartDate: string;
    expEndDate: string
    isNew?: boolean;
}

export interface AddressInfo {
    street: string;
    city: string;
    provinceOrState: string;
    postalCode: string;
    country: string;
}

export interface ApplicantInfo {
    phoneNumber: string;
}

interface ApplicationPayload {
    jobPostId?: string,
    applicantInfo: ApplicantInfo;
    addressInfo: AddressInfo;
    educations : EducationHistory[]
    experiences: ExperienceHistory[]
}


export default ApplicationPayload;