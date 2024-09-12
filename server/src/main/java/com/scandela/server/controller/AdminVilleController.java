package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Subscription;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDTO;
import com.scandela.server.service.IUserService;
import com.scandela.server.util.AdminVilleAccess;

@RestController
@RequestMapping(value = "/adminville")
@CrossOrigin(origins = "*")
public class AdminVilleController {

    @Autowired
    private IUserService userService;

    private UserDao userdao;

    @GetMapping
    public List<User> getTownAdmins() {
        return userService.getAllForAdminVille();
    }

    @PostMapping("/affectUser/{adminid}/{userid}")
    public ResponseEntity<?> affectUser(@PathVariable UUID adminid, @PathVariable UUID userid) {
        try {
            User adminUser = userService.get(adminid);
            if (!adminUser.getAdminville()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No access permission.");
            }

            Town adminTown = adminUser.getTown();
            if (adminTown == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                    .body("Admin user does not have an associated town.");
            }

            User existingUser = userService.get(userid);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            if (existingUser.getTown() != null && existingUser.getTown().equals(adminTown)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already belongs to admin's town.");
            }

            UserDTO updatedUser = userService.updateUserTown(userid, adminTown.getId());

            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error affecting user: " + e.getMessage());
        }
    }

    @DeleteMapping("/deaffectUser/{adminid}/{userid}")
    public ResponseEntity<?> deaffectUser(@PathVariable UUID adminid, @PathVariable UUID userid) throws Exception {
        try {
            User adminUser = userService.get(adminid);
            if (!adminUser.getAdminville()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No access permission.");
            }

            User existingUser = userService.get(userid);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            if (!adminUser.getTown().equals(existingUser.getTown())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already belongs to admin's town.");
            }

            UserDTO updatedUser = userService.updateUserTown(userid, null);  // Passing null to remove town association

            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error deaffecting user: " + e.getMessage());
        }
    }
}
