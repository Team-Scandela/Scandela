package com.scandela.server.service;

import java.util.Map;

import com.scandela.server.entity.Subscription;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface ISubscriptionService extends IService<Subscription> {
    public String getClientPublicKey();
    public Subscription getByStripeId(String stripeid);
    public Subscription getBySessionid(String sessionid);
    public PaymentIntent createPaymentIntent(Long price);
    public Map<String, String> createSubscription(Subscription subscription) throws StripeException;
}
