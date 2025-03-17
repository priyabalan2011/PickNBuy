package org.launchcode.PickNBuy.controllers;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.launchcode.PickNBuy.data.userModelRepository;
import org.launchcode.PickNBuy.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

//@Controller("/")
//@ResponseBody
@RestController
@CrossOrigin(origins ="*")
public class userController {

    //    public String Hello()
//    {
//        return "index";
//    }

    @Autowired
    userModelRepository userRepository;

    private static final String userSessionKey = "user";

    public userModel getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<userModel> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, userModel user) {
        session.setAttribute(userSessionKey, user.getId());
    }

//    @GetMapping("/register")
//    public ResponseEntity<RegisterFormDTO> displayRegistrationForm() {
//        RegisterFormDTO registerFormDTO = new RegisterFormDTO();
//        return ResponseEntity.ok(registerFormDTO);
//    }


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody userModel user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(user.getPassword());
        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody userModel user) {
        userModel existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        if (Objects.equals(user.getPassword(), existingUser.getPassword())) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("Logout successful");
    }

}
