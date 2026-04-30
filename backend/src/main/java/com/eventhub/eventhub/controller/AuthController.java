package com.eventhub.eventhub.controller;

import com.eventhub.eventhub.dto.AuthResponse;
import com.eventhub.eventhub.dto.LoginRequest;
import com.eventhub.eventhub.dto.SignupRequest;
import com.eventhub.eventhub.model.User;
import com.eventhub.eventhub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        if (userRepository.existsByEmail(request.email)) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.password);

        User user = new User(
                request.name,
                request.email,
                hashedPassword
        );

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(
                new AuthResponse(
                        savedUser.getId(),
                        savedUser.getName(),
                        savedUser.getEmail(),
                        "Signup successful"
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.password, user.getPasswordHash())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        return ResponseEntity.ok(
                new AuthResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        "Login successful"
                )
        );
    }
}