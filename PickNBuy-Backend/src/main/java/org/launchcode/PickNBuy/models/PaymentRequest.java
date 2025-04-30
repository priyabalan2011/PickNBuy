package org.launchcode.PickNBuy.models;

public class PaymentRequest {
    private Long amount;
    private ShippingInformation shipping;


    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public ShippingInformation getShipping() {
        return shipping;
    }

    public void setShipping(ShippingInformation shipping) {
        this.shipping = shipping;
    }
}
