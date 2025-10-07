package com.jobstream.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.sql.SQLType;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-01
 */
@Entity
@Data
@Table(name = "address")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;
    @Column(name = "street")
    private String street;
    @Column(name = "city")
    private String city;
    @Column(name = "province_or_state")
    private String provinceOrState;
    @Column(name = "postal_code")
    private String postalCode;
    @Column(name = "country")
    private String country;


    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User applicant;



}
