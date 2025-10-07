package com.jobstream.backend.controller;

import com.jobstream.backend.dao.UserRepository;
import com.jobstream.backend.dto.common.JobPostDTO;
import com.jobstream.backend.service.JobPostService;
import com.jobstream.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/job-posts")
public class JobPostController {
    private JobPostService jobPostService;
    private UserService userService;
    private UserRepository userRepository;

    //
    public JobPostController(JobPostService jobPostService, UserService userService, UserRepository userRepository) {
        this.jobPostService = jobPostService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // Get all job posts with pagination and sorting by posted date in descending order
    @GetMapping
    public PagedModel<EntityModel<JobPostDTO>> getAllJobPosts(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "14") int size,
                                                              PagedResourcesAssembler<JobPostDTO> assembler) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("postedDate").descending());
        Page<JobPostDTO> jobPosts = jobPostService.getJobPosts(pageable);
        return assembler.toModel(jobPosts);
    }

    // Get job posts filtered by title and location with pagination
    @GetMapping("/search-jobs")
    public PagedModel<EntityModel<JobPostDTO>> getFilteredJobPostsByLocationAndTitle(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "10") int size,
                                                                  @RequestParam String title,
                                                                  @RequestParam String location,
                                                                  PagedResourcesAssembler<JobPostDTO> assembler) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobPostDTO> jobPosts =  jobPostService.getJobPostsByLocationAndContainingTitle(title, location, pageable);
        return assembler.toModel(jobPosts);
    }

    // Create a new job post associated with the authenticated user
    @PostMapping("/new-job-post")
    public void createNewJobPost(@AuthenticationPrincipal Jwt jwt,
                                 @RequestBody JobPostDTO jobPostDTO){

        // Ensure the user exists and create if it doesn't exist, then associate the job post with the user
        String email = jwt.getClaim("sub");
      jobPostService.saveJobPost(email,jobPostDTO);
    }


    // Get job posts created by the authenticated recruiter
    @GetMapping("me/posts")
    public PagedModel<EntityModel<JobPostDTO>> getJobPostsByRecruiter(@AuthenticationPrincipal Jwt jwt,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size,
                                                                      PagedResourcesAssembler<JobPostDTO> assembler){
        String email = jwt.getClaim("sub");
        Pageable pageable = PageRequest.of(page, size);
        Page<JobPostDTO> jobPostDTOS = jobPostService.getJobPostsByUserEmail(email, pageable);
        return assembler.toModel(jobPostDTOS);
    }


    // Delete a job post by its ID
    @DeleteMapping("remove/post/{id}")
    public void removePost(@AuthenticationPrincipal Jwt jwt,
                           @PathVariable String id){
         jobPostService.deletePost(UUID.fromString(id));
    }

}
