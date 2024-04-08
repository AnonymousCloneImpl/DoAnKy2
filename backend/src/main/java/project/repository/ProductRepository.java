package project.repository;

import org.springframework.data.domain.Pageable;
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
  @Query("SELECT p FROM Product p " +
    "JOIN Stock s ON p.id = s.product.id " +
    "WHERE p.type = :type " +
    "AND p.id <> :productId " +
    "ORDER BY s.quantity DESC")
  List<Product> findTopSimilarByType(@Param("type") String type, @Param("productId") Long productId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT * FROM product p WHERE p.type LIKE :type AND p.name = :name")
  Product getByProductTypeAndByName(String type, String name);

  @Query(nativeQuery = true,
    value = "SELECT p.* FROM product p " +
      "JOIN stock s ON p.id = s.product_id " +
      "WHERE p.type LIKE :type " +
      "ORDER BY s.updated_time DESC, s.quantity DESC " +
      "LIMIT 1")
  Product findMostPurchaseByType(@Param("type") String type);

  @Query("SELECT p FROM Product p JOIN Stock s ON p.id = s.product.id WHERE p.type = :type ORDER BY s.sold DESC")
  List<Product> getTopSellerByType(@Param("type") String type, Pageable pageable);

  @Query("SELECT p FROM Product p WHERE p.type = :type ORDER BY p.name")
  List<Product> getListPart(@Param("type") String type);

  @Query("select p from Product p join Stock s on p.id = s.product.id WHERE p.name LIKE CONCAT('%', :name, '%') order by s.sold desc")
  List<Product> findAllByNameSortBySold(@Param("name") String name, Pageable pageable);

  @Query("select p.details from Product p where p.name = :name")
  List<String> getProductDetailsByName(@Param("name") String name);

  @Query("SELECT DISTINCT FUNCTION('JSON_EXTRACT', p.details, CONCAT('$.', :configuration)) AS cpuType FROM Product p")
  List<String> findConfigurationType(@Param("configuration") String configuration);
}
