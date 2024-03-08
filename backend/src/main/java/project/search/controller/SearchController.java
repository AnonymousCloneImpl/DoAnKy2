package project.search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.product.models.Pagination;
import project.product.service.ProductService;
import project.search.dto.RequestDto;
import project.search.service.SearchService;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:3000/")
public class SearchController {
	@Autowired
	private ProductService productService;
	@Autowired
	private SearchService searchService;

	@PostMapping("/searchByCondition")
	public ResponseEntity<Object> getProductByType(@RequestBody RequestDto requestDto,
	                                               @Param(value = "page") Integer page,
	                                               @Param(value = "limit") Integer limit
	) {

		Pagination pagination = searchService.getProductsByTypeWithPaging(requestDto, page, limit);
		if (pagination != null) {
			return ResponseEntity.ok().body(
					pagination
			);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Pagination());
	}
}
