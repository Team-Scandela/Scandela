package com.scandela.server.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Town;
import com.scandela.server.entity.User;
import com.scandela.server.service.IUserService;
import com.scandela.server.util.AdminVilleAccess;

@RestController
@RequestMapping(value = "/adminville")
@CrossOrigin(origins = "*")
public class AdminVilleController {

    @Autowired
    IUserService userService;

    @PostMapping("/affectUser/{adminid}")
    public User affectUser(@PathVariable UUID adminid, @RequestBody User user) throws Exception {
    try {
        User adminUser = userService.get(adminid);
        if (adminUser.getAdminville()) {
            Town adminTown = adminUser.getTown();
            if (adminTown == null) {
                throw new Exception("Admin user does not have an associated town.");
            }

            User existingUser = userService.get(user.getId());
            if (existingUser == null) {
                throw new Exception("User not found.");
            }

            existingUser.setTown(adminTown);
            User updatedUser = userService.update(existingUser.getId(), existingUser);

            return updatedUser;
        } else {
            throw new Exception("No access permission.");
        }
    } catch (Exception e) {
        throw new Exception("Error affecting user: " + e.getMessage(), e);
    }
}

    @DeleteMapping("/deaffectUser/{adminid}")
    public void deaffectUser(@PathVariable UUID adminid, @RequestBody User user) throws Exception {
        try {

            User adminUser = userService.get(adminid);

            if (adminUser.getAdminville())
                userService.delete(user.getId());

        } catch (Exception e) {
            throw new Exception("Admin was not found");
        }
    }
}
