package com.scandela.server.service.implementation;

import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.scandela.server.entity.Subscription;
import com.scandela.server.entity.User;
import com.scandela.server.service.IEmailService;
import com.scandela.server.service.IStripeWebhookService;
import com.scandela.server.service.ISubscriptionService;
import com.scandela.server.service.IUserService;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;

@Service
public class StripeWebhookService implements IStripeWebhookService {

    @Autowired
	private IEmailService emailService;

    @Autowired
    private IUserService userService;

    @Autowired
    private ISubscriptionService subscriptionService;

    @Override
    public void handleCustomerCreation(Event event) throws Exception {
        Customer newCustomer = (Customer) event.getDataObjectDeserializer().getObject().get();
        String email = newCustomer.getEmail();

        if (email != null) {

            emailService.sendMail(email, "Bienvenue chez Scandela!", "Merci de votre abonnement.");
            System.out.println("Email envoyé à : " + email);
        } else {
            System.out.println("Aucun email trouvé pour le client.");
        }
    }

    public void handleCustomerUpdate(Event event) throws Exception {
        Subscription newSubscription = new Subscription();
        Customer customerUpdated = (Customer) event.getDataObjectDeserializer().getObject().get();

        newSubscription.setEmail(customerUpdated.getEmail());
        newSubscription.setFullName(customerUpdated.getName());

        subscriptionService.update(subscriptionService.getByStripeId(customerUpdated.getId()).getId(), newSubscription);
    }

    public void handleCustomerDeletion(Event event) throws Exception {
        Customer customerDeleted = (Customer) event.getDataObjectDeserializer().getObject().get();
        subscriptionService.delete(subscriptionService.getByStripeId(customerDeleted.getId()).getId());;
    }

    public void handleChargeFailed(Event event) throws Exception {
        Charge charge = (Charge) event.getDataObjectDeserializer().getObject().get();
        String customerEmail = charge.getBillingDetails().getEmail();

        emailService.sendMail(customerEmail, "[Scandela] - Paiement réussi", "Merci pour votre paiement.");
    }

    public void handleChargeSucceeded(Event event) throws Exception {
        Charge chargeFailed = (Charge) event.getDataObjectDeserializer().getObject().get();
        String customerEmailFailed = chargeFailed.getBillingDetails().getEmail();

        emailService.sendMail(customerEmailFailed, "[Scandela] - Échec de paiement", "Votre paiment a échoué. Veuillez vérifier vos informations de paiement.");
    }

    public void activatePremium(Event event) {
        System.out.println("Starting activatePremium");

        System.out.println("Raw Payload: " + event.getData().toJson());

        String jsonPayloadString = event.getData().toJson();

        JSONObject jsonObject = new JSONObject(jsonPayloadString);

        JSONObject metadata = jsonObject
            .getJSONObject("object")
            .getJSONObject("metadata");

        if (metadata.isEmpty() || !metadata.has("userId")) {
            System.out.println("Metadata is empty..");
        } else {
            System.out.println("Metadata: " + metadata.toString());

            String userId = metadata.get("userId").toString();
            System.out.println("Found userId in metadata: " + userId);

            User maybeUser = userService.getUserById(UUID.fromString(userId));

            if (maybeUser != null) {
                userService.setUserPremium(UUID.fromString(userId), true);
                subscriptionService.saveSubscriptionToDB(null, userId);
            } else {
                System.out.println("User not found for ID: " + userId);
            }

            return;
        }
    }
}
