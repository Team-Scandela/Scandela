package com.scandela.server.service;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;

public interface IStripeService {
    Event constructEvent(String payload, String sigHeader) throws SignatureVerificationException;
}