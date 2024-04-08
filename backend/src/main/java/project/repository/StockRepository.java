package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.entity.product.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
  @Query("SELECT s FROM Stock s WHERE s.product.id = :id")
  Stock findByProductId(@Param("id") long id);
}
