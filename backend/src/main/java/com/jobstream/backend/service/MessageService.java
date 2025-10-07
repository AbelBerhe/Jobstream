package com.jobstream.backend.service;

import com.jobstream.backend.dao.MessageRepository;
import com.jobstream.backend.dao.UserRepository;
import com.jobstream.backend.dto.request.AdminMessageRequest;
import com.jobstream.backend.dto.request.MessageRequestDto;
import com.jobstream.backend.entity.Message;
import com.jobstream.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

/**
 * Author: ABEL
 * Created: 2025-09-08
 */
@Service
public class MessageService {

    private MessageRepository messageRepository;
    private UserRepository  userRepository;
    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }


 // Save a new message associated with a user identified by email
    public void saveMessage(String email, MessageRequestDto messageRequest){
        Optional<User> user = userRepository.findUserByUserEmail(email);
        if (user.isPresent()) {
            Message message = new Message();
            message.setTopic(messageRequest.getTopic());
            message.setQuestion(messageRequest.getQuestion());
            message.setApplicant(user.get());
            messageRepository.save(message);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    // Save admin response to a message identified by messageId
    public void saveAminResponse(String adminEmail, AdminMessageRequest adminMessageRequest, String messageId){
        User user = userRepository.findUserByUserEmail(adminEmail).orElseThrow(() -> new RuntimeException("user not found!"));
        Message message = messageRepository.findById(UUID.fromString(messageId)).orElseThrow(()-> new RuntimeException("user not found"));

        message.setResponse(adminMessageRequest.getResponse());
        message.setClosed(true);
        message.setAdmin(user);
        messageRepository.save(message);
    }

}
