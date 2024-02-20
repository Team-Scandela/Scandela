package com.scandela.server.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, UUID> {
	Optional<User> findByEmail(String email);
}
