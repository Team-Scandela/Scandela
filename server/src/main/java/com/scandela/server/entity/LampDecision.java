package com.scandela.server.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "lampdecision")
public class LampDecision implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

//	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)TODO quand ce sera implémenté
//	@ManyToOne
//	@JoinColumn(name = "id_lamp", nullable = false)
//	private Lamp lamp;

	@ManyToOne
	@JoinColumn(name = "id_decision", nullable = false)
	private Decision decision;
	
}
