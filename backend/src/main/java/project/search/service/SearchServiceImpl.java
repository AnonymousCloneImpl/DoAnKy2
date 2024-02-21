package project.search.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.repository.ProductRepository;
import project.search.SearchSpecification;
import project.search.entity.ProductSearchDto;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductSearchDto> findOnHeader(String str) {
        SearchSpecification<Product> searchSpecification = new SearchSpecification<Product>();
        Specification<Product> spec = searchSpecification.searchProducts(str);

        List<ProductSearchDto> productSearchDtos = new ArrayList<>();

        productRepository.findAll(spec).forEach((item) -> {
            ProductSearchDto p = new ProductSearchDto();
            p.setId(item.getId());
            p.setName(item.getProducer() + " " + item.getModel() + " " + item.getName());
            p.setPrice(item.getPrice());
            p.setDiscountPercentage(item.getDiscountPercentage());
            productSearchDtos.add(p);
        });

        return productSearchDtos;
    }
}
