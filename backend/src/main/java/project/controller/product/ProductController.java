package project.controller.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.Pagination;
import project.dto.StaticDataProductPage;
import project.entity.product.Producer;
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
  ResponseEntity<Optional<Object>> getProductByTypeAndName(@PathVariable String type, @PathVariable String name) {

    Optional<Object> list = productService.getByProductTypeAndByName(type, name);

    return ResponseEntity.ok().body(list);
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
