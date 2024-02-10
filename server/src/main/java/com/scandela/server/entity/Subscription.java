package com.scandela.server.entity;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
@Table(name = "subscription")
public class Subscription implements Serializable {

    @Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@OneToOne(mappedBy = "subscription", cascade = CascadeType.REMOVE)
	private User user;

    @Column(name = "stripeId", updatable = false)
    private String stripeId;

    @Column(name = "username", updatable = false)
    private String username;

    @Column(name = "email", updatable = false)
    private String email;

    @Column(name = "fullName", updatable = false)
    private String fullName;

    @Column(name = "startDate", updatable = false)
    private String startDate;

    @Column(name = "expiryDate", updatable = false)
    private String expiryDate;

    @Column(name = "subscriptionType", updatable = false)
    private String subscriptionType;

    @Column(name = "cardNumber", updatable = false)
    private String cardNumber;

    @Column(name = "cardExpMonth", updatable = false)
    private String cardExpMonth;

    @Column(name = "cardExpYear", updatable = false)
    private String cardExpYear;

    @Column(name = "cardCVC", updatable = false)
    private String cardCVC;
}

