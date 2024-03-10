package com.example.fullstack.User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class UserApiController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUser(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByUsername(@PathVariable(name = "id") Long id){
        return new ResponseEntity<>(
                userService.findById(id).orElseThrow(
                        () -> new UserNotFoundException(id.toString())), HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<User> getUserByName(@RequestParam String name){
        return new ResponseEntity<>(
                userService.findByName(name).orElseThrow(
                        () -> new UserNotFoundException(name)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> newUser(@RequestBody UserDTO userDTO){
        return new ResponseEntity<>(userService.save(new User(userDTO)), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserById(@RequestBody UserDTO userDTO,
                                               @PathVariable(name = "id") Long id){
        return new ResponseEntity<>(userService.findById(id).map(user -> {
            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());
            user.setUsername(userDTO.getUsername());
            return userService.save(user);
        }).orElseThrow(() -> new UserNotFoundException(userDTO.getUsername())), HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<User> updateUser(@RequestBody UserDTO userDTO,
                                           @RequestParam String username){
        return new ResponseEntity<>(userService.findByUsername(username).map(user -> {
            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());
            user.setUsername(userDTO.getUsername());
            return userService.save(user);
        }).orElseThrow(() -> new UserNotFoundException(username)), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUserById(@PathVariable(name = "id") Long id){
        if(!userService.existsById(id)){
            throw new UserNotFoundException("id");
        }

        userService.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<Boolean> deleteUser(@RequestParam String username){
        if(!userService.existsByUsername(username)){
            throw new UserNotFoundException(username);
        }
        userService.deleteByUsername(username);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
