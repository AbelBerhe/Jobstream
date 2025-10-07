package com.jobstream.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobstream.backend.dto.request.ApplicationDetailRequestDto;
import com.jobstream.backend.dto.response.ApplicationDetailResponseDto;
import com.jobstream.backend.dto.response.ApplicationsByUserResponseDto;
import com.jobstream.backend.dto.response.ExistingApplicationDetailsDto;
import com.jobstream.backend.service.ApplicationService;
import com.jobstream.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-08-25
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    private final Logger logger = LoggerFactory.getLogger(ApplicationController.class);
    private UserService userService;
    private ApplicationService applicationService;


    public ApplicationController(UserService userService, ApplicationService applicationService) {
        this.userService = userService;
        this.applicationService = applicationService;
    }

    //
    @GetMapping("populate-application")
    public ResponseEntity<?> populateApplicationForm(@AuthenticationPrincipal Jwt jwt) {
        String userEmail = jwt.getClaimAsString("sub");
//        ApplicationDetailDto applicationDetailDto = applicationService.getExistingApplicationInfo(userEmail);
        return ResponseEntity.ok("");
    }

     // Store job application with multipart files and JSON data
    @PutMapping("/store/job-application")
    public ResponseEntity<?> storeJobApplication(@AuthenticationPrincipal Jwt jwt,
                                                  @RequestParam("applicationDetail") String applicationInfoJson,
                                                  @RequestParam("resume") MultipartFile resume,
                                                  @RequestParam("coverLetter") MultipartFile coverLetter) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        ApplicationDetailRequestDto applicationDetail = mapper.readValue(applicationInfoJson, ApplicationDetailRequestDto.class);

        String userEmail = jwt.getClaimAsString("sub");
        applicationService.saveApplication(
                userEmail,
                applicationDetail,
                resume, coverLetter
        );
        return  ResponseEntity.ok(applicationDetail);
    }


    // Get all applications for a specific job post
    @GetMapping("/job-post/{jobPostId}/applications")
    public List<ApplicationDetailResponseDto> getApplicationsForJobPost(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String jobPostId) {

        return applicationService.getApplicationsByJobPost(jobPostId);
    }

    // Get all applications submitted by the authenticated user with pagination
    @GetMapping("/applicant-applications")
    public PagedModel<EntityModel<ApplicationsByUserResponseDto>> getApplications(@AuthenticationPrincipal Jwt jwt,
                                                                                  @RequestParam(defaultValue = "0") int page,
                                                                                  @RequestParam(defaultValue = "10") int size,
                                                                                  PagedResourcesAssembler<ApplicationsByUserResponseDto> assembler){

        String email = jwt.getClaim("sub");
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        Page<ApplicationsByUserResponseDto> applicantApplications = applicationService.getApplicationsByApplicant(email, pageable);

    return assembler.toModel(applicantApplications);

    }

    // Delete an application by its ID
    @DeleteMapping("/remove-application/{appId}")
    public void removeApplication(@AuthenticationPrincipal Jwt jwt,
                                  @PathVariable String appId){
        applicationService.deleteApplication(appId);
    }

    //Get existing application details for the authenticated user
    @GetMapping("existing-application-detail")
    public ExistingApplicationDetailsDto getExistingApplications(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaim("sub");
        return applicationService.updateExistingApplication(email);
    }
}



