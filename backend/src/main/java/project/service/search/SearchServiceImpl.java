package project.service.search;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.common.ProductSpecification;
import project.common.ProductUtils;
import project.dto.Pagination;
import project.dto.product.ProductSummaryDto;
import project.dto.search.RequestDto;
import project.entity.product.Product;
import project.service.product.ProductService;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {
	@Autowired
	private ProductService productService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProductSpecification productSpecification;
	@Autowired
	private ProductUtils productUtils;

	@Override
	public List<ProductSummaryDto> findByName(String name, Integer limit) {
		if (limit == null) {
			limit = Pagination.PAGE_SIZE;
		}
		List<Product> productList = productService.findAllByNameAndSortBySold(name, PageRequest.of(0, limit));
		if (!productList.isEmpty()) {
			List<ProductSummaryDto> productSummaryDtoList = productUtils
					.convertProductsToProductSummaryDtoList(productList);
			for (ProductSummaryDto p : productSummaryDtoList) {
				p.setImage(productUtils.getFirstImageUrl(p.getImage()));
			}
			return productSummaryDtoList;
		} else {
			System.err.println("Error in getByName findByName : productList is null");
			return null;
		}
	}

	@Override
	public Pagination findProductsByTypeWithPaging(RequestDto requestDto) {
		validateRequestData(requestDto);

		Specification<Product> spec = productSpecification.specificationBuilder(requestDto);
		Pageable pageable = PageRequest.of(requestDto.getPage() - 1, requestDto.getLimit());
		try {
			Page<Product> productList = productService.getAllBySpecification(spec, pageable);
			Pagination pagination = productUtils.convertPageProductToPaginationObject(productList);
//			productUtils.getConfigurationForDto(pagination.getProductSummaryDtoList());
			pagination.setElementPerPage(productList.getNumberOfElements());
			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getProductsByTypeWithPaging function : " + e.getMessage());
			return new Pagination();
		}
	}

	public void validateRequestData(RequestDto requestDto) {
		if (requestDto.getPage() == null) {
			requestDto.setPage(1);
		}

		if (requestDto.getLimit() == null) {
			requestDto.setLimit(15);
		}

		if (requestDto.getSortColumn() == null || requestDto.getSortColumn().isEmpty()) {
			requestDto.setSortColumn("sold");
		}
		if (requestDto.getSortDirection() == null || requestDto.getSortDirection().describeConstable().isEmpty()) {
			requestDto.setSortDirection(RequestDto.SORT_DIRECTION.ASC);
		}
	}
}
