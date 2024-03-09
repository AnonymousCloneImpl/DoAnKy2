package project.search.service;

import project.product.dto.ProductSummaryDto;
import project.product.models.Pagination;
import project.search.dto.RequestDto;

import java.util.List;

public interface SearchService {
	List<ProductSummaryDto> getByName(String name, Integer limit);

	Pagination getProductsByTypeWithPaging(RequestDto requestDto, Integer page, Integer limit);
}
