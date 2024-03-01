package project.product.repository;

import org.springframework.data.domain.Page;
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

	@Query(nativeQuery = true,
			value = "SELECT p.*\n" +
					"FROM product p\n" +
					"JOIN product_detail pd ON p.id = pd.product_id\n" +
					"JOIN stock s ON pd.id = s.product_detail_id\n" +
					"WHERE p.type = 'mouse'\n" +
					"ORDER BY s.sold DESC\n" +
					"LIMIT 1")
	Product findMostPurchaseMouse();

	@Query(nativeQuery = true,
			value = "SELECT p.*\n" +
					"FROM product p\n" +
					"JOIN product_detail pd ON p.id = pd.product_id\n" +
					"JOIN stock s ON pd.id = s.product_detail_id\n" +
					"WHERE p.type = 'keyboard'\n" +
					"ORDER BY s.sold DESC\n" +
					"LIMIT 1")
	Product findMostPurchaseKeyboard();

	@Query(nativeQuery = true,
			value = "SELECT p.*\n" +
					"FROM product p\n" +
					"JOIN product_detail pd ON p.id = pd.product_id\n" +
					"JOIN stock s ON pd.id = s.product_detail_id\n" +
					"WHERE p.type = 'headphone'\n" +
					"ORDER BY s.sold DESC\n" +
					"LIMIT 1")
	Product findMostPurchaseHeadphone();

	@Query(nativeQuery = true,
			value = "SELECT * FROM product p JOIN ( SELECT product_id FROM stock s join product p2 on s.product_id = p2.id WHERE p2.type = :type ORDER BY s.sold desc LIMIT :limit ) s ON p.id = s.product_id WHERE p.type = :type")
	List<Product> getTopSellerByType(String type, Integer limit);
}
