package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.scandela.server.dao.SubscriptionDao;
import com.scandela.server.entity.Subscription;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ISubscriptionService;
import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Token;
// import com.stripe.model.Subscription;
import com.stripe.Stripe;

@Service
public class SubscriptionService extends AbstractService<Subscription> implements ISubscriptionService {
    protected SubscriptionService(SubscriptionDao subscriptionDao) {
        super(subscriptionDao);
    }

    private String publicKey;

    @Value("${stripe.secretKey}")
    private String secretKey;

    public String getClientPublicKey() {
        return publicKey;
    }

    // TODO: ajouter l'exception de Stripe
    public PaymentIntent createPaymentIntent(Long price) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("price", price);
        params.put("currency", "usd");

        Stripe.apiKey = secretKey;

        try {
            return PaymentIntent.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Customer createCustomer(Subscription subscription) {

        // Need -> address, full name, email, payment method

        HashMap<String, Object> params = new HashMap<String, Object>();

        params.put("email", subscription.getEmail());
        params.put("name", subscription.getFullName());

        try {
            Customer newCustomer = Customer.create(params);

            return newCustomer;
        } catch (StripeException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    public Customer retrieveCustomer(String customerId) {
        HashMap<String, Object> retrieveParams = new HashMap<String, Object>();
        List<String> expandList = new ArrayList<String>();
        expandList.add("sources");
        retrieveParams.put("expand", expandList);
        Customer customer = null;
        try {
            customer = Customer.retrieve("cus_JPujEY8****", retrieveParams, null);
        } catch (StripeException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } //add customer id here : it will start with cus_

        return customer;
    }

    public Card createCard(Subscription subscription, Customer customer) throws StripeException {

        HashMap<String, Object> cardParam = new HashMap<String, Object>(); //add card details

		cardParam.put("number", subscription.getCardNumber());
		cardParam.put("exp_month", subscription.getCardExpMonth());
		cardParam.put("exp_year", subscription.getCardExpYear());
		cardParam.put("cvc", subscription.getCardCVC());

		HashMap<String, Object> tokenParam = new HashMap<String, Object>();
		tokenParam.put("card", cardParam);

		Token token = Token.create(tokenParam); // create a token

		HashMap<String, Object> source = new HashMap<String, Object>();
		source.put("source", "tok_visa"); //add token as source

        Card card = (Card)customer.getSources().create(source);

        return card;
    }

    public void createCharge(Customer customer) {
        HashMap<String, Object> chargeParam = new HashMap<String, Object>(); //add card details

		chargeParam.put("amount", "1200");
		chargeParam.put("currency", "usd");
		chargeParam.put("exp_year", customer.getId());

        try {
            Charge.create(chargeParam);
        } catch (StripeException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    public Subscription createSubscription(Subscription subscription) {

        Stripe.apiKey = secretKey;
        // if (subscription.getStripeId() != null && retrieveCustomer(subscription.getStripeId()) != null) {
        //     ;
        // } else {
        Customer newCustomer = createCustomer(subscription);

        subscription.setStripeId(newCustomer.getId());

        try {
            createCard(subscription, newCustomer);
            createCharge(newCustomer);
            Map<String, Object> prodParams = new HashMap<String, Object>();
            prodParams.put("prod", "prod_PDoC5Ig8LbirCM");

            Map<String, Object> items = new HashMap<String, Object>();
            items.put("0", prodParams);

            Map<String, Object> subscriptionParam = new HashMap<String, Object>();
            subscriptionParam.put("items", items);
            subscriptionParam.put("customer", newCustomer.getId());

            com.stripe.model.Subscription.create(subscriptionParam);

        } catch (StripeException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        dao.save(subscription);
        // }


        return subscription;
    }
}
