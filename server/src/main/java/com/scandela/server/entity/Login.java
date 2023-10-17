package com.scandela.server.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
// @Table(name = "user")
public class Login implements Serializable {

    // @Column(name = "email", nullable = false)
	protected String email;

	// @Column(name = "password", nullable = false)
	protected String password;
}
