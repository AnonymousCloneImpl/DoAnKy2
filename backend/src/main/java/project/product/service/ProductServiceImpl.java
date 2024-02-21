package project.product.service;


import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductDto;
import project.product.entity.Product_;
import project.product.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepo, ModelMapper modelMapper) {
        this.productRepo = productRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    public Optional<Product> getById(long id) {
        return productRepo.findById(id);
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
            -> criteriaBuilder.like(root.get(Product_.NAME), "%" + name + "%");
    }
}
