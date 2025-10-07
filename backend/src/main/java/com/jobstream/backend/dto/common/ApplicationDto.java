package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Author: ABEL
 * Created: 2025-09-23
 */
@Data
@NoArgsConstructor
public class ApplicationDto {
    private String JobTitle;
    private String appliedAt;
}
