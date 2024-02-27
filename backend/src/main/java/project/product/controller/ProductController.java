package project.product.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<Product>> getProductList() {
        return ResponseEntity.status(HttpStatus.OK).body(
            productService.getAll()
        );
    }

    @GetMapping("/{type}")
    ResponseEntity<List<ProductSummaryDto>> getProductByType(@PathVariable String type) {
        Long limit = 100L;
        List<ProductSummaryDto> list = productService.getByProductType(type, limit);

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{type}/{name}")
    ResponseEntity<Optional<Object>> getProductByTypeAndName(@PathVariable String type, @PathVariable String name) {

        Optional<Object> list = productService.getByProductTypeAndByName(type, name);

        return ResponseEntity.ok().body(list);
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

    @GetMapping("/header")
    public List<ProductSummaryDto> getProductList(@RequestParam String type, @RequestParam Long limit) {

        return productService.getByProductType(type, limit);
    }
}
