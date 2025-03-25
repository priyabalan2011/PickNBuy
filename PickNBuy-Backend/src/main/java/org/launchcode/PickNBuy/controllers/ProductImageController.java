package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.data.ProductImagesRespository;
import org.launchcode.PickNBuy.models.ProductImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/productsimage")
@CrossOrigin(origins ="*")
public class ProductImageController {
    @Autowired
    private ProductImagesRespository productImagesRespository;

    @PostMapping("/addimages")
    public ProductImages addProductImages(@RequestBody ProductImages productImages)
    {
        return productImagesRespository.save(productImages);

    }
}
