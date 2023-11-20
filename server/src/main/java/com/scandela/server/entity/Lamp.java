package com.scandela.server.entity;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
@Table(name = "decision")
public class Lamp implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;

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
	private List<String> moreInformations;
	
}
