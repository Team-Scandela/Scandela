package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Subscription;
import com.scandela.server.service.IStripeWebhookService;
import com.scandela.server.service.ISubscriptionService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/stripe")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Value("${stripe.secretKey}")
    private String secretKey;


    IStripeWebhookService stripeWebhookService;

    @Autowired
    private ISubscriptionService subscriptionService;


    @GetMapping("/webhook")
    public void getSubscriptionsInfo() {
        System.out.println("Hey ! Stripe here.");
        return;
    }

    @GetMapping("/handleSessionId")
    public String handleStripeSuccess(@RequestParam("session_id") String sessionId) throws Exception {
        try {
            Stripe.apiKey = secretKey;
            Session session = Session.retrieve(sessionId);

            String customerId = session.getCustomer();

            Subscription subscription = subscriptionService.getBySessionid(sessionId);
            if (subscription != null) {
                subscription.setStripeId(customerId);
                subscriptionService.update(subscription.getId(), subscription);
                return "Paiement réussi et abonnement mis à jour !";
            } else {
                return "Erreur : Abonnement non trouvé.";
            }
        } catch (StripeException e) {
            e.printStackTrace();
            return "Erreur lors de la récupération des informations de session : " + e.getMessage();
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader)
            throws Exception {

        String tmpSecretWebhook = "SECRET_WEBHOOK_KEY_HERE"; // AJOUTER LA CLE DU WEBHOOK AVANT DE PR

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, tmpSecretWebhook);

            switch (event.getType()) {

                case "customer.created":
                    stripeWebhookService.handleCustomerCreation(event);
                    break;

                case "customer.updated":
                    stripeWebhookService.handleCustomerUpdate(event);

                break;

                case "customer.deleted":
                    stripeWebhookService.handleCustomerDeletion(event);

                break;

                case "charge.succeeded":
                    stripeWebhookService.handleChargeSucceeded(event);

                    break;
                case "charge.failed":
                    stripeWebhookService.handleChargeFailed(event);

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
