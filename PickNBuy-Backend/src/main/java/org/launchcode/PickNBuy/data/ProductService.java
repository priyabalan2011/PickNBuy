package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.Category;
import org.launchcode.PickNBuy.models.Product;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productrepository;

    public List<Product> searchByName(String productname) {
        return productrepository.findByProductnameContainingIgnoreCase(productname);
    }

    public List<Product> searchByCategory(String category) {
        return productrepository.findByCategoryIgnoreCase(category);
    }
//    public List<Product> searchByCategory(String category) {
//        return productrepository.findByCategory(Category.valueOf(category.toUpperCase()));
//    }
    public List<Product> searchByPriceRange(double minPrice, double maxPrice) {
        return productrepository.findByPriceRange(minPrice, maxPrice);
    }

}
