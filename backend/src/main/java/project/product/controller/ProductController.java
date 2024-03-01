package project.product.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common.ResponseObject;
import project.models.Pagination;
import project.product.dto.ProductDto;
import project.product.entity.Product;
import project.product.service.ProductService;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

	@Autowired
	private ProductService productService;
	@Autowired
	private ModelMapper modelMapper;

	@Deprecated
	@GetMapping("")
	public ResponseEntity<Pagination> getProductList(@Param(value = "page") Long page) {
		if (page == null) {
			Pagination pagination = new Pagination();
			pagination.setProductSummaryDtoList(productService.getAll());
			return ResponseEntity.status(HttpStatus.OK).body(
					pagination
			);
		}
		Pagination pagination = productService.getWithPaging(page);
		return ResponseEntity.status(HttpStatus.OK).body(
				pagination
		);
	}

	@GetMapping("/{type}")
	ResponseEntity<Object> getProductByType(@PathVariable String type, @Param(value = "page") Integer page) {
		return ResponseEntity.ok().body(
				productService.getByProductTypeWithPaging(type, Objects.requireNonNullElse(page, 1))
		);
	}

	@GetMapping("/{type}/{name}")
	ResponseEntity<Optional<Object>> getProductByTypeAndName(@PathVariable String type, @PathVariable String name) {

		Optional<Object> list = productService.getByProductTypeAndByName(type, name);

		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/search")
	ResponseEntity<ResponseObject> search(@RequestParam("name") String value) {
		List<Product> productList = productService.getByName(productService.nameLike(value), value);
		if (!productList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("OK", "Get product successfully", productList)
			);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				new ResponseObject("Failed", "Can't find product with name = " + value, "")
		);
	}

	@GetMapping("/header")
	public List<ProductSummaryDto> getProductList(@RequestParam String type, @Param(value = "limit") Integer limit) {
		if (limit == null) {
			limit = 10;
		}
		return productService.getProductByTypeWithLimit(type, limit);
	}

	@GetMapping("/top-seller")
	public List<ProductSummaryDto> getListTopSeller(@RequestParam String type, @Param(value = "limit") Integer limit) {
		if (limit == null) {
			limit = 5;
		}
		System.out.println(type);
		System.out.println(limit);
		return productService.getTopSellerByType(type, limit);
	}

	@GetMapping("/producer")
	public List<String> getProducerList() {
//		return productService.getProducerList();
		return null;
	}
}
