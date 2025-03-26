package org.launchcode.PickNBuy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
@Entity
public class ProductImages extends AbstractEntity{


    @NotNull
    @ManyToOne
    @JoinColumn(name="product_id")
    //@JsonIgnore
    @JsonBackReference
    private Product product;

    private String images;
    public ProductImages() {
    }

    public ProductImages(String images) {
        this.images = images;
       // this.product = product;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


}
