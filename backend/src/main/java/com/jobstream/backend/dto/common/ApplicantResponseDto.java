package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-09-23
 */
@Data
@NoArgsConstructor
public class ApplicantResponseDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private AddressDto addressInfo;
    private List<ExperienceDto> experienceHistory;
    private List<EducationDto> educationHistory;
}
