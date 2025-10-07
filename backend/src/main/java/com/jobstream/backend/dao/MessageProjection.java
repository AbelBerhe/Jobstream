package com.jobstream.backend.dao;

import com.jobstream.backend.entity.Message;
import org.springframework.data.rest.core.config.Projection;

/**
 * Author: ABEL
 * Created: 2025-09-09
 */
// Define a projection for Message entity to expose specific fields
@Projection(name = "messageProjection", types = {Message.class})
public interface MessageProjection {
    String getId();
    String getTopic();
    String getQuestion();
    String getResponse();
    boolean isClosed();

    default String getApplicantEmail() {
        return getApplicant() != null ? getApplicant().getUserEmail() : "";
    }

    default String getAdminEmail() {
        return getAdmin() != null ? getAdmin().getUserEmail() : "";
    }

    UserSummary getApplicant();
    UserSummary getAdmin();

    interface UserSummary {
        String getUserEmail();
    }
}
