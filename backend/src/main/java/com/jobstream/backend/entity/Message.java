package com.jobstream.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
@Data
@Entity
@Table(name = "message")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id",nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;
    @Column(name = "topic")
    private String topic;
    @Column(name = "question")
    private String question;
    @Column(name = "response")
    private String response;
    @Column(name = "closed")
    private boolean closed;



    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User applicant;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    @JsonIgnore
    private User admin;

    }
