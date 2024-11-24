package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        System.out.println("1");
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

        Session session = (Session) dataObjectDeserializer.getObject().get();
        String userId = session.getMetadata().get("user_id");

        User maybeUser = userService.getUserById(UUID.fromString(userId));
        System.out.println("2");

        if (maybeUser != null) {
            System.out.println("3");
            userService.setUserPremium(UUID.fromString(userId), true);
            System.out.println("4");
            subscriptionService.saveSubscriptionToDB(session.getId(), userId);
            System.out.println("5");
        }
    }
}
