package com.eventhub.eventhub.controller;

import com.eventhub.eventhub.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Connects React to Spring
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        
        // MOCK LOGIC: In a real app, you'd check the database here
        if ("test@eventhub.com".equals(user.getEmail()) && "password".equals(user.getPassword())) {
            response.put("status", "success");
            response.put("message", "Welcome back!");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
        }
        return response;
    }
}
