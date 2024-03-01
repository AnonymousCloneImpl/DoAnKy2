package project.product.service;

import org.springframework.stereotype.Service;
import project.models.Pagination;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

    Pagination getWithPaging(Integer page);

    List<ProductSummaryDto> getProductByTypeWithLimit(String type, int limit);

    List<ProductSummaryDto> getTopSellerByType(String type, Integer limit);

    Pagination getProductsByTypeWithPaging(String type, Integer page);

    Optional<Object> getByProductTypeAndByName(String type, String name);

    List<ProductSummaryDto> getByName(String name, Integer limit);

}
