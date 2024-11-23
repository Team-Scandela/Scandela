package com.scandela.server.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Subscription;
import com.scandela.server.entity.User;
import com.scandela.server.service.ISubscriptionService;
import com.scandela.server.service.IUserService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/subscription")
public class SubscriptionController {
    @Autowired
    private ISubscriptionService subscriptionService;

    private UserDao userdao;

    @Autowired
    private IUserService userService;


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

    @PostMapping
    public Map<String, String> subscribeToPremium(@RequestBody Subscription subscription) throws StripeException {
        // User maybeUser = userService.getUserById(UUID.fromString(subscription.getUserid()));

        // if (maybeUser != null) {
        //     maybeUser.setPremium(true);
        //     try {
        //         userService.update(maybeUser.getId(), maybeUser);
        //     } catch (Exception e) {
        //         // TODO Auto-generated catch block
        //         e.printStackTrace();
        //     }
        // }
        return subscriptionService.createSubscription(subscription);
    }

    @PutMapping("/{id}")
	public Subscription updateSubscription(@PathVariable UUID id, @RequestBody Subscription update) throws Exception {
		return subscriptionService.update(id, update);
	}

    @PutMapping("/cancel/{id}")
	public void cancelSubscription(@PathVariable UUID id) throws Exception {
        User maybeUser = userService.getUserById(id);

        if (maybeUser != null) {
            maybeUser.setPremium(false);
            userService.update(id, maybeUser);
            subscriptionService.delete(id);
        }

	}

    @DeleteMapping("/delete/{id}")
	public void deleteSubscription(@PathVariable UUID id) {
		subscriptionService.delete(id);
	}
}
