package project.search.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.repository.ProductRepository;
import project.search.SearchSpecification;
import project.search.dto.ProductSummaryDto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {
	@Autowired
	private ProductRepository productRepository;

	@Override
	public List<ProductSummaryDto> findOnHeader(String str) {
		SearchSpecification<Product> searchSpecification = new SearchSpecification<Product>();
		Specification<Product> spec = searchSpecification.searchProducts(str);

		List<ProductSummaryDto> productSearchDtos = new ArrayList<>();

		productRepository.findAll(spec).forEach((item) -> {
			ProductSummaryDto p = new ProductSummaryDto();
			p.setId(item.getId());
			p.setName(item.getName());
			p.setPrice(item.getPrice());
			p.setDiscountPercentage(item.getDiscountPercentage());
			p.setImage(item.getImage().split("\\|")[0]);
			p.setType(item.getType());
			productSearchDtos.add(p);
		});

		return productSearchDtos;
	}
}
