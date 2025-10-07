package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-08-25
 */
@NoArgsConstructor
@Data
public class ExperienceDto {
    private String id;
    private String jobTitle;
    private String companyName;
    private String expStartDate;
    private String expEndDate;
}
