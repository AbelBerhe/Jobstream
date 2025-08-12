package com.jobstream.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
@Data
@Entity
@Table(name = "application")
@NoArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id",nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;
    @Column(name = "job_title")
    private String jobTitle;
    @Column(name = "resume_url")
    private String resumeUrl;
    @Column(name = "cover_letter_url")
    private String coverLetterUrl;
    @Column(name = "status")
    private String status;
    @Column(name = "applied_at")
    private Date appliedAt = new Date();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User applicant;

    @ManyToOne
    @JoinColumn(name = "job_post_id", referencedColumnName = "id")
    @JsonIgnore
    private JobPost jobPost;


    public Application(String coverLetterUrl, String resumeUrl, String jobTitle, Date appliedAt) {
        this.coverLetterUrl = coverLetterUrl;
        this.resumeUrl = resumeUrl;
        this.jobTitle = jobTitle;
        this.appliedAt = appliedAt;
    }
}
