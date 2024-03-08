package project.product.service;

import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.entity.ProductDetail;

import java.util.List;

@Service
public interface ProductDetailService {
	ProductDetail getById(Long id);

	List<String> getCpuList();

	List<String> getRamList();
}
