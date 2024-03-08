package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.product.entity.ProductDetail;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long>, JpaSpecificationExecutor<ProductDetail> {
	ProductDetail findByProductId(Long id);

	@Query(nativeQuery = true, value = "select distinct ld.cpu_type FROM product_detail pd join laptop_detail ld on pd.id = ld.id ")
	List<String> getCpuList();

	@Query(nativeQuery = true, value = "select distinct ld.ram FROM product_detail pd join laptop_detail ld on pd.id = ld.id ")
	List<String> getRamList();

	@Query("SELECT pd FROM ProductDetail pd JOIN PCPartDetail pc ON pd.id = pc.id WHERE pd.product.id = :productId")
	ProductDetail findPartDetailByProductId(@Param("productId") Long productId);
}
