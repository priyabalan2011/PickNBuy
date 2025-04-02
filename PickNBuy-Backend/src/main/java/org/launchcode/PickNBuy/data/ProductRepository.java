package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.Category;
import org.launchcode.PickNBuy.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
   // List<Product> findAll(Pageable pageable);
    // Search by name (case insensitive)
   Page<Product> findByProductnameContaining(String keyword, Pageable pageable);
    Page<Product> findByCategory(String category, Pageable pageable);
    Page<Product> findByProductnameContainingAndCategory(String keyword, String category, Pageable pageable);


  // Page<Product> findByProductnameContainingIgnoreCase(String name, Pageable pageable);
 //   Page<Product> findByCategory(Category category,Pageable pageable);
    Page<Product> findBySellerContainingIgnoreCase(String seller,Pageable pageable);
    // Search by price range
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    Page<Product> findByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);
}
