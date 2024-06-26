package project.controller.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.entity.product.Producer;
import project.model.Pagination;
import project.model.product.StaticDataProductPage;
import project.service.product.ProducerService;
import project.service.product.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private ProducerService producerService;

	@Deprecated
	@GetMapping("")
	public ResponseEntity<Pagination> getProductList(@Param(value = "page") Integer page, @Param(value = "limit") Integer limit) {
		if (page == null) {
			page = 1;
		}

		Pagination pagination = productService.getWithPaging(page, limit);
		if (pagination != null) {
			return ResponseEntity.status(HttpStatus.OK).body(
					pagination
			);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@GetMapping("/{type}")
	ResponseEntity<Object> getProductByType(@PathVariable String type,
	                                        @Param(value = "page") Integer page,
	                                        @Param(value = "limit") Integer limit) {
		Pagination pagination = productService.getProductsByTypeWithPaging(type, page, limit);
		if (pagination != null) {
			return ResponseEntity.ok().body(
					pagination
			);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@GetMapping("/{type}/{name}")
	ResponseEntity<Optional<Object>> getProductByTypeAndName(@PathVariable String type, @PathVariable String name, @RequestParam String model) {
		Optional<Object> product = productService.getByProductNameAndModel(type, name, model);

		return ResponseEntity.ok().body(product);
	}

	@GetMapping("/staticData")
	public StaticDataProductPage getStaticDataByType(@RequestParam String type, @Param(value = "limit") Integer limit) {
		if (limit == null) {
			limit = 5;
		}
		return productService.getStaticDataByType(type, limit);
	}

	@GetMapping("/producer/{type}")
	public List<Producer> getProducesByType(@PathVariable String type) {
		return producerService.findProducersByProductType(type);
	}
}
