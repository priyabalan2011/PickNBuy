package org.launchcode.PickNBuy.data;

import org.launchcode.PickNBuy.models.userModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userModelRespository extends JpaRepository<userModel, Integer> {
}
