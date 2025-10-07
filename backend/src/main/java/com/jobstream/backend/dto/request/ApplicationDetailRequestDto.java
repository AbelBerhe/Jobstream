package com.jobstream.backend.dto.request;
import com.jobstream.backend.dto.common.AddressDto;
import com.jobstream.backend.dto.common.EducationDto;
import com.jobstream.backend.dto.common.ExperienceDto;
import com.jobstream.backend.dto.common.ApplicantRequestDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-08-25
 */
@NoArgsConstructor
@Data
public class ApplicationDetailRequestDto {
    private String jobPostId;
    private ApplicantRequestDto applicantInfo;
    private AddressDto addressInfo;
    private List<ExperienceDto> experiences;
    private List<EducationDto> educations;
}
