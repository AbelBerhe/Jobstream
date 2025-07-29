package com.jobstream.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-07-28
 */
@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {
    List<String> applicants = List.of();

    @GetMapping("/all")
    public List<String> getAllApplicants(){

        List<String> applicants =  new ArrayList<>(List.of("applicant1", "applicant22","applicant33","applicant4","applicant5"));
        applicants.add(String.format("the size is %d", applicants.size()));
        return applicants;
    }
}
