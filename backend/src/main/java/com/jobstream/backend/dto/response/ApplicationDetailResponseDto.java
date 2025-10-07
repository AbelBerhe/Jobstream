package com.jobstream.backend.dto.response;
import com.jobstream.backend.dto.common.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-08-25
 */
@NoArgsConstructor
@Data
public class ApplicationDetailResponseDto {
    private ApplicationDto applicationInfo;
    private ApplicantResponseDto applicantInfo;
}
