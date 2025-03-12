package org.launchcode.PickNBuy.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Order extends AbstractEntity{



    @ManyToOne
    @NotNull
    @JoinColumn(name="user_id")
    private userModel user;

    @OneToOne
    @NotNull
    @JoinColumn(name="shipping_id")
    private shippingInfo shippinginfo;

    @OneToMany
    @NotNull
    @JoinColumn(name="orderItems_id")
    private List<orderItems> orderitems = new ArrayList<>();
    @NotNull
    private double itemsPrice=0.0;
    @NotNull
    private double taxPrice=0.0;
    @NotNull
    private double shippingPrice=0.0;
    @NotNull
    private double totalPrice=0.0;
    @NotNull
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
    @NotNull
    private String orderStatus="Processing";

    public Order(userModel user, shippingInfo shippinginfo, List<orderItems> orderitems, double itemsPrice, double taxPrice, double shippingPrice, double totalPrice, LocalDateTime createdAt, String orderStatus) {
        this.user = user;
        this.shippinginfo = shippinginfo;
        this.orderitems = orderitems;
        this.itemsPrice = itemsPrice;
        this.taxPrice = taxPrice;
        this.shippingPrice = shippingPrice;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.orderStatus = orderStatus;
    }

    public userModel getUser() {
        return user;
    }

    public void setUser(userModel user) {
        this.user = user;
    }

    public shippingInfo getShippinginfo() {
        return shippinginfo;
    }

    public void setShippinginfo(shippingInfo shippinginfo) {
        this.shippinginfo = shippinginfo;
    }

    public List<orderItems> getOrderitems() {
        return orderitems;
    }

    public void setOrderitems(List<orderItems> orderitems) {
        this.orderitems = orderitems;
    }

    public double getItemsPrice() {
        return itemsPrice;
    }

    public void setItemsPrice(double itemsPrice) {
        this.itemsPrice = itemsPrice;
    }

    public double getTaxPrice() {
        return taxPrice;
    }

    public void setTaxPrice(double taxPrice) {
        this.taxPrice = taxPrice;
    }

    public double getShippingPrice() {
        return shippingPrice;
    }

    public void setShippingPrice(double shippingPrice) {
        this.shippingPrice = shippingPrice;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
}
