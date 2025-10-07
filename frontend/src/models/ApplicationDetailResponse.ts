
import { AddressInfo, EducationHistory, ExperienceHistory } from "./ApplicationPayLoad";

interface ApplicationInfo{
    jobTitle: string;
    appliedAt: string;
}

interface ApplicantInfoResponse {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addressInfo: AddressInfo
    experiences: ExperienceHistory[];
    educations: EducationHistory[];
}


interface ApplicationDetailResponse{
    applicationInfo: ApplicationInfo;
    applicantInfo: ApplicantInfoResponse;
}

export default ApplicationDetailResponse;