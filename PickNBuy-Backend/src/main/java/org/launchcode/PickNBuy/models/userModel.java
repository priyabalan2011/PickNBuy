package org.launchcode.PickNBuy.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Date;
import java.util.Objects;

@Entity
public class userModel {


    @Id
    @GeneratedValue
    private int id;

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
    @CreatedDate
    private Date createdAt;

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

    public  int getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        userModel entity = (userModel) o;
        return id == entity.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
