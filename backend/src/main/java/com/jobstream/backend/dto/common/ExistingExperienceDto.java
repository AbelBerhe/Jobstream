package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-30
 */
@Data
@NoArgsConstructor
public class ExistingExperienceDto {
    private String id;
    private String JobTitle;
    private String companyName;
    private String expStartDate;
    private String expEndDate;
}
