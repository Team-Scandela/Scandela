package com.scandela.server.service;

import java.util.Map;

import com.stripe.exception.StripeException;

public interface ICheckoutService {
    public Map<String, String> createCheckoutSession() throws StripeException;
}
