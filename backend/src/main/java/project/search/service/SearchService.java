package project.search.service;

import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductTest;

import java.util.List;

@Service
public interface SearchService {
    List<ProductTest> findOnHeader(String str);
}
