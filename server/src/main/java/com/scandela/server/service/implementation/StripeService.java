package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.service.IStripeService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

@Service
public class StripeService implements IStripeService {
    
    private String webhookSecret = "tmpKey";

    protected StripeService() {
        ;
    }

    public Event constructEvent(String payload, String sigHeader) throws SignatureVerificationException {
        return Webhook.constructEvent(payload, sigHeader, webhookSecret);
    }
}
