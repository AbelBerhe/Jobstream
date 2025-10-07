package com.jobstream.backend.config;

import com.jobstream.backend.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * Author: ABEL
 * Created: 2025-08-02
 */
@Configuration
public class SpringDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:3000";


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};

        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Address.class);
        config.exposeIdsFor(Experience.class);
        config.exposeIdsFor(Education.class);
        config.exposeIdsFor(JobPost.class);
        config.exposeIdsFor(Application.class);
        config.exposeIdsFor(Message.class);



        //disable HTTP methods for Spring Data REST
        disableHttpMethods(User.class, config , theUnsupportedActions);
        disableHttpMethods(Address.class, config , theUnsupportedActions);
        disableHttpMethods(Education.class, config , theUnsupportedActions);
        disableHttpMethods(JobPost.class, config , theUnsupportedActions);
        disableHttpMethods(Application.class, config , theUnsupportedActions);
        disableHttpMethods(Message.class, config , theUnsupportedActions);
        disableHttpMethods(Experience.class, config , theUnsupportedActions);





        /*Configure Cors Mappings*/
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);


    }

    private void disableHttpMethods(Class<?> anyClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions){

        config.getExposureConfiguration()
                .forDomainType(anyClass)
                .withItemExposure(((metadata, httpMethods) -> httpMethods
                        .disable(theUnsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));


    }


}
