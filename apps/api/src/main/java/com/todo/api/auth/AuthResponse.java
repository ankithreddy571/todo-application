package com.todo.api.auth;

import java.util.UUID;

public record AuthResponse(UUID userId, String email, String token) {}
