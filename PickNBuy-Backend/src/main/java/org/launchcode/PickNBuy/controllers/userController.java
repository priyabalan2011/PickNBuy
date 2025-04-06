package org.launchcode.PickNBuy.controllers;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.launchcode.PickNBuy.data.userModelRepository;
import org.launchcode.PickNBuy.exception.userNotFoundException;
import org.launchcode.PickNBuy.models.LoginResponseDTO;
import org.launchcode.PickNBuy.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

//@Controller("/")
//@ResponseBody
@RestController
@RequestMapping("/user")
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
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody userModel user) {
        userModel existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return ResponseEntity.ok(new LoginResponseDTO(null, "Invalid email or password"));
        }

        if (Objects.equals(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok(new LoginResponseDTO(existingUser, null));
        } else {
            return ResponseEntity.ok(new LoginResponseDTO(null, "Invalid email or password"));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("Logout successful");
    }


    @GetMapping("/Allusers")
    List<userModel> getAllusers()
    {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public userModel getUserById(@PathVariable int id) {
        return userRepository.findById(id).orElseThrow(() -> new userNotFoundException(id));

    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id){
        if(!userRepository.existsById(id)){
            throw new userNotFoundException(id);
        }
        userRepository.deleteById(id);
        return  "Cloth with id "+id+" has been deleted success.";
    }

    @PutMapping("/{id}")
    public userModel updateUser(@RequestBody userModel user, @PathVariable int id) {
        return userRepository.findById(id)
                .map(user1 -> {
                    user1.setName(user.getName());
                    user1.setEmail(user.getEmail());
                    user1.setPassword(user.getPassword());
                    user1.setAvator(user.getAvator());
                    user1.setRole(user.getRole());
                    return userRepository.save(user1);
                }).orElseThrow(() -> new userNotFoundException(id));
    }

}
