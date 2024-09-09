package com.scandela.server.entity;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
@Table(name = "weather")
public class Weather implements Serializable {//TODO remplacer la latitude et longitude par une liaison avec town (update la lat et lng de nantes car fausses)

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "lat", nullable = false)
	private Double latitude;

	@Column(name = "lng", nullable = false)
	private Double longitude;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "ts", nullable = false)
	private Long ts;

	@Column(name = "vis", nullable = false)
	private Integer vis;
	
}
