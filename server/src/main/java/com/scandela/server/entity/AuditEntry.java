package com.scandela.server.entity;

import java.io.Serializable;
import java.security.Timestamp;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

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
@Table(name = "auditentry")
public class AuditEntry implements Serializable {

    @JsonDeserialize(using = UUIDDeserializer.class)
	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;

    @Column(name = "userId", nullable = false, unique = true)
    private Long userId;

    @Column(name = "action", nullable = false, unique = true)
    private String action;

    @Column(name = "timestamp", nullable = false, unique = true)
    private Timestamp timestamp;

    @Column(name = "data", unique = true)
    private Timestamp data;
}
