package com.jobstream.backend.service;

import com.jobstream.backend.controller.UserController;
import com.jobstream.backend.dao.UserRepository;
import com.jobstream.backend.dto.common.AddressDto;
import com.jobstream.backend.dto.response.UserWithAddressDto;
import com.jobstream.backend.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@Service
@Transactional
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
      return userRepository.findAll();
    }

    // Save user if not exist
    public void saveUser(Map<String, Object> claims) {
      String email = (String) claims.get("sub");
      String firstName = (String) claims.get("firstName");
      String lastName = (String) claims.get("lastName");

      Optional<User> userOpt = userRepository.findUserByUserEmail(email);
      if(userOpt.isEmpty()
                && email != null && !email.isEmpty()
                && firstName != null && !firstName.isEmpty()
                && lastName != null && !lastName.isEmpty()){

          User user = new User();
          user.setUserEmail(email);
          user.setFirstName(firstName);
          user.setLastName(lastName);
          userRepository.save(user);
      }else{
          logger.info("User already exist.");
      }

    }


    // Get user with address by email
    public UserWithAddressDto getUserByEmail(String email){
        User user = userRepository.findUserByUserEmail(email).orElseThrow(()-> new RuntimeException("user not exist!"));
        AddressDto addressDto = mapToAddressDto(user);
        UserWithAddressDto userWithAddressDto = new UserWithAddressDto();
        userWithAddressDto.setFirstName(user.getFirstName());
        userWithAddressDto.setLastName(user.getLastName());
        userWithAddressDto.setEmail(user.getUserEmail());
        userWithAddressDto.setAddressInfo(addressDto);

        return userWithAddressDto;
    }

    // Map User entity to AddressDto
    private AddressDto mapToAddressDto(User user){
        AddressDto addressDto = new AddressDto();
        addressDto.setStreet(user.getAddress().getStreet());
        addressDto.setCity(user.getAddress().getCity());
        addressDto.setCountry(user.getAddress().getCountry());
        addressDto.setProvinceOrState(user.getAddress().getProvinceOrState());
        addressDto.setPostalCode(user.getAddress().getPostalCode());
        return addressDto;
    }

}
