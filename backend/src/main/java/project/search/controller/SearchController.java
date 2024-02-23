package project.search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common.ResponseObject;
import project.search.dto.ProductSearchDto;
import project.search.service.SearchService;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {
    
    @Autowired
    private SearchService searchService;
    
    @GetMapping("")
    public ResponseEntity<Object> searchOnHeader(@RequestParam(name = "keyword") String keyword) {
	List<ProductSearchDto> product = searchService.findOnHeader(keyword);
	return ResponseEntity.ok().body(
	    new ResponseObject("OK", "Successfully", product)
	);
    }
}
