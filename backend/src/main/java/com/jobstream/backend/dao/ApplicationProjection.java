package com.jobstream.backend.dao;

import com.jobstream.backend.entity.Application;
import com.jobstream.backend.entity.Message;
import org.springframework.data.rest.core.config.Projection;

/**
 * Author: ABEL
 * Created: 2025-09-27
 */
// Define a projection for Application entity to expose specific fields
@Projection(name = "applicationProjection", types = {Application.class})
public interface ApplicationProjection {
    String getId();
    String getJobTitle();
    String getStatus();
    String getAppliedAt();
    JobPostSummary getJobPost();

    interface JobPostSummary{
        String getCompany();
        String getLocation();
    }
}
