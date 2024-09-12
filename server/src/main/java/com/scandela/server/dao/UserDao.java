package com.scandela.server.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, UUID> {
	public Optional<User> findByEmail(String email);
	public Optional<User> findByUsername(String username);
	public List<User> findByNewsletter(boolean newsletter);

    @Query("SELECT u FROM User u WHERE u.adminville = true")
    public List<User> findByAdminville(boolean adminville);


	@Query("SELECT u.town.id FROM User u WHERE u.id = :userId")
    UUID findTownIdByUserId(@Param("userId") UUID userId);

	@Modifying
    @Transactional
    @Query("UPDATE User u SET u.town = NULL WHERE u.id = :userId AND u.town.id = :townId")
    int removeUserFromTown(@Param("userId") UUID userId, @Param("townId") UUID townId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.town.id = :townId WHERE u.id = :userId")
    int addUserToTown(@Param("userId") UUID userId, @Param("townId") UUID townId);
}
