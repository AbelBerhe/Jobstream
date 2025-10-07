package com.jobstream.backend.dto.response;

import com.jobstream.backend.dto.common.AddressDto;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-29
 */
@Data
@NoArgsConstructor
public class UserWithAddressDto {
    private  String email;
    private String firstName;
    private String lastName;
    private AddressDto addressInfo;
}
