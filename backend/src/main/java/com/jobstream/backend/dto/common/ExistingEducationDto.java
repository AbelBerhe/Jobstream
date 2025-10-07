package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-30
 */
@Data
@NoArgsConstructor
public class ExistingEducationDto {
    private String id;
    private String schoolName;
    private String degree;
    private String fieldOfStudy;
    private String eduStartDate;
    private String eduEndDate;
}
