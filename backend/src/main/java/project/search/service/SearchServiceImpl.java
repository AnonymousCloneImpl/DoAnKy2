package project.search.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductTest;
import project.product.repository.ProductRepository;
import project.product.repository.ProductTestRepo;
import project.search.SearchSpecification;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private ProductTestRepo productRepository;
    @Override
    public List<ProductTest> findOnHeader(String str) {
        SearchSpecification<ProductTest> searchSpecification = new SearchSpecification<ProductTest>();
        Specification<ProductTest> spec = searchSpecification.searchProducts(str);
        return productRepository.findAll(spec);
    }
}
