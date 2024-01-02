package com.scandela.server.entity;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonProperty;

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
	@JoinColumn(name = "uuidbulb", nullable = false)
	private Bulb bulb;
	
	//TODO Cabinet plus tard
	
	//TODO jsp ce que c'est
//	@Column(name = "uuidlampshade", nullable = true)
//	private Integer uuidlampshade;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@ManyToOne
	@JoinColumn(name = "uuidtown", nullable = false)
	private Town town;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@ManyToOne
	@JoinColumn(name = "uuidstreet", nullable = false)
	private Street street;

	@Column(name = "lat", nullable = false)
	private Double latitude;

	@Column(name = "lng", nullable = false)
	private Double longitude;
	
	@Column(name = "lighton", nullable = false)
	private LocalTime lightOn;

	@Column(name = "lightoff", nullable = false)
	private LocalTime lightOff;

	@Column(name = "height", nullable = false)
	private Double height;

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "moreinfo", nullable = true)
	private String moreInformations;

    @Column(name = "recommandedOptimisations", nullable = true)
	private List<String> recommandedOptimisations;

	@Column(name = "lamptype", nullable = false)
	private String lamptype;

	@Column(name = "foyertype", nullable = false)
	private String foyertype;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "lamp", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<LampDecision> lampDecisions;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "lamp", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private List<LampIncident> lampIncidents;
	
}
