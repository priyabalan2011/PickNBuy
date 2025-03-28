package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.data.userModelRepository;
import org.launchcode.PickNBuy.models.EmailService;
import org.launchcode.PickNBuy.models.userModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class ForgotPasswordController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private userModelRepository userRepository;

//    @GetMapping("/")
//    public String sample()
//    {
//        return "getmapping";
//    }
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {
        userModel user = userRepository.findByEmail(email);
        if (user == null) {
            return "User not found!";
        }

        String resetToken = UUID.randomUUID().toString();
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordTokenExpire(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        emailService.sendForgotPasswordEmail(email, resetToken);
        return "Password reset email sent!";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        userModel user = userRepository.findByResetPasswordToken(token);
        if (user == null) {
            return "Invalid token!";
        }
        if (user.getResetPasswordTokenExpire().isBefore(LocalDateTime.now())) {
            return "Token has expired!";
        }
        user.setPassword(newPassword); // Ensure password is hashed before saving
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpire(null);
        userRepository.save(user);

        return "Password has been reset successfully!";
    }

}
