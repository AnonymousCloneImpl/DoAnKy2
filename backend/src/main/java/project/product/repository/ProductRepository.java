package project.product.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.product.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>, PagingAndSortingRepository<Product, Long> {
	Specification<Product> findByName(String name);

	@Query("SELECT p FROM Product p WHERE p.type = :type AND p.id <> :productId")
	List<Product> findTopSimilarByType(@Param("type") String type, @Param("productId") Long productId, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.type LIKE :type")
	List<Product> getByProductType(@Param("type") String type, Pageable pageable);

	@Query(nativeQuery = true, value = "SELECT * FROM product p WHERE p.type LIKE :type AND p.name = :name")
	Product getByProductTypeAndByName(String type, String name);

	@Query("SELECT p FROM Product p JOIN ProductDetail pd ON p.id = pd.product.id JOIN Stock s ON pd.id = s.productDetail.id WHERE p.type = :type ORDER BY s.sold DESC")
	List<Product> findMostPurchaseByType(@Param("type") String type, Pageable pageable);

	@Query(nativeQuery = true,
			value = "SELECT p.* FROM product p\n" +
					"JOIN (" +
					"    SELECT pd.product_id\n" +
					"    FROM stock s\n" +
					"    JOIN product_detail pd ON s.product_detail_id = pd.id\n" +
					"    JOIN product p2 ON pd.product_id = p2.id\n" +
					"    WHERE p2.type = :type" +
					"    ORDER BY s.sold DESC\n" +
					"    LIMIT :limit\n" +
					") s ON p.id = s.product_id\n" +
					"WHERE p.type = :type;")
	List<Product> getTopSellerByType(String type, Integer limit);

	@Query(nativeQuery = true,
			value = "SELECT ld.ram FROM laptop_detail ld JOIN stock s ON ld.id = s.id JOIN product_detail pd ON s.product_detail_id = pd.id JOIN product p ON pd.product_id = p.id WHERE p.name = :name")
	List<String> getListConfiguration(String name);
}
