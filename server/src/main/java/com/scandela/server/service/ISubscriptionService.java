package com.scandela.server.service;

import com.scandela.server.entity.Subscription;
import com.stripe.model.PaymentIntent;

public interface ISubscriptionService extends IService<Subscription> {
    public String getClientPublicKey();
    public PaymentIntent createPaymentIntent(Long price);
    public Subscription createSubscription(Subscription subscription);
}
