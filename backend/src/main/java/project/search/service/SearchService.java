package project.search.service;

import org.springframework.stereotype.Service;
import project.product.entity.Product;

import java.util.List;

@Service
public interface SearchService {
    List<Product> findOnHeader(String str);
}
