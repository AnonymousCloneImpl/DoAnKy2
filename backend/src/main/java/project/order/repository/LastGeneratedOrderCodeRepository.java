package project.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.order.entity.LastGeneratedOrderCode;

public interface LastGeneratedOrderCodeRepository extends JpaRepository<LastGeneratedOrderCode, Long> {
}
