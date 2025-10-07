package com.jobstream.backend.dto.common;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-30
 */
@Data
@NoArgsConstructor
public class ExistingAddressDto {
    private String street;
    private String city;
    private String provinceOrState;
    private String postalCode;
    private String country;

}
