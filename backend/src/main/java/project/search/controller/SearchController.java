package project.search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.common.ResponseObject;
import project.product.entity.Product;
import project.product.entity.ProductTest;
import project.search.service.SearchService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("")
    public ResponseEntity<Object> searchOnHeader(@RequestParam(name = "keyword") String keyword) {
        List<ProductTest> product = searchService.findOnHeader(keyword);
        return ResponseEntity.ok().body(
                new ResponseObject("OK", "Successfully", product)
        );
    }
}
