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
@Table(name = "subscription")
public class Subscription implements Serializable {

    @Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "id", nullable = false)
	private UUID id;

    @Column(name = "stripeId")
    private String stripeId;

    @Column(name = "sessionid")
    private String sessionid;

    @Column(name = "userid")
    private String userid;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "startDate")
    private String startDate;

    @Column(name = "expiryDate")
    private String expiryDate;

    @Column(name = "subscriptionType")
    private String subscriptionType;

    @Column(name = "cardNumber")
    private String cardNumber;

    @Column(name = "cardExpMonth")
    private String cardExpMonth;

    @Column(name = "cardExpYear")
    private String cardExpYear;

    @Column(name = "cardCVC")
    private String cardCVC;
}

