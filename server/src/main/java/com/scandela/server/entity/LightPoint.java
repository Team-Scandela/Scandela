package com.scandela.server.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
// @Builder
@Data
@NoArgsConstructor
@EqualsAndHashCode
//@Table(name = "lightpoint")
public class LightPoint {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Integer id;

    @Column(name = "recommandedOptimisations", nullable = true)
	private List<String> recommandedOptimisations;

}
