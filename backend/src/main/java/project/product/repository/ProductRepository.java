package project.product.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.product.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
	Specification<Product> findByName(String name);

	@Query("SELECT p FROM Product p WHERE p.type = :type AND p.id <> :productId")
	List<Product> findTop10SimilarByType(@Param("type") String type, @Param("productId") Long productId, Pageable pageable);

	@Query(nativeQuery = true, value = "SELECT * FROM product p WHERE p.type LIKE :type LIMIT :limit")
	List<Product> getByProductType(String type, Long limit);

	@Query(nativeQuery = true, value = "SELECT * FROM product p WHERE p.type LIKE :type AND p.name = :name")
	Product getByProductTypeAndByName(String type, String name);

	@Query("SELECT p FROM Product p JOIN Stock s ON p.id = s.product.id WHERE p.type = 'mouse' ORDER BY s.sold desc LIMIT 1")
	Product findMostPurchaseMouse();

	@Query("SELECT p FROM Product p JOIN Stock s ON p.id = s.product.id WHERE p.type = 'keyboard' ORDER BY s.sold desc LIMIT 1")
	Product findMostPurchaseKeyboard();

	@Query("SELECT p FROM Product p JOIN Stock s ON p.id = s.product.id WHERE p.type = 'headphone' ORDER BY s.sold desc LIMIT 1")
	Product findMostPurchaseHeadphone();
}
