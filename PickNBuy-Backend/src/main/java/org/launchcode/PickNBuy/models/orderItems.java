package org.launchcode.PickNBuy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class orderItems extends AbstractEntity{

//    @NotNull
//    @Size(min=100, message="Product name cannot exceed 100 characters")
//    private String productName;

    private String name;
    private Integer quantity;
    private String image;
    private Double price;

    @ManyToOne
    @NotNull
    @JsonIgnore
    @JoinColumn(name="order_id")
    private Orders order;

//    @ManyToOne
//    @NotNull
//    @JoinColumn(name="user_id")
//    private userModel user;

    @NotNull
    @ManyToOne
    @JoinColumn(name="product_id")
   // @JsonIgnore
   // @JsonBackReference
    private  Product product;

    public orderItems(){}
    public orderItems(String name, Integer quantity, String image, Double price, Orders order, Product product) {
        this.name = name;
        this.quantity = quantity;
        this.image = image;
        this.price = price;
        this.order = order;
        this.product = product;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
