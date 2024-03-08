package project.product.service;

import org.springframework.stereotype.Service;
import project.product.entity.Stock;

import java.util.Optional;

@Service
public interface StockService {
    Optional<Stock> findByProductDetailId(long id);
    Optional<Stock> getById(long id);
    Stock save(Stock stock);
}
