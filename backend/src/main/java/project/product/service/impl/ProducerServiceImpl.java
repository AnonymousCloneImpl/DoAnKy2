package project.product.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Producer;
import project.product.entity.Product;
import project.product.repository.ProducerRepository;
import project.product.repository.ProductRepository;
import project.product.service.ProducerService;
import project.search.specification.ProductSpecification;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProducerServiceImpl implements ProducerService {
	@Autowired
	private ProducerRepository producerRepository;
	@Autowired
	private ProductSpecification productSpecification;
	@Autowired
	private ProductRepository productRepository;

	@Override
	public List<Producer> getAll() {
		return producerRepository.findAll();
	}

	@Override
	public List<Producer> findProducersByProductType(String type) {
		Specification<Product> spec = productSpecification.findByType(type);
		return productRepository.findAll(spec)
				.stream()
				.map(Product::getProducer)
				.distinct()
				.collect(Collectors.toList());
	}
}
