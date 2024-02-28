package project.product.service;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.models.Pagination;
import project.product.dto.ProductDto;
import project.product.entity.Product;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

	List<ProductSummaryDto> getAll();

	Pagination getWithPaging(Long page);

	List<ProductSummaryDto> getProductByTypeWithLimit(String type, int limit);

	List<ProductSummaryDto> getByProductTypeWithoutPaging(String type);

	Pagination getByProductTypeWithPaging(String type, Integer page);

	Optional<Object> getByProductTypeAndByName(String type, String name);

	Optional<Product> getById(long id);

	List<Product> getByName(Specification<Product> spec, String name);

	boolean existById(long id);

	Specification<Product> nameLike(String name);

	void deleteById(long id);

	Product insert(ProductDto productDto);

	Product updateById(Long id, ProductDto productDto);
}
