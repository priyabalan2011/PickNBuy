package org.launchcode.PickNBuy.models;

public class ProductUpdateDTO {
    private String productname;
    private Double price;
    private String description;
    private Category category;
    private String seller;
    private Integer stock;
    private Boolean imagesCleared;


    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Boolean getImagesCleared() {
        return imagesCleared;
    }

    public void setImagesCleared(Boolean imagesCleared) {
        this.imagesCleared = imagesCleared;
    }
}
