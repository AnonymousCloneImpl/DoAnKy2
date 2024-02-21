package project.product.service;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductTest;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public interface ProductTestService {
    List<ProductTest> getAll();
    Optional<ProductTest> getById(Long id);
}
