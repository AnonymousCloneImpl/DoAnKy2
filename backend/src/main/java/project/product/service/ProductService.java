package project.product.service;

import org.springframework.stereotype.Service;
import project.models.Pagination;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {
	Pagination getWithPaging(Integer page, Integer limit);

	List<ProductSummaryDto> getTopSellerByType(String type, Integer limit);

	Pagination getProductsByTypeWithPaging(String type, Integer page, Integer limit);

	Optional<Object> getByProductTypeAndByName(String type, String name);

	List<ProductSummaryDto> getByName(String name, Integer limit);

}
