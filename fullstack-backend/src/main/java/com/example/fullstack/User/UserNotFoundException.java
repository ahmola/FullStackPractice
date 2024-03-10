package com.example.fullstack.User;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String username){
        super("There is no such user " + username);
    }
}
