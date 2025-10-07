package com.jobstream.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "job_post")
@Builder
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;
    @Column(name = "title")
    private String title;
    @Column(name = "company")
    private String company;
    @Column(name = "what_we_offer")
    private String whatWeOffer;
    @Column(name = "what_you_should_know")
    private String whatYouShouldKnow;
    @Column(name = "qualifications")
    private String qualifications;
    @Column(name = "education_requirements")
    private String educationRequirement;
    @Column(name = "location")
    private String location;
    @Column(name = "job_type")
    private String jobType;
    @Column(name = "posted_date")
    private LocalDateTime postedDate;
    @Column(name = "expiry_date")
    private LocalDate expiryDate;
    @Column(name = "is_active")
    private boolean isActive;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User recruiter;

    @JsonIgnore
    @OneToMany(mappedBy = "jobPost",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    List<Application> applications;


//    public JobPost(String title, String company, String whatWeOffer, String whatYouShouldKnow, String qualifications, String educationRequirement, String location, String jobType, LocalDate expiryDate) {
//        this.title = title;
//        this.company = company;
//        this.whatWeOffer = whatWeOffer;
//        this.whatYouShouldKnow = whatYouShouldKnow;
//        this.qualifications = qualifications;
//        this.educationRequirement = educationRequirement;
//        this.location = location;
//        this.jobType = jobType;
//        this.expiryDate = expiryDate;
//    }


}
