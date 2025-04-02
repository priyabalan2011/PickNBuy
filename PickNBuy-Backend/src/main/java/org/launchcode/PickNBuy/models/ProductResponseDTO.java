package org.launchcode.PickNBuy.models;

import java.util.List;

public class ProductResponseDTO {
    private List<Product> products;
    private long count;
    private int resPerPage;

    public ProductResponseDTO(List<Product> products, long count, int resPerPage) {
        this.products = products;
        this.count = count;
        this.resPerPage = resPerPage;
    }

    public List<Product> getProducts() {
        return products;
    }

    public long getCount() {
        return count;
    }

    public int getResPerPage() {
        return resPerPage;
    }
}
