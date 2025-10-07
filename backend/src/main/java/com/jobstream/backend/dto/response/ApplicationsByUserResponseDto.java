package com.jobstream.backend.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-27
 */
@Data
@NoArgsConstructor
public class ApplicationsByUserResponseDto {
    private String id;
    private String JobTitle;
    private String status;
    private String appliedAt;
    private String company;
    private String location;
}
