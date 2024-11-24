package com.scandela.server.service;

import java.util.Map;
import java.util.Optional;

import com.scandela.server.entity.Subscription;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface ISubscriptionService extends IService<Subscription> {
    public String getClientPublicKey();
    public Subscription getByStripeId(String stripeid);
    public Optional<Subscription> getBySessionid(String sessionid);
    public PaymentIntent createPaymentIntent(Long price);
    public Map<String, String> createSubscription(Subscription subscription) throws StripeException;
    public Subscription saveSubscriptionToDB(String sessionId, String userId);
}
