package project.service.product.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.common.ProductSpecification;
import project.entity.product.Producer;
import project.entity.product.Product;
import project.repository.ProducerRepository;
import project.repository.ProductRepository;
import project.service.product.ProducerService;

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
