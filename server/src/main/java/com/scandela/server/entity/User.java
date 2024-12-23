package com.scandela.server.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
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
@Table(name = "user")
public class User implements Serializable {

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
	@JoinColumn(name = "uuidtown")
	private Town town;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "username", nullable = false, unique = true)
	private String username;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "rights", nullable = true)
	private Integer rights;

	@Column(name = "role", nullable = true)
	private String role;

	// @JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "moreinformations", nullable = true)
	private List<String> moreInformations;

	@Builder.Default
	@Column(name = "darkmode")
	private boolean darkmode = true;

	@Column(name = "lastconnexion")
	private LocalDateTime lastConnexion;

	@Builder.Default
	@Column(name = "newsletter")
	private boolean newsletter = false;

	@Column(name = "prefnotifenabled")
	private Boolean prefnotifenabled;

	@Column(name = "frenchlanguage")
	private Boolean frenchlanguage;

	@Builder.Default
	@Column(name = "adminville")
	private Boolean adminville = false;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Notification> notifications;
	@Builder.Default
	@Column(name = "premium")
	private boolean premium = false;
}
