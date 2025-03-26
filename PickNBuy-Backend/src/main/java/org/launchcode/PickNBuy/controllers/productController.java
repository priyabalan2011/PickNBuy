package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.data.ProductImagesRespository;
import org.launchcode.PickNBuy.data.ProductRepository;
import org.launchcode.PickNBuy.exception.ProductNotFoundException;
import org.launchcode.PickNBuy.models.Category;
import org.launchcode.PickNBuy.models.Product;
import org.launchcode.PickNBuy.models.ProductImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins ="*")
public class productController {

    @Autowired
    private ProductRepository productrepository;

    @Autowired
    private ProductImagesRespository productImagesRespository;

    //list all the products.
    //GET http://localhost:8080/products/
    @GetMapping("/")
    List<Product> getAllProducts()
    {
        return productrepository.findAll();
    }

    //Add new products.
    //POST http://localhost:8080/products/newproducts
    //within body we have to list the new products in postman.
    @PostMapping("/newproducts")
    public Product addProducts(@RequestBody Product product)
    {
        for (ProductImages image : product.getProductImages()) {
            image.setProduct(product);
        }
        return productrepository.save(product);
    }

    //Get the requested product based on id;
    //GET http://localhost:8080/products/100
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id)
    {

        return productrepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }


    //update the product based on the product id.
    //PUT http://localhost:8080/products/100
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
        Optional<Product> optionalProduct = productrepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();

            // Update fields
            existingProduct.setProductname(updatedProduct.getProductname());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setRatings(updatedProduct.getRatings());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setSeller(updatedProduct.getSeller());
            existingProduct.setStock(updatedProduct.getStock());
            existingProduct.setNumOfReviews(updatedProduct.getNumOfReviews());

            // Handle product images update
            existingProduct.getProductImages().clear();
            for (ProductImages image : updatedProduct.getProductImages()) {
                image.setProduct(existingProduct);
                existingProduct.getProductImages().add(image);
            }

             productrepository.save(existingProduct);
        }
        return productrepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    //Delete the product based on ID.
    // DEL http://localhost:8080/products/100
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable int id) {
        Optional<Product> optionalProduct = productrepository.findById(id);

        if (optionalProduct.isPresent()) {
            productrepository.deleteById(id);
            return "Product deleted successfully.";
        } else {
            return "Product not found.";
        }
    }


    // Search by name
    //GET http://localhost:8080/products/search?name=laptop
    //GET http://localhost:8080/products/search?category=electronics
    //GET http://localhost:8080/products/search?minPrice=500&maxPrice=1000
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String seller)
    {
        List<Product> products;

        if (name != null) {
            products = productrepository.findByProductnameContainingIgnoreCase(name);
        } else if (category != null) {
            products = productrepository.findByCategory(Category.valueOf(category.toUpperCase()));
        } else if (seller != null) {
            products = productrepository.findBySellerContainingIgnoreCase(seller);
        } else if (minPrice != null && maxPrice != null) {
           products = productrepository.findByPriceRange(minPrice, maxPrice);
        } else {
            products = productrepository.findAll();
        }

        return ResponseEntity.ok(products); // Return empty list if no filters are provided
    }

    @PostMapping("/addimages")
    public ProductImages addProductImages(@RequestBody ProductImages productImages)
    {
        return productImagesRespository.save(productImages);

    }




}