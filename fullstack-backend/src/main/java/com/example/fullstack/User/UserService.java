package com.example.fullstack.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User save(User user){
        return userRepository.save(user);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id){return userRepository.findById(id);}

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByName(String name){
        return userRepository.findByName(name);
    }

    public boolean existsById(Long id){
        return userRepository.existsById(id);
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public void deleteByUsername(String username){
        userRepository.deleteByUsername(username);
    }

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }
}