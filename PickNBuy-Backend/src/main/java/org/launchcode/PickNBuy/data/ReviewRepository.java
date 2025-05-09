package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Reviews, Integer> {
    List<Reviews> findByProductId(int productId);
    Optional<Reviews> findByProductIdAndUserId(int productId, int userId);

}
