package com.scandela.server.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, UUID> {
	public Optional<User> findByEmail(String email);
	public Optional<User> findByUsername(String username);
	public List<User> findByNewsletter(boolean newsletter);
}
