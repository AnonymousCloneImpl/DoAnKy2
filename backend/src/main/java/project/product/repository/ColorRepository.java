package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.other_entity.Color;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
}
