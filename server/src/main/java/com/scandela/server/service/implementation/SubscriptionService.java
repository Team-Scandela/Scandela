package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.BulbDao;
import com.scandela.server.dao.SubscriptionDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Subscription;
import com.scandela.server.entity.User;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ISubscriptionService;
import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.Token;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentMethodAttachParams;
import com.stripe.param.PaymentLinkCreateParams.CustomerCreation;
import com.stripe.param.checkout.SessionCreateParams;
// import com.stripe.model.Subscription;
import com.stripe.Stripe;

@Service
public class SubscriptionService extends AbstractService<Subscription> implements ISubscriptionService {

    private String publicKey;

    @Value("${stripe.secretKey}")
    private String secretKey;

    public String getClientPublicKey() {
        return publicKey;
    }

    private UserDao userDao;

    protected SubscriptionService(SubscriptionDao subscriptionDao, UserDao userDao) {
        super(subscriptionDao);
        this.userDao = userDao;
    }

    @Override
	@Transactional(rollbackFor = { Exception.class })
    public Subscription update(UUID id, Subscription update, String... ignoredProperties) throws Exception {
		try {
            System.out.println("Will add -> " + update);
			Subscription subscription = super.update(id, update, ignoredProperties);

            System.out.println("Found subscription -> " + subscription);


	        return subscription;
		} catch (Exception e) {
			throw e;
		}
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

        Optional<User> user = userDao.findById(UUID.fromString(subscription.getUserid()));

        HashMap<String, Object> params = new HashMap<String, Object>();

        subscription.setEmail(user.get().getEmail());

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
        } // add customer id here : it will start with cus_

        return customer;
    }

    public String createCard(Subscription subscription, Customer customer) throws StripeException {

        HashMap<String, Object> cardParam = new HashMap<String, Object>();

        cardParam.put("number", subscription.getCardNumber());
        cardParam.put("exp_month", subscription.getCardExpMonth());
        cardParam.put("exp_year", subscription.getCardExpYear());
        cardParam.put("cvc", subscription.getCardCVC());

        HashMap<String, Object> tokenParam = new HashMap<String, Object>();
        tokenParam.put("card", cardParam);

        try {
            Token token = Token.create(tokenParam);
            return token.getId();
        } catch (StripeException e) {
            e.printStackTrace();
            return null;
        }

        // HashMap<String, Object> source = new HashMap<String, Object>();
        // source.put("source", "tok_visa"); //add token as source

        // Card card = (Card)customer.getSources().create(source);

    }

    public void createCharge(Customer customer) {
        HashMap<String, Object> chargeParam = new HashMap<String, Object>(); // add card details

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

    public PaymentMethod createPaymentMethod(String cardToken, String customerId) {

        Map<String, Object> tmpCardParams = new HashMap<>();
        tmpCardParams.put("token", cardToken);

        Map<String, Object> paymentMethodParams = new HashMap<>();
        paymentMethodParams.put("type", "card");
        paymentMethodParams.put("card", tmpCardParams);

        try {
            PaymentMethod paymentMethod = PaymentMethod.create(paymentMethodParams);

            Customer customer = Customer.retrieve(customerId);
            Map<String, Object> params = new HashMap<>();
            params.put("customer", customer.getId());
            params.put("payment_method", paymentMethod.getId());

            PaymentMethodAttachParams newPayMethodParams = PaymentMethodAttachParams.builder().setCustomer(customerId)
                    .build();
            PaymentMethod updatedPaymentMethod = paymentMethod.attach(newPayMethodParams);

            return updatedPaymentMethod;
        } catch (StripeException e) {
            e.printStackTrace();
        }

        return null;
    }

    public Subscription getByStripeId(String stripeid) {
        return ((SubscriptionDao) dao).findByStripeId(stripeid).get();
    }

    public Optional <Subscription> getBySessionid(String sessionid) {
        return ((SubscriptionDao) dao).findBySessionid(sessionid);
    }

    public Subscription saveSubscriptionToDB(String sessionId, String userId) {
        Subscription newSubscription = new Subscription();

        newSubscription.setSessionid(sessionId);
        newSubscription.setUserid(userId);

        ((SubscriptionDao) dao).save(newSubscription);

        return newSubscription;
    }

    public Map<String, String> createSubscription(Subscription subscription) throws StripeException {

        Stripe.apiKey = secretKey;

        String productId = "prod_PDoC5Ig8LbirCM";

        System.out.println("Here is Subscription -> " + subscription);

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl("https://app.scandela.com/")
                .setCancelUrl("https://example.com/cancel")
                .putMetadata("userId", subscription.getUserid())
                .setSubscriptionData(
                    SessionCreateParams.SubscriptionData.builder()
                        .putMetadata("userId", subscription.getUserid())
                        .build()
                )
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setProduct(productId)
                                .setCurrency("eur")
                                .setUnitAmount(1000L)
                                .setRecurring(SessionCreateParams.LineItem.PriceData.Recurring.builder()
                                        .setInterval(SessionCreateParams.LineItem.PriceData.Recurring.Interval.MONTH)
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);

        session.setSuccessUrl(session.getSuccessUrl() + session.getId());

        session.setCustomerCreation("always");

        Map<String, String> responseData = new HashMap<>();
        responseData.put("url", session.getUrl());
        responseData.put("customerId", session.getCustomer());
        responseData.put("successRedirect", session.getSuccessUrl());

        // session.

        System.out.println("Stripe id -> " + session.getCustomer());

        subscription.setSessionid(session.getId());

        // Customer newCustomer = createCustomer(subscription);

        // subscription.setStripeId(newCustomer.getId());

        // try {
        // // String cardToken = createCard(subscription, newCustomer);
        // PaymentMethod paymentMethod = createPaymentMethod("tok_visa",
        // newCustomer.getId());

        // Map<String, Object> subscriptionParams = new HashMap<>();
        // subscriptionParams.put("customer", newCustomer.getId());
        // subscriptionParams.put("items", Collections.singletonList(Map.of("price",
        // "price_1OPMaWA9IrH4mWMNF0InmSO8")));
        // subscriptionParams.put("default_payment_method", paymentMethod.getId());

        // // createCharge(newCustomer);
        // // Map<String, Object> prodParams = new HashMap<String, Object>();
        // // prodParams.put("prod", "prod_PDoC5Ig8LbirCM");

        // // Map<String, Object> items = new HashMap<String, Object>();
        // // items.put("0", prodParams);

        // // Map<String, Object> subscriptionParam = new HashMap<String, Object>();
        // // subscriptionParam.put("items", items);
        // // subscriptionParam.put("customer", newCustomer.getId());

        // com.stripe.model.Subscription.create(subscriptionParams);

        // } catch (StripeException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }

        // dao.save(subscription);
        // }

        return responseData;
    }
}
