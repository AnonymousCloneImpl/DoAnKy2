package project.service.product;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.entity.product.ProductDetail;

import java.util.List;

@Service
public interface ProductDetailService {
	ProductDetail getByProductId(Long id);

	List<String> getCpuList();

	List<String> getRamList();

	List<ProductDetail> findAll(Specification<ProductDetail> byProductType);
}
