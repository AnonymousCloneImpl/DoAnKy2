package project.search.service;

import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.search.entity.ProductSearchDto;

import java.util.List;

@Service
public interface SearchService {
    List<ProductSearchDto> findOnHeader(String str);
}
