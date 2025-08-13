package com.jobstream.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
@Data
@Entity
@Table(name = "education")
@NoArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "id")
    private UUID id;
    @Column(name = "school_name", nullable = false, updatable = false)
    private String schoolName;
    @Column(name = "degree")
    private String degree;
    @Column(name = "field_of_study")
    private String fieldOfStudy;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User applicant;

    public Education(String schoolName, String fieldOfStudy, String degree) {
        this.schoolName = schoolName;
        this.fieldOfStudy = fieldOfStudy;
        this.degree = degree;
    }
}
