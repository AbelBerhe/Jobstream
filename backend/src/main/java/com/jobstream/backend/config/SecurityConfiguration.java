package com.jobstream.backend.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

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

                        .requestMatchers("/api/users/**", "/api/job-posts/**", "/api/user/**", "/api/messages/**", "/api/application/**").permitAll()
                        .requestMatchers(", /api/jobPosts/**").denyAll()
                        .anyRequest().authenticated()

        )
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));

        //Add Cors filters
        http.cors(Customizer.withDefaults());

        //Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        //Force a non-empty response body for 401's to make the response friendly
        Okta.configureResourceServer401ResponseBody(http);


               return http.build();
    }


}
