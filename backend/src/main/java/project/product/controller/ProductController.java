package project.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.models.Pagination;
import project.product.dto.ProductSummaryDto;
import project.product.dto.SearchDto;
import project.product.dto.StaticDataProductPage;
import project.product.entity.Producer;
import project.product.service.ProducerService;
import project.product.service.ProductDetailService;
import project.product.service.ProductService;

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
    @Autowired
    private ProductDetailService productDetailService;

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
                                            @Param(value = "limit") Integer limit,
                                            @Param(value = "producer") String producer,
                                            @Param(value = "minPrice") Integer minPrice,
                                            @Param(value = "maxPrice") Integer maxPrice,
                                            @Param(value = "cpu") String cpu) {
        if (page == null) {
            page = 1;
        }
        SearchDto searchDto = SearchDto.builder()
            .type(type)
            .producer(producer)
            .page(page)
            .limit(limit)
            .minPrice(minPrice)
            .maxPrice(maxPrice)
            .cpu(cpu)
            .build();
        Pagination pagination = productService.getProductsByTypeWithPaging(searchDto);
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

    @GetMapping("/staticData")
    public ResponseEntity<StaticDataProductPage> getStaticDataByType(@RequestParam String type, @Param(value = "limit") Integer limit) {
        if (limit == null) {
            limit = 5;
        }
        StaticDataProductPage data = productService.getStaticDataByType(type, limit);
        if (data != null) {
            return ResponseEntity.status(HttpStatus.OK).body(data);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/producer")
    public List<Producer> getProducerList() {
        return producerService.getAll();
    }

    @GetMapping("/producer/{type}")
    public List<Producer> getProducesByType(@PathVariable String type) {
        return producerService.findProducersByProductType(type);
    }
}
