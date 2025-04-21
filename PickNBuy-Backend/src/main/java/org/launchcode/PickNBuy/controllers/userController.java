package org.launchcode.PickNBuy.controllers;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.launchcode.PickNBuy.data.userModelRepository;
import org.launchcode.PickNBuy.exception.userNotFoundException;
import org.launchcode.PickNBuy.models.ChangePasswordRequest;
import org.launchcode.PickNBuy.models.LoginResponseDTO;
import org.launchcode.PickNBuy.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

//@Controller("/")
//@ResponseBody
@RestController
@RequestMapping("/user")
@CrossOrigin(origins ="*")
public class userController {



    @Autowired
    userModelRepository userRepository;

    @Value("${upload.path}")
    private String uploadPath;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

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


//    @PostMapping("/register")
//    public ResponseEntity<LoginResponseDTO> registerUser(@RequestBody userModel user) {
//        if (user.getEmail() == null || user.getName() == null || user.getPassword()==null) {
//            return ResponseEntity.ok(new LoginResponseDTO(null, "Invalid name or email or password"));
//        }
//        if (userRepository.findByEmail(user.getEmail()) != null) {
//           // return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
//            return ResponseEntity.ok(new LoginResponseDTO(null, "Email already exists"));
//        }
//
//       // user.setPassword(user.getPassword());
//        user.setPassword(encoder.encode(user.getPassword()));
//        userRepository.save(user);
//       // return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
//        return ResponseEntity.ok(new LoginResponseDTO(user, null));
//    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> registerUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "avatar", required = false) MultipartFile avatarFile) {

        try {

            if (email == null || name == null || password ==null) {
            return ResponseEntity.ok(new LoginResponseDTO(null, "Invalid name or email or password"));
        }
        if (userRepository.findByEmail(email) != null) {
           // return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
            return ResponseEntity.ok(new LoginResponseDTO(null, "Email already exists"));
        }
            userModel user = new userModel();
            if (avatarFile != null && !avatarFile.isEmpty()) {

                // Save file
                String fileName = UUID.randomUUID() + "_" + avatarFile.getOriginalFilename();
                Path uploadDir = Paths.get(uploadPath);
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(fileName);
                Files.copy(avatarFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                user.setAvator("/uploads/" + fileName); // stored path
            }
            // Save user with avatar path

            user.setName(name);
            user.setPassword(encoder.encode(password));
            user.setEmail(email);


            userRepository.save(user);

          //  return ResponseEntity.ok("User registered successfully!");
            return ResponseEntity.ok(new LoginResponseDTO(user, null));

        } catch (IOException e) {
           // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
            return ResponseEntity.ok(new LoginResponseDTO(null, "Failed to upload image"));
        }
    }


    @PutMapping("/update")
    public ResponseEntity<LoginResponseDTO> updateUser(
            @RequestParam("id") int id,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam(value = "avatar", required = false) MultipartFile avatarFile) {

        try {
            // Find user by ID
            Optional<userModel> optionalUser = userRepository.findById(id);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.ok(new LoginResponseDTO(null, "User not found"));
            }

            userModel user = optionalUser.get();

            // Check if email is changing and already taken
            if (!user.getEmail().equals(email) && userRepository.findByEmail(email) != null) {
                return ResponseEntity.ok(new LoginResponseDTO(null, "Email already exists"));
            }

            // Update avatar if provided
            if (avatarFile != null && !avatarFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + avatarFile.getOriginalFilename();
                Path uploadDir = Paths.get(uploadPath);
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(fileName);
                Files.copy(avatarFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                user.setAvator("/uploads/" + fileName);
            }

            // Update user details
            user.setName(name);
            user.setEmail(email);
           // user.setPassword(encoder.encode(password)); // Optional: only if password is being reset

            userRepository.save(user);

            return ResponseEntity.ok(new LoginResponseDTO(user, null));

        } catch (IOException e) {
            return ResponseEntity.ok(new LoginResponseDTO(null, "Failed to upload image"));
        }
    }



    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody userModel user) {
        userModel existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return ResponseEntity.ok(new LoginResponseDTO(null, "Invalid email or password"));
        }

        if (encoder.matches(user.getPassword(), existingUser.getPassword())) {
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

//    @GetMapping("/{id}")
//    public userModel getUserById(@PathVariable int id) {
//        return userRepository.findById(id).orElseThrow(() -> new userNotFoundException(id));
//
//    }

    @GetMapping("/{id}")
    public ResponseEntity<LoginResponseDTO> getUserById(@PathVariable int id) {
        Optional<userModel> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            return ResponseEntity.ok(new LoginResponseDTO(optionalUser.get(), null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponseDTO(null, "User not found with ID: " + id));
        }

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


    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam("id") int id,
            @RequestParam("oldPassword")String oldPassword,
            @RequestParam("password") String newPassword) {

        Optional<userModel> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        userModel user = optionalUser.get();

        // Verify old password matches
        if (!encoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }


        // Update password
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("Password changed successfully");
    }

}
