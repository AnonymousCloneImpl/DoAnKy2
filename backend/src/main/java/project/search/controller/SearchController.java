package project.search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.product.dto.ProductSummaryDto;
import project.search.dto.RequestDto;
import project.search.service.SearchService;

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
		if (productSummaryDtoList != null) {
			return ResponseEntity.status(HttpStatus.OK).body(productSummaryDtoList);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@PostMapping("/searchByCondition")
	public Object getProductByType(@RequestBody RequestDto requestDto,
	                               @Param(value = "page") Integer page,
	                               @Param(value = "limit") Integer limit
	) {

		return searchService.findProductsByTypeWithPaging(requestDto, page, limit);
	}
}
