package com.scandela.server.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

	@OneToMany(mappedBy = "town", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<Hood> hoods;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "lat", nullable = false)
	private Double latitude;

	@Column(name = "lng", nullable = false)
	private Double longitude;

	@Column(name = "electricityprice", nullable = false)
	private Integer electricityPrice;

	@Builder.Default
	@Column(name = "indiceelec", nullable = false)
	private Float indiceElectricity = 0.0f;

	@Builder.Default
	@Column(name = "indiceeco", nullable = false)
	private Float indiceEcology = 0.0f;

	@Builder.Default
	@Column(name = "indicequali", nullable = false)
	private Float indiceQuality = 0.0f;
	
}
