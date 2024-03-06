package project.product.service;

import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductDetail;

import java.util.List;

@Service
public interface ProductDetailService {
    List<ProductDetail> getProductDetailsByProducts(List<Product> products);

    List<String> getCpuList();

    List<String> getRamList();
}
