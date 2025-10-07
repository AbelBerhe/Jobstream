package com.jobstream.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import org.springframework.data.rest.core.annotation.RestResource;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id",nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "profile_picture_url")
    private String profilePictureUrl;
    @Column(name = "resume_url")
    private String resumeUrl;
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;
    @Column(name = "updated_at")
    @UpdateTimestamp
    private Timestamp updatedAt;



//    @JsonIgnore
    @OneToOne(mappedBy = "applicant",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private Address address = null;

    @JsonIgnore
    @RestResource(exported = false)
    @OneToMany(mappedBy = "recruiter",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<JobPost> jobPosts  = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "applicant",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Application> applications  = new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "applicant",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Experience> experiences  = new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "applicant",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Education> educations = new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "applicant",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Message> receivedMessages  = new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "admin",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Message> sentMessages  = new ArrayList<>();

}
