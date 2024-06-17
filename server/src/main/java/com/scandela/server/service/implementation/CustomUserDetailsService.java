package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserDao userDao;

    @Value("${logs.username}")
    private String username;

    @Value("${logs.pwd}")
    private String password;

    @Value("${logs.admin.username}")
    private String adminusername;

    @Value("${logs.admin.pwd}")
    private String adminpassword;

    public CustomUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String currUsername) throws UsernameNotFoundException {

        System.out.println("Username passé => " + currUsername);
        Optional<User> optUser = ((UserDao) userDao).findByUsername(currUsername);

        if (optUser.isEmpty() || currUsername.equals(adminusername)) {
            if (currUsername.equals(username)) {
                List<GrantedAuthority> authorities = new ArrayList<>();

                authorities.add(new SimpleGrantedAuthority("USER"));

                return new org.springframework.security.core.userdetails.User(
                username,
                new BCryptPasswordEncoder().encode(password),
                authorities
            );
            }
            if (currUsername.equals(adminusername)) {
                List<GrantedAuthority> authorities = new ArrayList<>();

                authorities.add(new SimpleGrantedAuthority("USER"));
                authorities.add(new SimpleGrantedAuthority("ADMIN"));

                return new org.springframework.security.core.userdetails.User(
                adminusername,
                new BCryptPasswordEncoder().encode(adminpassword),
                authorities
            );
            }
        } else {
            List<GrantedAuthority> authorities = new ArrayList<>();

            System.out.println("Username trouvé ===> " + optUser.get().getUsername());

            authorities.add(new SimpleGrantedAuthority("USER"));
            authorities.add(new SimpleGrantedAuthority("ADMIN"));

            return new org.springframework.security.core.userdetails.User(
                username,
                new BCryptPasswordEncoder().encode(password),
                authorities
            );
        }
        System.out.println("Erreur ---> ça throw");
        throw( new UsernameNotFoundException("User not found"));
    }
}
