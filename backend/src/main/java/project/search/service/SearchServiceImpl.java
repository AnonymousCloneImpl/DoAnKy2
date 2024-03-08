package project.search.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.models.Pagination;
import project.product.entity.Product;
import project.product.repository.ProductDetailRepository;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;
import project.product.service.ProducerService;
import project.product.ProductUtils;
import project.search.dto.RequestDto;
import project.search.specification.ProductSpecification;

@Service
public class SearchServiceImpl implements SearchService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private ProductDetailRepository productDetailRepo;
	@Autowired
	private StockRepository stockRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProductSpecification productSpecification;
	@Autowired
	private ProducerService producerService;


	@Override
	public Pagination getProductsByTypeWithPaging(RequestDto requestDto, Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}

		if (limit == null) {
			limit = 10;
		}

		Specification<Product> spec = productSpecification.specificationBuilder(requestDto);

		Pageable pageable = PageRequest.of(page - 1, limit);

		try {
			Page<Product> productList = productRepo.findAll(spec, pageable);

			Pagination pagination = ProductUtils
					.convertPageProductToPaginationObject(productList, modelMapper);

			ProductUtils.getConfigurationForDto(pagination.getProductSummaryDtoList(), productDetailRepo);

			pagination.setElementPerPage(productList.getNumberOfElements());

			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getProductsByTypeWithPaging function : " + e.getMessage());
			return new Pagination();
		}
	}
}
