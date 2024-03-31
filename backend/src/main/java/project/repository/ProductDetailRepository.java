package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.entity.product.ProductDetail;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long>, JpaSpecificationExecutor<ProductDetail> {
	@Query("select pd from ProductDetail pd " +
			"join Product p on pd.product.id = p.id " +
			"where p.id = :productId")
	ProductDetail findByProductId(@Param("productId") Long id);

	@Query(nativeQuery = true, value = "select distinct ld.cpu_type FROM laptop_detail ld")
	List<String> getCpuList();

	@Query(nativeQuery = true, value = "select distinct ld.ram FROM laptop_detail ld")
	List<String> getRamList();

	@Query(nativeQuery = true, value = "select distinct ld.screen_size FROM laptop_detail ld")
	List<String> getDisplayList();

	@Query(nativeQuery = true, value = "select distinct m.connection_type FROM mouse_detail m")
	List<String> getConnectionListOfMouse();

	@Query("SELECT pd FROM ProductDetail pd JOIN PCPartDetail pc ON pd.id = pc.id WHERE pd.product.id = :productId")
	ProductDetail findPartDetailByProductId(@Param("productId") Long productId);
}
