package com.scandela.server.entity;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "lamp")
public class Lamp implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = UUIDDeserializer.class)
	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;
	
	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "address", nullable = false)
	private String address;

	@ManyToOne
	@JoinColumn(name = "uuidbulb")
	private Bulb bulb;

	@Column(name = "bulblifetime")
	private Integer bulbLifetime;
	
	@ManyToOne
	@JoinColumn(name = "uuidcabinet")
	private Cabinet cabinet;
	
	@ManyToOne
	@JoinColumn(name = "uuidlampshade")
	private LampShade lampShade;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@ManyToOne
	@JoinColumn(name = "uuidtown")
	private Town town;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@ManyToOne
	@JoinColumn(name = "uuidstreet")
	private Street street;

	@Column(name = "lat")
	private Double latitude;

	@Column(name = "lng")
	private Double longitude;
	//TODO changer les 2 lighton et lightoff pour stocker une liste plutot
	@Column(name = "lighton")
	private LocalTime lightOn;

	@Column(name = "lightoff")
	private LocalTime lightOff;
	
	@Column(name = "lighton2")
	private LocalTime lightOn2;

	@Column(name = "lightoff2")
	private LocalTime lightOff2;

	@Column(name = "height")
	private Double height;

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "moreinfo", nullable = true)
	private String moreInformations;

    @Column(name = "recommandedOptimisations", nullable = true)
	private List<String> recommandedOptimisations;

	@Column(name = "lamptype")
	private String lampType;

	@Column(name = "foyertype")
	private String foyerType;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "lamp", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<LampDecision> lampDecisions;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "lamp", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<LampIncident> lampIncidents;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "lamp", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<LampReparation> lampReparations;
	
}
