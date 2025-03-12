package org.launchcode.PickNBuy.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
public class orderItems extends AbstractEntity{

    @NotNull
    @Size(min=100, message="Product name cannot exceed 100 characters")
    private String productName;

    @NotNull
    private Integer productQuantity;

    @ManyToOne
    @NotNull
    @JoinColumn(name="user_id")
    private userModel user;

    @NotNull
    @ManyToMany
    @JoinColumn(name="product_id")
    private List<Product> product=new ArrayList<>();

    public orderItems(String productName, Integer productQuantity, userModel user, List<Product> product) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.user = user;
        this.product = product;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }

    public userModel getUser() {
        return user;
    }

    public void setUser(userModel user) {
        this.user = user;
    }

    public List<Product> getProduct() {
        return product;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
    }
}
