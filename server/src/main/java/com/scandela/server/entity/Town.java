package com.scandela.server.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	private Long id;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToOne(mappedBy = "town", cascade = CascadeType.REMOVE)
	private User user;

	@OneToMany(mappedBy = "town", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<Hood> hoods;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "lat", nullable = false)
	private Double latitude;

	@Column(name = "lng", nullable = false)
	private Double longitude;

	@Column(name = "electricity_price", nullable = false)
	private Integer electricityPrice;

	@Builder.Default
	@Column(name = "indice_elec", nullable = false)
	private Float indiceElectricity = 0.0f;

	@Builder.Default
	@Column(name = "indice_eco", nullable = false)
	private Float indiceEcology = 0.0f;

	@Builder.Default
	@Column(name = "indice_quali", nullable = false)
	private Float indiceQuality = 0.0f;

	@OneToMany(mappedBy = "town", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<Incident> incidents;
}
