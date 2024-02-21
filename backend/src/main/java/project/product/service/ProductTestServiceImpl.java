package project.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductTest;
import project.product.repository.ProductTestRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ProductTestServiceImpl implements ProductTestService {
    @Autowired
    ProductTestRepo productTestRepo;
    @Override
    public List<ProductTest> getAll() {
        return productTestRepo.findAll();
    }

    @Override
    public Optional<ProductTest> getById(Long id) {
        return productTestRepo.findById(id);
    }
}
