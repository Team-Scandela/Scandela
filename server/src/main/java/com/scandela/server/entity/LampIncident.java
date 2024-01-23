package com.scandela.server.entity;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

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
@Table(name = "lampincident")
public class LampIncident implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;

//	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)TODO check si on veut savoir si il y a un incident a prendre quand on clique sur le lampdaire
	@ManyToOne
	@JoinColumn(name = "uuidlamp", nullable = false)
	private Lamp lamp;

	@ManyToOne
	@JoinColumn(name = "uuidincident", nullable = false)
	private Incident incident;
	
}
