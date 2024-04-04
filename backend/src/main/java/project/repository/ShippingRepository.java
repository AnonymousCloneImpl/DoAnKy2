package project.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.entity.order.ShippingMethod;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<ShippingMethod, Long> {
    @Query("SELECT s FROM ShippingMethod s WHERE s.name LIKE %:name%")
    ShippingMethod findByName(@Param("name") String name);
}
