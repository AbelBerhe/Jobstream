package com.jobstream.backend.dto.response;

import com.jobstream.backend.dto.common.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-09-30
 */
@Data
@NoArgsConstructor
public class ExistingApplicationDetailsDto {
    ExistingApplicantDto applicantInfo;
    ExistingAddressDto addressInfo;
    List<ExistingExperienceDto> experiences;
    List<ExistingEducationDto> educations;
}
