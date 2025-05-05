package org.launchcode.PickNBuy.controllers;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

import org.hibernate.dialect.function.array.ArrayContainsUnnestFunction;
import org.launchcode.PickNBuy.data.OrdersRepository;
import org.launchcode.PickNBuy.data.ProductRepository;
import org.launchcode.PickNBuy.data.userModelRepository;
import org.launchcode.PickNBuy.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.launchcode.PickNBuy.exception.ResourceNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins ="*")
public class OrderController {
    @Autowired
    private OrdersRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private userModelRepository userRepository;



    // Create new order
    @PostMapping("/new")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        System.out.println("userid: " + orderRequest.getUserid());
        System.out.println("total price" +orderRequest.getTotalPrice());
        Orders order = new Orders();
        order.setShippinginfo(orderRequest.getShippingDetails());
        order.setItemsPrice(orderRequest.getItemsPrice());
        order.setTaxPrice(orderRequest.getTaxPrice());
        order.setShippingPrice(orderRequest.getShippingPrice());
        order.setTotalPrice(orderRequest.getTotalPrice());
        order.setPaymentInfo(orderRequest.getPaymentInfo());
        order.setPaidAt(LocalDateTime.now());
        System.out.println("Trying to fetch user with ID: " + orderRequest.getUserid());
        userModel user = userRepository.findById(orderRequest.getUserid())
                .orElseThrow(() -> new RuntimeException("User not found "));

        order.setUser(user);

        List<orderItems> itemList = new ArrayList<>();
        for (OrderItemDTO itemDto : orderRequest.getOrderItems()) {
            orderItems item = new orderItems();
            item.setName(itemDto.getName());
            item.setPrice(itemDto.getPrice());
            item.setQuantity(itemDto.getQuantity());
            item.setImage(itemDto.getImage());

            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found for ID: " + itemDto.getProductId()));
            item.setProduct(product);
            item.setOrder(order);

            itemList.add(item);
        }
        order.setOrderitems(itemList);


        Orders savedOrder = orderRepository.save(order);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);

      //  return ResponseEntity.ok(Map.of("success", true, "order", savedOrder));
        return ResponseEntity.ok(response);
    }

    // Get single order
    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable int id) {
        Orders order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return ResponseEntity.ok(Map.of("success", true, "order", order));
    }

    // Get current user's orders
    @GetMapping("/myorders")
    public ResponseEntity<?> getMyOrders(@RequestBody userModel currentUser) {
        List<Orders> orders = orderRepository.findByUserId(currentUser.getId());
        return ResponseEntity.ok(Map.of("success", true, "orders", orders));
    }

    // Admin: Get all orders
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        List<Orders> orders = orderRepository.findAll();
        double totalAmount = orders.stream().mapToDouble(Orders::getTotalPrice).sum();

        return ResponseEntity.ok(Map.of("success", true, "totalAmount", totalAmount, "orders", orders));
    }

    // Admin: Update order status
    @PutMapping("/order/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable int id, @RequestBody Map<String, String> body) {
        Orders order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if ("Delivered".equals(order.getOrderStatus())) {
            throw new ResourceNotFoundException("Order has already been delivered");
        }

        for (orderItems item : order.getOrderitems()) {
            updateStock(item.getProduct().getId(), item.getQuantity());
        }

        order.setOrderStatus(body.get("orderStatus"));
        order.setDeliveredAt(LocalDateTime.now());

        orderRepository.save(order);
        return ResponseEntity.ok(Map.of("success", true));
    }

    private void updateStock(int productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    // Admin: Delete order
    @DeleteMapping("/order/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable int id) {
        Orders order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        orderRepository.delete(order);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
