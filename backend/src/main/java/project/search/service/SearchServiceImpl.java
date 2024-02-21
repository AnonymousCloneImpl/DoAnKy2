package project.search.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.repository.ProductRepository;
import project.search.SearchSpecification;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> findOnHeader(String str) {
        SearchSpecification<Product> searchSpecification = new SearchSpecification<Product>();
        Specification<Product> spec = searchSpecification.searchProducts(str);
        return productRepository.findAll(spec);
    }
}
