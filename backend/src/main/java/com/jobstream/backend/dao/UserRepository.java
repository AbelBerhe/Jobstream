package com.jobstream.backend.dao;

import com.jobstream.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
public interface UserRepository extends JpaRepository<User, UUID> {

}
