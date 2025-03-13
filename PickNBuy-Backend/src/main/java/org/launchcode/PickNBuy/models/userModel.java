package org.launchcode.PickNBuy.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class userModel extends AbstractEntity{

    @NotNull
    private String name;

    @Email
    @NotNull
    @Column(unique=true)
    private String email;

    @Size(min=6, message="Password must be at least 6 characters long")
    private String password;

    private String avator;

    @Column(columnDefinition = "varchar(255) default 'user'")
    private String role;

    private String resetPasswordToken;

    private Date resetPasswordTokenExpire;

    //@Column(name="createdAt",columnDefinition = "DATE DEFAULT CURRENT_DATE")
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @OneToMany
    @JoinColumn(name="order_id")
    private List<Orders> order=new ArrayList<>();


    public userModel() {
    }
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public userModel(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = encoder.encode(password);
    }
    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, password);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvator() {
        return avator;
    }

    public void setAvator(String avator) {
        this.avator = avator;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
