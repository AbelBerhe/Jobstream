package com.jobstream.backend.dto.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jobstream.backend.entity.JobPost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@Data
@NoArgsConstructor
public class JobPostDTO {
    private UUID id;
    private String title;
    private String company;
    private String whatWeOffer;
    private String whatYouShouldKnow;
    private String qualifications;
    private String educationRequirement;
    private String location;
    private String jobType;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String timeAgo;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String formattedExpiryDate;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String postDate;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String expiryDate;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private boolean isActive;

    public JobPostDTO(JobPost post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.company = post.getCompany();
        this.location = post.getLocation();
        this.whatWeOffer = post.getWhatWeOffer();
        this.whatYouShouldKnow = post.getWhatYouShouldKnow();
        this.qualifications = post.getQualifications();
        this.educationRequirement = post.getEducationRequirement();
        this.timeAgo = calculateTimeAgo(post.getPostedDate());
        this.formattedExpiryDate = format(post.getExpiryDate());
        this.jobType = post.getJobType();
        this.isActive = post.getExpiryDate().isAfter(LocalDate.now());
    }

    // Calculate time ago
    private String calculateTimeAgo(LocalDateTime postDate) {
        Duration duration = Duration.between(postDate, LocalDateTime.now());

        long days = duration.toDays();
        if(days  == 0){
            long hours = duration.toHours();
            if(hours == 0) return "Just now";
            if(hours == 1) return "An hour ago";
            return hours + " hours Ago";
        }else  if(days >= 30){
            return days/30 == 1 ? "1 Month" : days/30 + " Months";
        }else if(days >= 7){
            return days/7 == 1 ? "1 Week" : days/7 + " Weeks";
        }else  return days == 1 ? "1 day ago" : days + " days ago";
    }


    // Format date
    private String format(LocalDate jobPostExpiryDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
      return jobPostExpiryDate.format(formatter);
    }

}
