package org.launchcode.PickNBuy.exception;

public class userNotFoundException extends RuntimeException{
    public userNotFoundException(int id){
        super("Could not found the User with id "+ id);
    }
}
