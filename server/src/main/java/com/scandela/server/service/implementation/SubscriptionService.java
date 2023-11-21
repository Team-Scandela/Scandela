package com.scandela.server.service.implementation;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.SubscriptionDao;
import com.scandela.server.entity.Subscription;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ISubscriptionService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@Service
public class SubscriptionService extends AbstractService<Subscription> implements ISubscriptionService {
    protected SubscriptionService(SubscriptionDao subscriptionDao) {
		super(subscriptionDao);
	}

    private String publicKey;

    public String getClientPublicKey() {
        return publicKey;
    }

    //TODO: ajouter l'exception de Stripe
    public PaymentIntent createPaymentIntent(Long price) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("price", price);
        params.put("currency", "usd");

        try {
            return PaymentIntent.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
            return null;
        }
    }
}
