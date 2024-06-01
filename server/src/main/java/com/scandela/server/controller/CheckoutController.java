package com.scandela.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.service.ICheckoutService;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping(value = "/checkout")
@CrossOrigin(origins = "*")
public class CheckoutController {
    
    @Autowired
    private ICheckoutService checkoutService;


    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutURL() throws StripeException {
        return checkoutService.createCheckoutSession();
    }
}
