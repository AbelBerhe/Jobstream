class ApplicationsByUser {
    id: string;
    jobTitle: string;
    status: string;
    company: string;
    appliedAt: string;
    location: string;

    constructor(id: string, jobTitle: string, status: string, company: string, appliedAt: string, location: string) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.status = status;
        this.company = company;
        this.appliedAt = appliedAt;
        this.location = location;
    }

}
export default ApplicationsByUser;