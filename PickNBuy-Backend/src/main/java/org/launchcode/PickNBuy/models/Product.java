package org.launchcode.PickNBuy.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Product extends AbstractEntity{

    @NotNull
    @Size(max=200, message="Product name cannot exceed 200 characters")
    private String productname;
    private double price;
    private String description;
    private String ratings="";

    @JsonManagedReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImages> productImages=new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Category category;
    @NotNull
    private String  seller;
    @NotNull
    @Min(value = 0, message = "Stock cannot be negative")
    @Max(value = 9999, message = "Stock cannot exceed 9999")
    private int stock;
    private int numOfReviews=0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reviews> reviews=new ArrayList<>();


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<orderItems> orderitems=new ArrayList<>();

    public Product() {
    }


    public Product(String productname, double price, String description, String ratings, Category category, String seller, int stock, int numOfReviews, LocalDateTime createdAt) {
        this.productname = productname;
        this.price = price;
        this.description = description;
        this.ratings = ratings;
//this.productImages = productImages;
        this.category = category;
        this.seller = seller;
        this.stock = stock;
        this.numOfReviews = numOfReviews;
        this.createdAt = createdAt;
  //      this.reviews = reviews;
    }
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRatings() {
        return ratings;
    }

    public void setRatings(String ratings) {
        this.ratings = ratings;
    }

    public List<ProductImages> getProductImages() {
        return productImages;
    }

    public void setProductImages(List<ProductImages> productImages) {
        this.productImages = productImages;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getNumOfReviews() {
        return numOfReviews;
    }

    public void setNumOfReviews(int numOfReviews) {
        this.numOfReviews = numOfReviews;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Reviews> getReviews() {
        return reviews;
    }

    public void setReviews(List<Reviews> reviews) {
        this.reviews = reviews;
    }

    public void addProductImage(ProductImages image) {
        productImages.add(image);
        image.setProduct(this);
    }

    public void removeProductImage(ProductImages image) {
        productImages.remove(image);
        image.setProduct(null);
    }
}
