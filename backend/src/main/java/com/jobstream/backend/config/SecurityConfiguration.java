package com.jobstream.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Author: ABEL
 * Created: 2025-07-28
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests( auth ->
                auth
//                        .requestMatchers("").authenticated()
                        .requestMatchers("/api/users/**", "/api/job-posts/**", "/api/user/**").permitAll()
                        .anyRequest().authenticated()

        );

//                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));


               return http.build();
    }
}
