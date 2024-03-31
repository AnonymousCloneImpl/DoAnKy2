package project.service.search;

import project.dto.Pagination;
import project.dto.product.ProductSummaryDto;
import project.dto.search.RequestDto;

import java.util.List;

public interface SearchService {
	List<ProductSummaryDto> findByName(String name, Integer limit);

	Pagination findProductsByTypeWithPaging(RequestDto requestDto);
}
