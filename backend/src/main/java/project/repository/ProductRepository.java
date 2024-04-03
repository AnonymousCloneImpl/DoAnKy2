package project.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.entity.product.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>, PagingAndSortingRepository<Product, Long> {
	Specification<Product> findByName(String name);

	@Query("SELECT p FROM Product p " +
			"JOIN Stock s ON p.id = s.product.id " +
			"WHERE p.type = :type " +
			"AND p.id <> :productId " +
			"ORDER BY s.quantity DESC")
	List<Product> findTopSimilarByType(@Param("type") String type, @Param("productId") Long productId, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.type LIKE :type")
	List<Product> getByProductType(@Param("type") String type, Pageable pageable);

	@Query(nativeQuery = true, value = "SELECT * FROM product p WHERE p.type LIKE :type AND p.name = :name")
	Product getByProductTypeAndByName(String type, String name);

	@Query("SELECT p FROM Product p JOIN Stock s ON p.id = s.product.id ORDER BY s.sold DESC")
	List<Product> getTopSellerByType(@Param("type") String type, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.type LIKE :type ORDER BY p.name")
	List<Product> getListPart(@Param("type") String type);

	@Query("select p from Product p join Stock s on p.id = s.product.id WHERE p.name LIKE CONCAT('%', :name, '%') order by s.sold desc")
	List<Product> findAllByNameSortBySold(@Param("name") String name, Pageable pageable);

	@Query("SELECT DISTINCT FUNCTION('JSON_EXTRACT', p.productDetails, '$.cpuType') AS cpuType FROM Product p")
	List<String> findConfigurationType();
}
