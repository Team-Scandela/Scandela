package com.scandela.server.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

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
@Table(name = "notification")
public class Notification implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = UUIDDeserializer.class)
	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;
	
	@ManyToOne
	@JoinColumn(name = "uuiduser", nullable = false)
	private User user;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "time")
	private LocalDateTime time;
}