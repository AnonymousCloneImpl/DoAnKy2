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
			value = "SELECT * FROM product p JOIN ( SELECT product_id FROM stock s join product p2 on s.product_id = p2.id WHERE p2.type = :type ORDER BY s.sold desc LIMIT :limit ) s ON p.id = s.product_id WHERE p.type = :type")
	List<Product> getTopSellerByType(String type, Integer limit);

	@Query(nativeQuery = true,
		value = "select ld.ram from laptop_detail ld\n" +
			"where ld.id = (select s.id from stock s where product_detail_id = (select pd.id from product_detail pd\n" +
			"where pd.product_id = (select p.id from product p where p.name = \"Laptop Dell Vostro 3520 Y4G15\")))")
	List<String> getListConfiguration(String name);
}
