package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.models.Address;
import org.launchcode.PickNBuy.models.PaymentRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins ="*")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;
    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentRequest.getAmount());
        params.put("currency", "usd");
        params.put("description", "TEST PAYMENT");

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("integration_check", "accept_payment");
        params.put("metadata", metadata);

        // Shipping object
        Map<String, Object> shipping = new HashMap<>();
        shipping.put("name", paymentRequest.getShipping().getName());

        Map<String, Object> address = new HashMap<>();
        Address addr = paymentRequest.getShipping().getAddress();

        address.put("line1", addr.getLine1());
        address.put("postal_code", addr.getPostalCode());
        address.put("city", addr.getCity());
        address.put("state", addr.getState());
        address.put("country", addr.getCountry());

        shipping.put("address", address);
        params.put("shipping", shipping);

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("client_secret", intent.getClientSecret());

        return ResponseEntity.ok(response);

    }

    @GetMapping("/stripe-api-key")
    public ResponseEntity<?> sendStripeApi() {
        return ResponseEntity.ok(Map.of("stripeApiKey", stripeApiKey));
    }
}
