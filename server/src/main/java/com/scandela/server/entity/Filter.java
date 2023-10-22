package com.scandela.server.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "filters")
public class Filter implements Serializable {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Integer id;

    @Column(name = "isActive", updatable = false)
    private Boolean isActive;

    @Column(name = "title", updatable = false)
    private String title;
}
