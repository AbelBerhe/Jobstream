package com.jobstream.backend.dto.request;

import com.jobstream.backend.dto.common.AddressDto;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-08
 */
@Data
@NoArgsConstructor
public class UserRequestDto {
    private  String email;
    private String firstName;
    private String lastName;
}
