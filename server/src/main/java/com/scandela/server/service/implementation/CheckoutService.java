package com.scandela.server.service.implementation;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.scandela.server.service.ICheckoutService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class CheckoutService implements ICheckoutService {

    @Value("${stripe.secretKey}")
    private String secretKey;

    public Map<String, String> createCheckoutSession() throws StripeException {

        Stripe.apiKey = secretKey;

        String productId = "prod_PDoC5Ig8LbirCM";

        SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                    .setSuccessUrl("https://example.com/success")
                    .setCancelUrl("https://example.com/cancel")
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

            System.out.println(session.getCustomer());

            Map<String, String> responseData = new HashMap<>();
            responseData.put("url", session.getUrl());
            responseData.put("customerId", session.getCustomer());
            return responseData;
    }
}
