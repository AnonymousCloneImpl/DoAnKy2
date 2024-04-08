package project.service.product;

import org.springframework.stereotype.Service;
import project.entity.product.Stock;

import java.util.Optional;

@Service
public interface StockService {
  Stock findByProductId(long id);

  Optional<Stock> getById(long id);

  Stock save(Stock stock);
}
