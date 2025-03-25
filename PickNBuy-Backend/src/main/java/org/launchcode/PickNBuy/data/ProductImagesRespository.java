package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImagesRespository extends JpaRepository<ProductImages,Integer> {
    
    
}

