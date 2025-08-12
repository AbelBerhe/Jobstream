package com.jobstream.backend.service;

import com.jobstream.backend.dao.JobPostRepository;
import com.jobstream.backend.dto.responsemodel.JobPostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@Service
public class JobPostService {

    private JobPostRepository jobPostRepository;

    public JobPostService(JobPostRepository jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }

    public Page<JobPostDTO> getJobPosts(Pageable pageable){
        return  jobPostRepository.findAll(pageable).map(JobPostDTO::new);
    }

    public Page<JobPostDTO> getJobPostsByLocationAndContainingTitle(String title, String location, Pageable pageable){
        return  jobPostRepository.findJobPostByLocationAndContainingTitle(title, location, pageable).map(JobPostDTO::new);
    }


}
