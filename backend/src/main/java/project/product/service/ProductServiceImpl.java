package project.product.service;


import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.other_entity.Color;
import project.product.entity.Product;
import project.product.entity.ProductDto;
import project.product.repository.BlogRepository;
import project.product.repository.ColorRepository;
import project.product.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private ColorRepository colorRepo;
    @Autowired
    private BlogRepository blogRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    public Optional<ProductDto> getById(long id) {
        Optional<Product> product = productRepo.findById(id);
        ProductDto productDto = ProductDto.builder()
          .id(product.get().getId())
          .producer(product.get().getProducer())
          .model(product.get().getModel())
          .name(product.get().getName())
          .type(product.get().getType())
          .productDetail(product.get().getProductDetail())
          .price(product.get().getPrice())
          .imageList(List.of(product.get().getImage().split("\\|")))
          .discountPercentage(product.get().getDiscountPercentage())
          .colorList(product.get().getColorList())
          .blogList(product.get().getBlogList())
          .purchaseComboItemList(product.get().getPurchaseComboItemList())
          .build();
        return Optional.ofNullable(productDto);
    }

    @Override
    public List<Product> getByName(Specification<Product> spec, String name) {
        return productRepo.findAll(nameLike(name));
    }

    @Override
    public boolean existById(long id) {
        return productRepo.existsById(id);
    }

    @Override
    public void deleteById(long id) {
        productRepo.deleteById(id);
    }

    @Override
    public Product insert(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        return productRepo.save(product);
    }

    @Override
    public Product updateById(Long id, ProductDto productDto) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));

        modelMapper.map(productDto, product);
        return productRepo.save(product);
    }

    @Override
    public Specification<Product> nameLike(String name) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}
