package org.launchcode.PickNBuy.exception;

import org.launchcode.PickNBuy.models.Product;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(int id){
        super("Could not found the product with id "+ id);
    }
}
