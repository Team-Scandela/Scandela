package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

import com.scandela.server.entity.Subscription;
import com.scandela.server.service.IEmailService;
import com.scandela.server.service.IStripeService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/stripe")
public class StripeWebhookController {

    IStripeService stripeService;

    IEmailService emailService;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @GetMapping("/webhook")
    public void getSubscriptionsInfo() {
        System.out.println("Hey ! Stripe here.");
        return;
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader)
            throws SignatureVerificationException {

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

            switch (event.getType()) {
                case "charge.succeeded":

                    break;
                case "charge.failed":

                break;

                case "customer.subscription.updated":

                break;

                case "customer.created":
                    Customer customer = (Customer) event.getDataObjectDeserializer().getObject().get();
                    String email = customer.getEmail();

                    if (email != null) {
                        emailService.sendMail(email, "Bienvenue chez nous!", "Merci de vous être inscrit.");
                        System.out.println("Email envoyé à : " + email);
                    } else {
                        System.out.println("Aucun email trouvé pour le client.");
                    }
                    break;



                default:
                    break;
            }

        } catch (SignatureVerificationException e) {
            System.out.println("Signature Stripe invalide!");
            throw new RuntimeException("Signature Stripe invalide", e);
        }
        return ResponseEntity.ok().build();
    }
}
