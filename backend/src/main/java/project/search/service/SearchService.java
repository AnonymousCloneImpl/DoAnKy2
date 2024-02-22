package project.search.service;

import org.springframework.stereotype.Service;
import project.search.dto.ProductSearchDto;

import java.util.List;

@Service
public interface SearchService {
    List<ProductSearchDto> findOnHeader(String str);
}
