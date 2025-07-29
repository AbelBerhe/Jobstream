package com.jobstream.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Author: ABEL
 * Created: 2025-07-28
 */
@Configuration
@EnableWebSecurity
@Profile("!test")
public class SecurityConfiguration {

    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {

        http.authorizeHttpRequests( auth ->
                auth
//                        .requestMatchers("").authenticated()
//                        .requestMatchers("").permitAll()
                        .anyRequest().permitAll()
        )
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));


               return http.build();
    }
}
