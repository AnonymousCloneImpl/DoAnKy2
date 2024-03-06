package project.product.service;

import org.springframework.stereotype.Service;
import project.product.models.Pagination;
import project.product.dto.ProductSummaryDto;
import project.product.dto.SearchDto;
import project.product.dto.StaticDataProductPage;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {
    Pagination getWithPaging(Integer page, Integer limit);

    StaticDataProductPage getStaticDataByType(String type, Integer limit);

    Pagination getProductsByTypeWithPaging(SearchDto searchDto);

    Optional<Object> getByProductTypeAndByName(String type, String name);

    List<ProductSummaryDto> getByName(String name, Integer limit);


}
