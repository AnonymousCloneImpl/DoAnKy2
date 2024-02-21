package project.product.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common.ResponseObject;
import project.product.entity.Product;
import project.product.entity.ProductTest;
import project.product.service.ProductService;
import project.product.service.ProductTestService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductTestController {
    @Autowired
    private ProductTestService productService;

    @GetMapping("")
    public List<ProductTest> getProductList() {
        return productService.getAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        Optional<ProductTest> product = productService.getById(id);
        if (product.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Query product successfully", product)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("Failed", "Can't find product with id = " + id, "")
        );
    }
}
