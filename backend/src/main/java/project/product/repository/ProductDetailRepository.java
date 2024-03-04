package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.product.entity.ProductDetail;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
	ProductDetail findByProductId(Long id);

	@Query("SELECT pd FROM ProductDetail pd LEFT JOIN LaptopDetail ld ON pd.id = ld.id WHERE pd.product.id = :productId")
	ProductDetail findAllDetailByProductId(@Param("productId") Long productId);
}
