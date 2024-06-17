package com.scandela.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.service.IStripeService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/stripe")
public class StripeWebhookController {

    IStripeService stripeService;

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
        @RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) throws SignatureVerificationException {
        Event event = stripeService.constructEvent(payload, sigHeader);

        //Paiement & Abonnements
        if ("charge.succeeded".equals(event.getType())) {
            /* AJOUTER UN TRACKING DES PAIMENTS */
        } else if ("customer.subscription.updated".equals(event.getType())) {
            ; // Changement de statut de l'abonnement -> envoyer un mail
        } else if ("customer.created".equals(event.getType())) {
            ; // Envoyer le mail d'ici
        }
        return ResponseEntity.ok().build();
    }
}
