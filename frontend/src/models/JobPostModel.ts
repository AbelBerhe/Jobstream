class JobPostModel{
    id?: string;
    title?: string;
    company?: string;
    whatWeOffer?: string;
    whatYouShouldKnow?: string;
    qualifications?: string;
    educationRequirement?: string;
    location?: string;
    jobType?: string;
    posteDate?: string
    expiryDate?: string;
    isActive?: boolean;
    
    constructor(
    id: string,
    title: string,
    company: string,
    whatWeOffer: string,
    whatYouShouldKnow: string,
    qualifications: string,
    educationRequirement: string,
    location: string,
    jobType: string,
    posteDate: string,
    expiryDate: string,
    isActive: boolean
  ) {
    this.id = id;
    this.title = title;
    this.company = company;
    this.whatWeOffer = whatWeOffer;
    this.whatYouShouldKnow = whatYouShouldKnow;
    this.qualifications = qualifications;
    this.educationRequirement = educationRequirement;
    this.location = location;
    this.jobType = jobType;
    this.posteDate = posteDate;
    this.expiryDate = expiryDate;
    this.isActive = isActive;
  }
}

export default JobPostModel;