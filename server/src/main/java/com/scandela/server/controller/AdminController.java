package com.scandela.server.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.User;
import com.scandela.server.service.IUserService;
import com.scandela.server.service.implementation.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final IUserService userService;

    public AdminController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
	public List<User> getUsers() {
		return userService.getAll();
	}

    @GetMapping("/testing")
    public String testingAdminRout() {
        return "finally working ";
    }

    @PutMapping("/users/{userId}/role")
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User setUserRoleAdmin(@PathVariable UUID userId, @RequestBody User body) throws AccessDeniedException {
            return userService.setUserRole(userId, body.getRole());
    }
}
