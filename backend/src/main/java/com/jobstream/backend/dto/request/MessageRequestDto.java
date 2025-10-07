package com.jobstream.backend.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: ABEL
 * Created: 2025-09-08
 */
@Data
@NoArgsConstructor
public class MessageRequestDto {
    private String topic;
    private String question;
}
