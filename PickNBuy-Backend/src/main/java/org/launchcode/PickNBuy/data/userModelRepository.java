package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.userModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userModelRepository extends JpaRepository<userModel, Integer> {
    userModel findByEmail(String email);
}
