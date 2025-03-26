package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.Category;
import org.launchcode.PickNBuy.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    // Search by name (case insensitive)
    List<Product> findByProductnameContainingIgnoreCase(String name);
    List<Product> findByCategory(Category category);
    List<Product> findBySellerContainingIgnoreCase(String seller);
    // Search by price range
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);
}
