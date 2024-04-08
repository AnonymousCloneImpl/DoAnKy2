package project.controller.search;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.product.ProductSummaryDto;
import project.dto.search.RequestDto;
import project.service.search.SearchService;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "*")
public class SearchController {
  @Autowired
  private SearchService searchService;

  @GetMapping("")
  ResponseEntity<List<ProductSummaryDto>> search(@RequestParam String q, @Param(value = "limit") Integer limit) {
    if (limit == null) {
      limit = 5;
    }
    List<ProductSummaryDto> productSummaryDtoList = searchService.findByName(q, limit);
    return ResponseEntity.status(HttpStatus.OK).body(productSummaryDtoList);
  }

  @PostMapping("/searchByCondition")
  public Object getProductByType(@RequestBody RequestDto requestDto) {
    return searchService.findProductsByTypeWithPaging(requestDto);
  }
}
