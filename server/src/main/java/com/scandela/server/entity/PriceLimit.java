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
@Table(name = "pricelimits")
public class PriceLimit implements Serializable {

    @Id
    @GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(name = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "userId")
    private String userId;

    @Column(name = "triggeredstate", nullable = false)
    private Boolean triggeredstate;

    @Column(name = "value", updatable = false)
    private Double value;

    @Column(name = "limitside", updatable = false)
    private String limitside;
}
