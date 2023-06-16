package com.scandela.server.entity;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "USER")
public class User implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID", updatable = false, nullable = false)
	private int id;
	
//	@OneToOne TODO enlever le commentaire quand la classe aura été implémentée
//	@JoinColumn(name = "id_town", nullable = false)
//	private Town town;
	
	@Column(name = "EMAIL", nullable = false)
	private String email;
	
	//rights
	
	@Column(name = "USERNAME", nullable = false)
	private String username;
	
	@Column(name = "PASSWORD", nullable = false)
	private String password;
	
	@Column(name = "LASTCONNEXION", nullable = false)
	private LocalDate lastConnexion;

}
