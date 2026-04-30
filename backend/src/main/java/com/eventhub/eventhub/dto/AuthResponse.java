package com.eventhub.eventhub.dto;

public class AuthResponse {
    public Long id;
    public String name;
    public String email;
    public String message;

    public AuthResponse(Long id, String name, String email, String message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
    }
}