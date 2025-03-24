package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.data.ProductRepository;
import org.launchcode.PickNBuy.exception.ProductNotFoundException;
import org.launchcode.PickNBuy.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins ="*")
public class productController {

    @Autowired
    private ProductRepository productrepository;

    @GetMapping("/")
    List<Product> getAllProducts()
    {
        return productrepository.findAll();
    }

    @PostMapping("/newproducts")
    public Product addproducts(@RequestBody Product product)
    {
        return productrepository.save(product);
    }
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id)
    {
        return productrepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }


    @PutMapping("/{id}")
    public Product updateProduct(@RequestBody Product product,@PathVariable int id)
    {
        return productrepository.findById(id)
                .map(product1 ->{
                    product1.setProductImages(product.getProductImages());
                    product1.setCategory(product.getCategory());
                    product1.setCreatedAt(product.getCreatedAt());
                    product1.setDescription(product.getDescription());
                    product1.setPrice(product.getPrice());
                    product1.setProductname(product.getProductname());
                    product1.setNumOfReviews(product.getNumOfReviews());
                    product1.setRatings(product.getRatings());
                    product1.setSeller(product.getSeller());
                    product1.setStock(product.getStock());
                }).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable int id)
    {
        if(!productrepository.existsById(id))
        {
            throw new ProductNotFoundException(id);

        }
        productrepository.deleteById(id);
        return  "Product with id "+id+" has been deleted success.";
    }

}
