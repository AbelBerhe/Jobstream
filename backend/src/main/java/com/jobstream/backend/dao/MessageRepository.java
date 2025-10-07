package com.jobstream.backend.dao;

import com.jobstream.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-09-08
 */
@RepositoryRestResource(excerptProjection = MessageProjection.class)
public interface MessageRepository  extends JpaRepository<Message, UUID> {
    @Query("SELECT m FROM Message m WHERE m.applicant.userEmail = :UserEmail")
    List<Message> findMessagesByUserEmail(@Param("UserEmail") String UserEmail);

    List<Message> findMessagesByClosed(boolean closed);
}
