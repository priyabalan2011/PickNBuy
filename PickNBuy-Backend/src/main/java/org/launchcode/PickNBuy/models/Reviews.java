package org.launchcode.PickNBuy.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Reviews extends AbstractEntity{


    @NotNull
    private String user;

    private String rating;
    private String comment;

    @NotNull
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

    public Reviews() {
    }

    public Reviews(String user, String rating, String comment) {

        this.user = user;
        this.rating = rating;
        this.comment = comment;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
