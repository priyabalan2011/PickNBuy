package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.data.ProductImagesRespository;
import org.launchcode.PickNBuy.data.ProductRepository;
import org.launchcode.PickNBuy.exception.ProductNotFoundException;
import org.launchcode.PickNBuy.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins ="*")
public class productController {

    @Autowired
    private ProductRepository productrepository;

    @Autowired
    private ProductImagesRespository productImagesRespository;

    @Value("${backend.base-url}")
    private String baseUrl;

    @Value("${app.upload-dir}")
    private String uploaddir;

    //list all the products.
    //GET http://localhost:8080/products/
    @GetMapping("/all")
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
    public ResponseEntity<?> updateProduct(
            @PathVariable int id,
            @ModelAttribute ProductUpdateDTO updatedProduct,
            @RequestPart(required = false) MultipartFile[] files ) throws IOException {

        Optional<Product> optionalProduct = productrepository.findById(id);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Product not found"));
        }

        Product existingProduct = optionalProduct.get();


        // Handle images
        List<ProductImages> images = new ArrayList<>();

        // If the user cleared images
        if (Boolean.TRUE.equals(updatedProduct.getImagesCleared())) {
            existingProduct.getProductImages().clear();
        }else{
          //  images.addAll(existingProduct.getProductImages());
        }

        // Add new images
        if (files != null  && files.length > 0) {

            //String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            // Set base directory inside project root
            String uploadDir = new File("uploads/product").getAbsolutePath();
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs(); // Ensure folder exists
            }

            for (MultipartFile file : files) {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); // prevent name collisions
                File dest = new File(dir, fileName); // safer file creation
                file.transferTo(dest); // save file to disk

                String imageUrl = baseUrl + "/uploads/product/" + fileName;

                ProductImages img = new ProductImages();
                img.setImages(imageUrl);// or save the path if you're storing on disk
                img.setProduct(existingProduct);
                existingProduct.getProductImages().add(img);
                images.add(img);
            }
        }
       // existingProduct.getProductImages().clear(); // ✅ clear old
        if (images != null && !images.isEmpty()) {
            for (ProductImages img : images) {
                img.setProduct(existingProduct);
                existingProduct.getProductImages().add(img); // ✅ add new
            }
        }
        // Update fields
        existingProduct.setProductname(updatedProduct.getProductname());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setSeller(updatedProduct.getSeller());
        existingProduct.setStock(updatedProduct.getStock());
       // existingProduct.setProductImages(images);
        Product savedProduct = productrepository.save(existingProduct);
        return ResponseEntity.ok(Map.of("success", true, "product", savedProduct));
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
    //GET http://localhost:8080/products?name=laptop
    //GET http://localhost:8080/products?category=electronics
    //GET http://localhost:8080/products?minPrice=500&maxPrice=1000
    @GetMapping("")
    public  ResponseEntity<ProductResponseDTO> searchProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String ratings)
    {
        Page<Product> products;
        // Ensure the page is at least 1 to prevent negative indexes
        int adjustedPage = (page > 0) ? page - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPage, size);
        //Pageable pageable = PageRequest.of(page, size);

        products = productrepository.findByFilters(keyword, category,minPrice,maxPrice,ratings,pageable);

        ProductResponseDTO response = new ProductResponseDTO(
                products.getContent(),
                products.getTotalElements(),
                size);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/addimages")
    public ProductImages addProductImages(@RequestBody ProductImages productImages)
    {
        return productImagesRespository.save(productImages);

    }

    @PostMapping(value = "/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> createProduct(
            @RequestParam("productname") String productname,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("category") Category category,
            @RequestParam("seller") String seller,
            @RequestParam("stock") int stock,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) throws IOException {

        Product product = new Product();
        product.setProductname(productname);
        product.setPrice(price);
        product.setDescription(description);
       // product.setRatings(ratings);

        product.setCategory(category);
        product.setSeller(seller);
        product.setStock(stock);
      //  product.setNumOfReviews(numOfReviews);
        product.setCreatedAt(LocalDateTime.now());

        List<ProductImages> imageList = new ArrayList<>();
        System.out.println("before");
        // Set base directory inside project root
        String uploadDir = new File("uploads/product").getAbsolutePath();
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs(); // create directory if not exists

        if (files != null && !files.isEmpty()) {
            System.out.println("Total files received: " + files.size());
            for (MultipartFile file : files) {
                System.out.println("File: " + file.getOriginalFilename());
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); // prevent name collisions
                File dest = new File(dir, fileName); // safer file creation
                file.transferTo(dest); // save file to disk

                ProductImages image = new ProductImages();
                image.setImages("/uploads/product/" + fileName);
                image.setProduct(product);
                imageList.add(image);
            }
        }

        product.setProductImages(imageList);

        // Save the product (cascade saves images)
        productrepository.save(product);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "product", product
        ));
    }



}