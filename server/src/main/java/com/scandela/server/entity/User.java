package com.scandela.server.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "USER")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID", updatable = false, nullable = false)
	private int id;
	
//	@OneToOne TODO enlever le commentaire quand la classe aura été implémentée
//	@JoinColumn(name = "id_town", nullable = false)
//	private Town town;
	
	@Column(name = "EMAIL", nullable = false)
	private String email;
	
	//right
	
	@Column(name = "USERNAME", nullable = false)
	private String username;
	
	@Column(name = "PASSWORD", nullable = false)
	private String password;
	
	@Column(name = "LASTCONNEXION", nullable = false)
	private LocalDate lastConnexion;

}
