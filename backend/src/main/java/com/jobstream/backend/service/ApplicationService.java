package com.jobstream.backend.service;

import com.jobstream.backend.dao.*;
import com.jobstream.backend.dto.common.*;
import com.jobstream.backend.dto.request.ApplicationDetailRequestDto;
import com.jobstream.backend.dto.response.ApplicationDetailResponseDto;
import com.jobstream.backend.dto.response.ApplicationsByUserResponseDto;
import com.jobstream.backend.dto.response.ExistingApplicationDetailsDto;
import com.jobstream.backend.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Author: ABEL
 * Created: 2025-08-29
 */
@Service
@Transactional
public class ApplicationService {

    private ApplicationRepository applicationRepository;
    private UserRepository userRepository;
    private JobPostRepository jobPostRepository;
    private ExperienceRepository experienceRepository;
    private EducationRepository educationRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobPostRepository jobPostRepository,
                              UserRepository userRepository,
                              ExperienceRepository experienceRepository,
                              EducationRepository educationRepository) {
        this.userRepository = userRepository;
        this.jobPostRepository = jobPostRepository;
        this.applicationRepository = applicationRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
    }

    public void saveApplication(String email,
                                ApplicationDetailRequestDto applicationDetail,
                                MultipartFile resume,
                                MultipartFile coverLetter) {



       User applicant = userRepository.findUserByUserEmail(email).orElseThrow(() -> new RuntimeException("User doesn't exist"));

       applicant.setPhoneNumber(applicationDetail.getApplicantInfo().getPhoneNumber());
       applicant.setResumeUrl(resume.getOriginalFilename());

       Address address = mapToAddress(applicationDetail, applicant);

        List<Experience> experiences = applicationDetail.getExperiences()
                .stream()
                .map(exp -> mapToExperience(exp, applicant)).collect(Collectors.toList());

        List<Education> educations = applicationDetail.getEducations()
                .stream()
                .map(edu -> mapToEducation(edu, applicant)).collect(Collectors.toList());

        applicant.setAddress(address);
        applicant.setExperiences(experiences);
        applicant.setEducations(educations);

         userRepository.save(applicant);

      Optional<JobPost> jobPostOptional = jobPostRepository.findById(UUID.fromString(applicationDetail.getJobPostId()));
        if (jobPostOptional.isEmpty()) {
            throw new RuntimeException("Job post not found with ID: " + applicationDetail.getJobPostId());
        }
        JobPost jobPost = jobPostOptional.get();

        Application application = mapToApplication(resume.getOriginalFilename(),
                coverLetter.getOriginalFilename(), applicant, jobPost);

        applicationRepository.save(application);
    }




    private Application mapToApplication(String resumeUrl, String coverLetterUrl, User applicant, JobPost jobPost) {
        return Application.builder()
                .jobTitle(jobPost.getTitle())
                .resumeUrl(resumeUrl)
                .coverLetterUrl(coverLetterUrl)
                .appliedAt(LocalDate.now())
                .status("Received")
                .jobPost(jobPost)
                .applicant(applicant)
                .build();
    }


    private Address mapToAddress(ApplicationDetailRequestDto addressInfo, User applicant) {

        Address address = applicant.getAddress();

        if (address == null) {
            address = new Address();
            address.setApplicant(applicant);
        }

        address.setStreet(addressInfo.getAddressInfo().getStreet());
        address.setCity(addressInfo.getAddressInfo().getCity());
        address.setProvinceOrState(addressInfo.getAddressInfo().getProvinceOrState());
        address.setCountry(addressInfo.getAddressInfo().getCountry());
        address.setPostalCode(addressInfo.getAddressInfo().getPostalCode());

        return address;

    }

    private Experience mapToExperience(ExperienceDto experience, User applicant) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (isValidUUID(experience.getId())) {
            Experience exp = experienceRepository.findById(UUID.fromString(experience.getId())).orElseThrow(() ->
                    new RuntimeException("Experience not found with ID: " + experience.getId()));
            exp.setJobTitle(experience.getJobTitle());
            exp.setCompanyName(experience.getCompanyName());
            exp.setStartDate(LocalDate.parse(experience.getExpStartDate(), formatter));
            exp.setEndDate(LocalDate.parse(experience.getExpEndDate(), formatter));
            return exp;
        }
        return Experience.builder()
                .jobTitle(experience.getJobTitle())
                .companyName(experience.getCompanyName())
                .startDate(LocalDate.parse(experience.getExpStartDate(), formatter))
                .endDate(LocalDate.parse(experience.getExpEndDate(), formatter))
                .applicant(applicant)
                .build();
    }


    private Education mapToEducation(EducationDto education, User applicant) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (isValidUUID(education.getId())) {
          Education edu = educationRepository.findById(UUID.fromString(education.getId())).orElseThrow(() ->
                  new RuntimeException("Education not found with ID: " + education.getId()));
                edu.setSchoolName(education.getSchoolName());
                edu.setDegree(education.getDegree());
                edu.setFieldOfStudy(education.getFieldOfStudy());
                edu.setStartDate(LocalDate.parse(education.getEduStartDate(), formatter));
                edu.setEndDate(LocalDate.parse(education.getEduEndDate(), formatter));
                return edu;
        }

        return Education.builder()
                .schoolName(education.getSchoolName())
                .degree(education.getDegree())
                .fieldOfStudy(education.getFieldOfStudy())
                .startDate(LocalDate.parse(education.getEduStartDate(), formatter))
                .endDate(LocalDate.parse(education.getEduEndDate(), formatter))
                .applicant(applicant)
                .build();
       }



    private boolean isValidUUID(String id) {
        try {
            UUID.fromString(id);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }


    public List<ApplicationDetailResponseDto>  getApplicationsByJobPost(String jobPostId){

        List<ApplicationDetailResponseDto> applicationsForJobPost = new ArrayList<>();
        Optional<JobPost> jobPost = jobPostRepository.findById(UUID.fromString(jobPostId));

        if(jobPost.isEmpty()){
            throw  new RuntimeException("JobPost doesn't not exist!");
        }
        List<Application> applications = jobPost.get().getApplications();

        for(Application application : applications){
            ApplicationDetailResponseDto applicationDetailResponseDto = new ApplicationDetailResponseDto();
            ApplicationDto applicationDto = mapToApplicationDto(application);
            ApplicantResponseDto applicantResponseDto = mapToApplicantResponseDto(application);
            applicationDetailResponseDto.setApplicationInfo(applicationDto);
            applicationDetailResponseDto.setApplicantInfo(applicantResponseDto);
            applicationsForJobPost.add(applicationDetailResponseDto);
        }

        return  applicationsForJobPost;

    }


    private ApplicationDto mapToApplicationDto(Application application){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MMM-dd");
        ApplicationDto applicantDto = new ApplicationDto();
        applicantDto.setJobTitle(application.getJobTitle());
        applicantDto.setAppliedAt(application.getAppliedAt().format(formatter));
        return  applicantDto;
    }

    private ApplicantResponseDto mapToApplicantResponseDto(Application application){
        User applicant = application.getApplicant();

        //populate addressDto
        Address address = applicant.getAddress();
        AddressDto addressDto = mapToAddressDto(address);

        //populate experienceDto
        List<ExperienceDto> experienceDtoList  = applicant.getExperiences()
                .stream()
                .map(this::mapToExperienceDto).toList();

        //populate experienceDto
        List<EducationDto> educationDtoList  = applicant.getEducations()
                .stream()
                .map(this::mapToEducationDto).toList();

        //populate applicantResponseDto
        ApplicantResponseDto applicantResponseDto = new ApplicantResponseDto();
        applicantResponseDto.setFirstName(applicant.getFirstName());
        applicantResponseDto.setLastName(applicant.getLastName());
        applicantResponseDto.setEmail(applicant.getUserEmail());
        applicantResponseDto.setPhoneNumber(applicant.getPhoneNumber());
        applicantResponseDto.setAddressInfo(addressDto);
        applicantResponseDto.setExperienceHistory(experienceDtoList);
        applicantResponseDto.setEducationHistory(educationDtoList);

        return  applicantResponseDto;
    }



    private AddressDto mapToAddressDto(Address address){
        AddressDto addressDto = new AddressDto();
        addressDto.setStreet(address.getStreet());
        addressDto.setCity(address.getCity());
        addressDto.setCountry(address.getCountry());
        addressDto.setProvinceOrState(address.getProvinceOrState());
        addressDto.setPostalCode(address.getPostalCode());
        return addressDto;
    }


    private ExperienceDto mapToExperienceDto(Experience experience){
        ExperienceDto experienceDto = new ExperienceDto();
        experienceDto.setJobTitle(experience.getJobTitle());
        experienceDto.setCompanyName(experience.getCompanyName());
        experienceDto.setExpStartDate(String.valueOf(experience.getStartDate()));
        experienceDto.setExpEndDate(String.valueOf(experience.getEndDate()));
        return experienceDto;
    }
    private EducationDto mapToEducationDto(Education education){
        EducationDto educationDto = new EducationDto();
        educationDto.setDegree(education.getDegree());
        educationDto.setSchoolName(education.getSchoolName());
        educationDto.setFieldOfStudy(education.getFieldOfStudy());
        educationDto.setEduStartDate(String.valueOf(education.getStartDate()));
        educationDto.setEduEndDate(String.valueOf(education.getEndDate()));
        return educationDto;
    }

    public Page<ApplicationsByUserResponseDto> getApplicationsByApplicant(String email, Pageable pageable){
        Page<Application> applications = applicationRepository.findByApplicant_UserEmail(email, pageable);
        return applications.map(this::mapToApplicationsByUserResponseDto);
    }


    private ApplicationsByUserResponseDto mapToApplicationsByUserResponseDto(Application application){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MMM-dd");
        ApplicationsByUserResponseDto appDto = new ApplicationsByUserResponseDto();
        appDto.setId(String.valueOf(application.getId()));
        appDto.setJobTitle(application.getJobTitle());
        appDto.setStatus(application.getStatus());
        appDto.setCompany(application.getJobPost().getCompany());
        appDto.setAppliedAt(application.getAppliedAt().format(formatter));
        appDto.setLocation(application.getJobPost().getLocation());
        return appDto;
    }

    public void deleteApplication(String appId){
        applicationRepository.deleteById(UUID.fromString(appId));
    }

    public ExistingApplicationDetailsDto updateExistingApplication(String email){
        Optional<User> userOptional = userRepository.findUserByUserEmail(email);
        if(userOptional.isEmpty()){
            return null;
        }
        User application = userOptional.get();
        return getExistingApplicationDetailDto(application);
    }


    private ExistingApplicationDetailsDto getExistingApplicationDetailDto(User application) {
        ExistingApplicationDetailsDto existingApplicationDetail = new ExistingApplicationDetailsDto();

        if(application.getPhoneNumber() != null){
            ExistingApplicantDto existingApplicant = new ExistingApplicantDto();
            existingApplicant.setPhoneNumber(application.getPhoneNumber());
            existingApplicationDetail.setApplicantInfo(existingApplicant);
        }

        if(application.getAddress() != null){
            ExistingAddressDto existingAddress = mapToExistingAddressDto(application.getAddress());
            existingApplicationDetail.setAddressInfo(existingAddress);
        }

        if(application.getExperiences() != null && !application.getExperiences().isEmpty()){
            List<ExistingExperienceDto> existingExperiences = application.getExperiences().stream()
                    .map(this::mapToExistingExperienceDto)
                    .collect(Collectors.toList());
            existingApplicationDetail.setExperiences(existingExperiences);
        }

        if(application.getEducations() != null && !application.getEducations().isEmpty()){
            List<ExistingEducationDto> existingEducations = application.getEducations().stream()
                    .map(this::mapToExistingEducationDto)
                    .collect(Collectors.toList());
            existingApplicationDetail.setEducations(existingEducations);
        }

        return existingApplicationDetail;
    }

    private ExistingAddressDto mapToExistingAddressDto(Address address){
        ExistingAddressDto existingAddressDto = new ExistingAddressDto();
        existingAddressDto.setStreet(address.getStreet());
        existingAddressDto.setCity(address.getCity());
        existingAddressDto.setCountry(address.getCountry());
        existingAddressDto.setProvinceOrState(address.getProvinceOrState());
        existingAddressDto.setPostalCode(address.getPostalCode());
        return existingAddressDto;
    }

    private ExistingExperienceDto mapToExistingExperienceDto(Experience experience){
        ExistingExperienceDto existingExperienceDto = new ExistingExperienceDto();
        existingExperienceDto.setId(String.valueOf(experience.getId()));
        existingExperienceDto.setJobTitle(experience.getJobTitle());
        existingExperienceDto.setCompanyName(experience.getCompanyName());
        existingExperienceDto.setExpStartDate(String.valueOf(experience.getStartDate()));
        existingExperienceDto.setExpEndDate(String.valueOf(experience.getEndDate()));
        return existingExperienceDto;
    }

    private ExistingEducationDto mapToExistingEducationDto(Education education){
        ExistingEducationDto existingEducationDto = new ExistingEducationDto();
        existingEducationDto.setId(String.valueOf(education.getId()));
        existingEducationDto.setDegree(education.getDegree());
        existingEducationDto.setSchoolName(education.getSchoolName());
        existingEducationDto.setFieldOfStudy(education.getFieldOfStudy());
        existingEducationDto.setEduStartDate(String.valueOf(education.getStartDate()));
        existingEducationDto.setEduEndDate(String.valueOf(education.getEndDate()));
        return existingEducationDto;
    }


}





