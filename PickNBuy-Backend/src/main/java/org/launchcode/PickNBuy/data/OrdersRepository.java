package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders,Integer> {
    List<Orders> findByUserId(int userId);
    List<Orders> findByOrderStatus(String status);
}
