
import { AddressInfo, ApplicantInfo, EducationHistory, ExperienceHistory } from "./ApplicationPayLoad";

interface ApplicationFormData {
 applicantInfo: ApplicantInfo;
 addressInfo: AddressInfo;
 experiences: ExperienceHistory[];
 educations:  EducationHistory[]
} 
export default ApplicationFormData;
    