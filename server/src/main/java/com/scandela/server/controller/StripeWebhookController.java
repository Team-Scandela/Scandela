package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.scandela.server.service.ISubscriptionService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/stripe")
public class StripeWebhookController {

    IStripeService stripeService;

    @Autowired
	private IEmailService emailService;

    @Autowired
    private ISubscriptionService subscriptionService;

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
            throws StripeException {

            String tmpSecretWebhook = "whsec_8f6138ca74e934b2251b4437775d316b3c92634cfd33f9b687ccdf28beefbd73";

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, tmpSecretWebhook);

            switch (event.getType()) {

                case "customer.created":
                    Customer customer = (Customer) event.getDataObjectDeserializer().getObject().get();
                    String email = customer.getEmail();

                    if (email != null) {

                        Subscription subscription = new Subscription();

                        subscriptionService.createSubscription(subscription);

                        emailService.sendMail(email, "Bienvenue chez Scandela!", "Merci de votre abonnement.");
                        System.out.println("Email envoyé à : " + email);
                    } else {
                        System.out.println("Aucun email trouvé pour le client.");
                    }
                    break;

                case "customer.updated":

                break;

                case "customer.deleted":

                break;

                case "charge.succeeded":

                    break;
                case "charge.failed":

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
