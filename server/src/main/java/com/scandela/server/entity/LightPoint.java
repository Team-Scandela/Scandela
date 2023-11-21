package com.scandela.server.entity;

import java.io.Serializable;
import java.util.List;
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
@Table(name = "lmp")//TODO fusionner les deux parce que pb
public class LightPoint implements Serializable {

    @Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID uuid;

    @Column(name = "recommandedOptimisations", nullable = true)
	private List<String> recommandedOptimisations;

	@Column(name = "lat", nullable = false)
	private Integer lat;

	@Column(name = "lng", nullable = false)
	private Integer lng;

	@Column(name = "lighton", nullable = true)
	private String lighton;

	@Column(name = "lightoff", nullable = true)
	private String lightoff;

	@Column(name = "height", nullable = false)
	private Integer height;

	@Column(name = "moreinfo", nullable = true)
	private String moreinfo;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "address", nullable = false)
	private String adress;

	@Column(name = "lamptype", nullable = false)
	private String lamptype;

	@Column(name = "foyertype", nullable = false)
	private String foyertype;

	@Column(name = "uuidbulb", nullable = true)
	private Integer uuidbulb;

	@Column(name = "uuidlampshade", nullable = true)
	private Integer uuidlampshade;

	@Column(name = "uuidcabinet", nullable = true)
	private Integer uuidcabinet;

	@Column(name = "uuidtown", nullable = true)
	private Integer uuidtown;


}
