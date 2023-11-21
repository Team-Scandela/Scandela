package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.model.PaymentIntent;

import com.scandela.server.entity.Subscription;
import com.scandela.server.service.ISubscriptionService;

@RestController
@RequestMapping(value = "/subscription")
public class SubscriptionController extends AbstractController {
    @Autowired
    private ISubscriptionService subscriptionService;


    @GetMapping
    public List<Subscription> getSubscriptionsInfo() {
        return subscriptionService.getAll();
    }

    @GetMapping("/checkout")
    public String checkout() {
        return subscriptionService.getClientPublicKey();
    }

    @GetMapping("/create-payment-intent")
    public PaymentIntent createPaymentIntent() {
        return subscriptionService.createPaymentIntent(null);
    }
}
