package project.search.service;

import project.product.models.Pagination;
import project.search.dto.RequestDto;

public interface SearchService {
    Pagination getProductsByTypeWithPaging(RequestDto requestDto, Integer page, Integer limit);
}
