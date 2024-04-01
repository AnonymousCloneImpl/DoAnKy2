package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.entity.order.ShippingMethod;

@Repository
public interface ShippingRepository extends JpaRepository<ShippingMethod, Long> {
}
