package com.scandela.server.service;

import com.stripe.model.Event;

public interface IStripeWebhookService {
    public void handleCustomerCreation(Event event) throws Exception;
    public void handleCustomerUpdate(Event event) throws Exception;
    public void handleCustomerDeletion(Event event) throws Exception;
    public void handleChargeFailed(Event event) throws Exception;
    public void handleChargeSucceeded(Event event) throws Exception;
    public void activatePremium(Event event);
}
