package org.launchcode.PickNBuy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Reviews extends AbstractEntity{


//    @NotNull
//    private String user;
    @ManyToOne
    @JoinColumn(name="user_id")
   // @JsonIgnore
    //@JsonBackReference
    private userModel user;

    private String rating;
    private String comment;

    @NotNull
    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonIgnore
    @JsonBackReference
    private Product product;

    public Reviews() {
    }

    public Reviews(userModel user, String rating, String comment,Product product) {

        this.user = user;
        this.rating = rating;
        this.comment = comment;
        this.product=product;
    }

    public userModel getUser() {
        return user;
    }

    public void setUser(userModel user) {
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
