package com.scandela.server.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
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
<<<<<<< HEAD:server/src/main/java/com/scandela/server/entity/Notification.java
	
	@ManyToOne
	@JoinColumn(name = "uuiduser", nullable = false)
	private User user;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "time")
	private LocalDateTime time;
=======

    @Column(name = "userid", nullable = false)
    private UUID userid;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    @Column(name = "data")
    private List<String> data;
>>>>>>> master:server/src/main/java/com/scandela/server/entity/AuditEntry.java
}
