package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.data.userModelRepository;
import org.launchcode.PickNBuy.models.EmailService;
import org.launchcode.PickNBuy.models.LoginResponseDTO;
import org.launchcode.PickNBuy.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class ForgotPasswordController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private userModelRepository userRepository;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

//    @GetMapping("/")
//    public String sample()
//    {
//        return "getmapping";
//    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        userModel user = userRepository.findByEmail(email);
        if (user == null) {
           // return "User not found!";
           return ResponseEntity.badRequest().body("User not found");
        }

        String resetToken = UUID.randomUUID().toString();
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordTokenExpire(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        emailService.sendForgotPasswordEmail(email, resetToken);
        return ResponseEntity.ok( "Password reset email sent!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<LoginResponseDTO> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        userModel user = userRepository.findByResetPasswordToken(token);
        if (user == null) {
            // return "Invalid token!";
            return ResponseEntity.badRequest().body(new LoginResponseDTO(null, "Invalid token!"));
        }
        if (user.getResetPasswordTokenExpire().isBefore(LocalDateTime.now())) {
            // return "Token has expired!";
            return ResponseEntity.badRequest().body(new LoginResponseDTO(null, "Token has expired!"));
        }
        user.setPassword(encoder.encode(newPassword)); // Ensure password is hashed before saving
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpire(null);
        userRepository.save(user);

        //return "Password has been reset successfully!";
        return ResponseEntity.ok(new LoginResponseDTO(user, null));
    }

//    @PostMapping("/reset-password")
//    public String resetPassword(@RequestParam String token, @RequestParam String newPassword) {
//        userModel user = userRepository.findByResetPasswordToken(token);
//        if (user == null) {
//            return "Invalid token!";
//        }
//        if (user.getResetPasswordTokenExpire().isBefore(LocalDateTime.now())) {
//            return "Token has expired!";
//        }
//        user.setPassword(newPassword); // Ensure password is hashed before saving
//        user.setResetPasswordToken(null);
//        user.setResetPasswordTokenExpire(null);
//        userRepository.save(user);
//
//        return "Password has been reset successfully!";
//    }

}
