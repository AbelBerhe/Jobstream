package com.jobstream.backend.dto.responsemodel;

import com.jobstream.backend.entity.JobPost;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
public class JobPostDTO {
    private UUID id;
    private String title;
    private String company;
    private String location;
    private String timeAgo; // e.g. "3 days ago"

    public JobPostDTO(JobPost post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.company = post.getCompany();
        this.location = post.getLocation();
        this.timeAgo = calculateTimeAgo(post.getPostedDate());
    }

    private String calculateTimeAgo(LocalDateTime postDate) {
        Duration duration = Duration.between(postDate, LocalDateTime.now());
        long days = duration.toDays();
        if (days == 0) {
            long hours = duration.toHours();
            if (hours == 0) return "Just now";
            if (hours == 1) return "An hour ago";
            return hours + " hours ago";
        } else if (days == 1) {
            return "Yesterday";
        } else if (days < 7) {
            return days + " days ago";
        } else if (days < 30) {
            return (days / 7) + " weeks ago";
        } else {
            return (days / 30) + " months ago";
        }
    }
}
