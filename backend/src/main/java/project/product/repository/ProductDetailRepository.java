package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.product.entity.Product;
import project.product.entity.ProductDetail;

import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
	ProductDetail findByProductId(Long id);
}
