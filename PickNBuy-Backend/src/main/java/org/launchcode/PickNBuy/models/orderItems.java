package org.launchcode.PickNBuy.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class orderItems extends AbstractEntity{

//    @NotNull
//    @Size(min=100, message="Product name cannot exceed 100 characters")
//    private String productName;

    @NotNull
    private Integer productQuantity;

    @NotNull
    private Double unitPrice;

    @ManyToOne
    @NotNull
    @JoinColumn(name="order_id")
    private Orders order;

//    @ManyToOne
//    @NotNull
//    @JoinColumn(name="user_id")
//    private userModel user;

    @NotNull
    @ManyToOne
    @JoinColumn(name="product_id")
    private  Product product;

    public orderItems(Integer productQuantity, Double unitPrice, Orders order, Product product) {
        this.unitPrice=unitPrice;
        this.productQuantity = productQuantity;
        this.order = order;
        this.product = product;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }


    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
