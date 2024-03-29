package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.entity.payment.ShippingMethod;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<ShippingMethod, Long> {
}
