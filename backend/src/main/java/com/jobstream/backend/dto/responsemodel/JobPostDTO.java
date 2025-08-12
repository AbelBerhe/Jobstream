package com.jobstream.backend.dto.responsemodel;

import com.jobstream.backend.entity.JobPost;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.UUID;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

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
    private String timeAgo;
    private String formattedExpiryDate;
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
        this.formattedExpiryDate = formatDate(post.getExpiryDate());
        this.jobType = post.getJobType();
        this.isActive = post.getExpiryDate().isAfter(LocalDateTime.now());
    }

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

    public String formatDate(LocalDateTime localDateTime){
        LocalDate date = localDateTime.toLocalDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy");
        return formatter.format(date);
    }


}
