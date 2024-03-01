package project.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.models.Pagination;
import project.product.entity.Producer;
import project.product.service.ProducerService;
import project.product.service.ProductService;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

	@Autowired
	private ProducerService producerService;

	@Deprecated
	@GetMapping("")
	public ResponseEntity<Pagination> getProductList(@Param(value = "page") Integer page) {
		if (page == null) {
			page = 1;
		}

        Pagination pagination = productService.getWithPaging(page);
        if (pagination != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                pagination
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/{type}")
    ResponseEntity<Object> getProductByType(@PathVariable String type, @Param(value = "page") Integer page) {
        if (page == null) {
            page = 1;
        }
        Pagination pagination = productService.getProductsByTypeWithPaging(type, page);
        if (pagination != null) {
            return ResponseEntity.ok().body(
                pagination
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/{type}/{name}")
    ResponseEntity<Optional<Object>> getProductByTypeAndName(@PathVariable String type, @PathVariable String name) {

        Optional<Object> list = productService.getByProductTypeAndByName(type, name);

        return ResponseEntity.ok().body(list);
    }

	@GetMapping("/search")
	ResponseEntity<List<ProductSummaryDto>> search(@RequestParam String name, @Param(value = "limit") Integer limit) {
		if (limit == null) {
			limit = 5;
		}
		List<ProductSummaryDto> productSummaryDtoList = productService.getByName(name, limit);
		if (productSummaryDtoList != null) {
			return ResponseEntity.status(HttpStatus.OK).body(productSummaryDtoList);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

    @GetMapping("/top-seller")
    public List<ProductSummaryDto> getListTopSeller(@RequestParam String type, @Param(value = "limit") Integer limit) {
        if (limit == null) {
            limit = 5;
        }
        return productService.getTopSellerByType(type, limit);
    }

	@GetMapping("/producer")
	public List<Producer> getProducerList() {
		return producerService.getAll();
	}
}
