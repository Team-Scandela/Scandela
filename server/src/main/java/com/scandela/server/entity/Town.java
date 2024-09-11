package com.scandela.server.entity;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
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

	public Town(UUID id) {
        this.id = id;
    }

	@JsonDeserialize(using = UUIDDeserializer.class)
	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "town", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<User> users;

	@OneToMany(mappedBy = "town", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<Hood> hoods;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "lat", nullable = false)
	private Double latitude;

	@Column(name = "lng", nullable = false)
	private Double longitude;

	@Column(name = "electricityprice", nullable = false)
	private Float electricityPrice;

	@Builder.Default
	@Column(name = "eleclevel", nullable = false)
	private Float indiceElectricity = 0.0f;

	@Builder.Default
	@Column(name = "ecolevel", nullable = false)
	private Float indiceEcology = 0.0f;

	@Builder.Default
	@Column(name = "qualilevel", nullable = false)
	private Float indiceQuality = 0.0f;

	@OneToMany(mappedBy = "town", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<Incident> incidents;

	@OneToMany(mappedBy = "town", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<Lamp> lamps;
}
