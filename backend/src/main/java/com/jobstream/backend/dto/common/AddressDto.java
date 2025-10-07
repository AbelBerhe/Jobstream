package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-08-25
 */
@NoArgsConstructor
@Data
public class AddressDto {
    private String id;
    private String street;
    private String city;
    private String  provinceOrState;
    private String  postalCode;
    private String country;
}
