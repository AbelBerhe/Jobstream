package com.jobstream.backend.dao;

import com.jobstream.backend.entity.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-29
 */
@RepositoryRestResource(excerptProjection = ApplicationProjection.class)
public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    Page<Application> findByApplicant_UserEmail(String email, Pageable pageable);
}
