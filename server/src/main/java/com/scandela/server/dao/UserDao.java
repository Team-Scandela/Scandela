package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
}
