package project.product.service;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import project.product.dto.ProductDto;
import project.product.entity.Product;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {
	List<Product> getAll();

	List<ProductSummaryDto> getByProductType(String type, Long limit);

	Optional<ProductDto> getById(long id);

	List<Product> getByName(Specification<Product> spec, String name);

	boolean existById(long id);

	Specification<Product> nameLike(String name);

	void deleteById(long id);

	Product insert(ProductDto productDto);

	Product updateById(Long id, ProductDto productDto);
}
