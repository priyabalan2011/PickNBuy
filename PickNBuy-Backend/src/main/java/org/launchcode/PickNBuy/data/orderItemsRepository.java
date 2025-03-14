package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.orderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderItemsRepository extends JpaRepository<orderItems,Integer> {
}
