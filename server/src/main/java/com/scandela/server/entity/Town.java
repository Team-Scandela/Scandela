package com.scandela.server.entity;

import java.io.Serializable;

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
@Table(name = "town")
public class Town implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Integer id;

	@Column(name = "name", nullable = false)
	private String name;
	
	//TODO voir ce qu'est Iat et Ing

	@Column(name = "electricityprice", nullable = false)
	private Integer electricityPrice;

	@Builder.Default
	@Column(name = "indiceelec", nullable = false)
	private float indiceElectricity = 0.0f;

	@Builder.Default
	@Column(name = "indiceeco", nullable = false)
	private float indiceEcology = 0.0f;

	@Builder.Default
	@Column(name = "indicequali", nullable = false)
	private float indiceQuality = 0.0f;
	
}
