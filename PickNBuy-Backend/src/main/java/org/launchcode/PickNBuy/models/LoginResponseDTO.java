package org.launchcode.PickNBuy.models;

public class LoginResponseDTO {
    private userModel user;
    private String error;

    public LoginResponseDTO(userModel user, String error) {
        this.user = user;
        this.error = error;
    }

    public userModel getUser() {
        return user;
    }

    public void setUser(userModel user) {
        this.user = user;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
