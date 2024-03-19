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

	@Query("SELECT p FROM Product p " +
			"JOIN ProductDetail pd ON p.id = pd.product.id " +
			"JOIN Stock s ON pd.id = s.productDetail.id " +
			"WHERE p.type = :type " +
			"AND p.id <> :productId " +
			"ORDER BY s.quantity DESC")
	List<Product> findTopSimilarByType(@Param("type") String type, @Param("productId") Long productId, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.type LIKE :type")
	List<Product> getByProductType(@Param("type") String type, Pageable pageable);

	@Query(nativeQuery = true, value = "SELECT * FROM product p WHERE p.type LIKE :type AND p.name = :name")
	Product getByProductTypeAndByName(String type, String name);

	@Query(nativeQuery = true,
			value = "SELECT p.* FROM product p " +
					"JOIN product_detail pd ON p.id = pd.product_id " +
					"JOIN stock s ON pd.id = s.product_detail_id " +
					"WHERE p.type = :type " +
					"ORDER BY s.updated_time DESC, s.quantity DESC")
	List<Product> findMostPurchaseByType(@Param("type") String type, Pageable pageable);

	@Query(nativeQuery = true,
			value = "SELECT p.* FROM product p " +
					"JOIN (SELECT pd.product_id FROM stock s " +
					"JOIN product_detail pd ON s.product_detail_id = pd.id " +
					"JOIN product p2 ON pd.product_id = p2.id " +
					"WHERE p2.type = :type " +
					"ORDER BY s.sold DESC " +
					"LIMIT :limit ) " +
					"s ON p.id = s.product_id " +
					"WHERE p.type = :type")
	List<Product> getTopSellerByType(@Param("type") String type, @Param("limit") Integer limit);

	@Query(nativeQuery = true,
			value = "SELECT ld.ram FROM laptop_detail ld " +
					"JOIN stock s ON ld.id = s.id " +
					"JOIN product_detail pd ON s.product_detail_id = pd.id " +
					"JOIN product p ON pd.product_id = p.id " +
					"WHERE p.name = :name")
	List<String> getListConfiguration(String name);

	@Query("SELECT p FROM Product p WHERE p.type LIKE :type ORDER BY p.name")
	List<Product> getListPart(@Param("type") String type);

	@Query("select p from Product p join ProductDetail pd on p.id = pd.product.id join Stock s on s.productDetail.id = pd.id WHERE p.name LIKE CONCAT('%', :name, '%') order by s.sold desc")
	List<Product> findAllByNameSortBySold(@Param("name") String name, Pageable pageable);
}
