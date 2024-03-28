package project.service.product.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.entity.product.ProductDetail;
import project.repository.ProductDetailRepository;
import project.service.product.ProductDetailService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
	@Autowired
	private ProductDetailRepository productDetailRepository;


	@Override
	public ProductDetail getByProductId(Long id) {
		return productDetailRepository.findByProductId(id);
	}

	@Override
	public List<String> getCpuList() {
		return productDetailRepository.getCpuList();
	}

	@Override
	public List<String> getRamList() {
		return productDetailRepository.getRamList().stream()
				.map(item -> item.split(" ")[0])
				.distinct()
				.collect(Collectors.toList());
	}

	@Override
	public List<ProductDetail> findAll(Specification<ProductDetail> byProductType) {
		return productDetailRepository.findAll();
	}
}
