package com.jobstream.backend.service;

import com.jobstream.backend.dao.JobPostRepository;
import com.jobstream.backend.dao.UserRepository;
import com.jobstream.backend.dto.common.JobPostDTO;
import com.jobstream.backend.entity.JobPost;
import com.jobstream.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@Service
public class JobPostService {

    private JobPostRepository jobPostRepository;
    private UserRepository userRepository;
    private UserService userService;


    public JobPostService(JobPostRepository jobPostRepository, UserRepository userRepository) {
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
    }


    public Page<JobPostDTO> getJobPosts(Pageable pageable) {
        return jobPostRepository.findAll(pageable).map(JobPostDTO::new);
    }

    public Page<JobPostDTO> getJobPostsByLocationAndContainingTitle(String title, String location, Pageable pageable) {
        return jobPostRepository.findJobPostByLocationAndContainingTitle(title, location, pageable).map(JobPostDTO::new);
    }

    // Save a new job post associated with a recruiter identified by email
    public void saveJobPost(String email, JobPostDTO jobPostDTO) {

        if (jobPostDTO == null) {
            throw new IllegalArgumentException("JobPostDTO can't be null");
        }

        User recruiter = userRepository.findUserByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User doesn't exist"));

        JobPost jobPost = new JobPost();
        jobPost.setTitle(jobPostDTO.getTitle());
        jobPost.setCompany(jobPostDTO.getCompany());
        jobPost.setWhatWeOffer(jobPostDTO.getWhatWeOffer());
        jobPost.setWhatYouShouldKnow(jobPostDTO.getWhatYouShouldKnow());
        jobPost.setQualifications(jobPostDTO.getQualifications());
        jobPost.setEducationRequirement(jobPostDTO.getEducationRequirement());
        jobPost.setLocation(jobPostDTO.getLocation());
        jobPost.setJobType(jobPostDTO.getJobType());
        jobPost.setPostedDate(LocalDateTime.now());
        try {
            jobPost.setExpiryDate(LocalDate.parse(jobPostDTO.getExpiryDate()));
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid expiry date: " + jobPostDTO.getExpiryDate(), e);
        }
        jobPost.setRecruiter(recruiter);
        jobPostRepository.save(jobPost);
    }

    // Get job posts created by a specific user identified by email with pagination
    public Page<JobPostDTO> getJobPostsByUserEmail(String email, Pageable pageable){
        return jobPostRepository.findByRecruiter_UserEmail(email, pageable).map(JobPostDTO::new);
    }

    // Delete a job post by its ID
    public void deletePost(UUID id){
        jobPostRepository.deleteById(id);
    }
}
