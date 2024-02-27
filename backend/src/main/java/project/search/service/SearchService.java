package project.search.service;

import org.springframework.stereotype.Service;
import project.search.dto.ProductSummaryDto;

import java.util.List;

@Service
public interface SearchService {
    List<ProductSummaryDto> findOnHeader(String str);
}
