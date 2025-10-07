package com.jobstream.backend.dao;


import com.jobstream.backend.entity.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-03
 */
@RepositoryRestResource
public interface JobPostRepository extends JpaRepository<JobPost, UUID> {
    @Query("""
    SELECT j FROM JobPost j
    WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))
        AND  LOWER(j.location) = LOWER(:location)
""")
    Page<JobPost> findJobPostByLocationAndContainingTitle(
            @Param("title") String title,
            @Param("location") String location,
            Pageable pageable
    );

   Page<JobPost> findByRecruiter_UserEmail(String userEmail, Pageable pageable);

}

