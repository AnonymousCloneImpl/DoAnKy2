package project.service.product;

import org.springframework.stereotype.Service;
import project.entity.product.Stock;

@Service
public interface StockService {
	Stock findByProductId(long id);

	Stock getById(long id);

	Stock save(Stock stock);
}
