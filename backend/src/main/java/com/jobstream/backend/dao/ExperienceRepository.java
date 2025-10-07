package com.jobstream.backend.dao;

import com.jobstream.backend.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-10-01
 */
public interface ExperienceRepository extends JpaRepository<Experience, UUID> {
}
