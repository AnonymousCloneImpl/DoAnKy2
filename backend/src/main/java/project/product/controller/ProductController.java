package project.product.controller;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common.ResponseObject;
import project.product.dto.ProductDto;
import project.product.entity.Product;
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
	private ModelMapper modelMapper;

	@GetMapping("")
	public List<Product> getProductList() {
		return productService.getAll();
	}

	@GetMapping("/{id}")
	ResponseEntity<Object> getById(@PathVariable Long id) {
		Optional<ProductDto> product = productService.getById(id);
		if (product.isPresent()) {
			return ResponseEntity.ok().body(product);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				new ResponseObject("Failed", "Can't find product with id = " + id, "")
		);
	}

	@PostMapping("/insert")
	ResponseEntity<ResponseObject> insert(@RequestBody ProductDto productDto) {
		List<Product> products = productService.getByName(productService.nameLike(productDto.getName()), productDto.getName());
		if (!products.isEmpty()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(
					new ResponseObject("Failed", "Product name already exist", "")
			);
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("Ok", "Insert new product successfully", productService.insert(productDto))
		);
	}

	@PutMapping("/{id}")
	ResponseEntity<ResponseObject> updateById(@PathVariable Long id, @RequestBody ProductDto productDto) {
		boolean exist = productService.existById(id);
		if (!exist) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
					new ResponseObject("Failed", "Can't find product with id = " + id, "")
			);
		}

		Product updatedProduct = productService.updateById(id, productDto);
		return ResponseEntity.status(HttpStatus.OK).body(
				new ResponseObject("Ok", "Product information updated successfully",
						modelMapper.map(updatedProduct, ProductDto.class))
		);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<ResponseObject> delete(@PathVariable Long id) {
		if (productService.existById(id)) {
			productService.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(
					new ResponseObject("Ok", "Delete product successfully", "")
			);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				new ResponseObject("Failed", "Can't find product with id = " + id, "")
		);
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

	@GetMapping("/type")
	public List<ProductSummaryDto> getProductList(@RequestParam String type, @RequestParam Long limit) {
		long a = System.currentTimeMillis();
		List<ProductSummaryDto> list = productService.getByProductType(type, limit);
		System.out.println(a - System.currentTimeMillis());
		return list;
	}
}
