package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.entity.product.Producer;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, Long> {
}
