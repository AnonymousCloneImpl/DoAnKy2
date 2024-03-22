package project.product.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductDetail;
import project.product.repository.ProductDetailRepository;
import project.product.service.ProductDetailService;

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
