package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import project.product.entity.Product;
import project.product.entity.ProductTest;

@Repository
public interface ProductTestRepo extends JpaRepository<ProductTest, Long>, JpaSpecificationExecutor<ProductTest> {
}
