package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.product.entity.Producer;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, Long> {
}
