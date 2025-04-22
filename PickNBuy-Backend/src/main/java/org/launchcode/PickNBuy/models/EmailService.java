package org.launchcode.PickNBuy.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendForgotPasswordEmail(String to, String resetToken) {
        String resetLink = "http://localhost:3000/password/reset/" + resetToken;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset Your Password");
        message.setText("Click the link below to reset your password:\n" + resetLink);

        mailSender.send(message);
    }
}
