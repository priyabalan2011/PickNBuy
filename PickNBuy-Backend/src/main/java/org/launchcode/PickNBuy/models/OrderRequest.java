package org.launchcode.PickNBuy.models;

import java.util.List;

public class OrderRequest {
    private List<OrderItemDTO> orderItems;
    private shippingInfo shippingDetails;
    private double itemsPrice;
    private double taxPrice;
    private double shippingPrice;
    private double totalPrice;
    private paymentInfo paymentInfo;
    private int userid;

    public OrderRequest(List<OrderItemDTO> orderItems, org.launchcode.PickNBuy.models.shippingInfo shippingInfo, double itemsPrice, double taxPrice, double shippingPrice, double totalPrice, org.launchcode.PickNBuy.models.paymentInfo paymentInfo, int userid) {
        this.orderItems = orderItems;
        this.shippingDetails = shippingInfo;
        this.itemsPrice = itemsPrice;
        this.taxPrice = taxPrice;
        this.shippingPrice = shippingPrice;
        this.totalPrice = totalPrice;
        this.paymentInfo = paymentInfo;
        this.userid = userid;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public org.launchcode.PickNBuy.models.shippingInfo getShippingDetails() {
        return shippingDetails;
    }

    public void setShippingDetails(org.launchcode.PickNBuy.models.shippingInfo shippingInfo) {
        this.shippingDetails = shippingInfo;
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

    public org.launchcode.PickNBuy.models.paymentInfo getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(org.launchcode.PickNBuy.models.paymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    }
}
