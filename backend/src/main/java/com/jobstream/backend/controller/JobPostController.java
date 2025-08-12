package com.jobstream.backend.controller;

import com.jobstream.backend.dto.responsemodel.JobPostDTO;
import com.jobstream.backend.service.JobPostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/job-posts")
public class JobPostController {
    private JobPostService jobPostService;

    public JobPostController(JobPostService jobPostService) {
        this.jobPostService = jobPostService;
    }

    @GetMapping
    public Page<JobPostDTO> getAllJobPosts(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobPostService.getJobPosts(pageable);
    }

    @GetMapping("/search-jobs")
    public Page<JobPostDTO> getFilteredJobPostsByLocationAndTitle(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "10") int size,
                                                                  @RequestParam String title,
                                                                  @RequestParam String location) {
        Pageable pageable = PageRequest.of(page, size);
        return jobPostService.getJobPostsByLocationAndContainingTitle(title, location, pageable);
    }
}
