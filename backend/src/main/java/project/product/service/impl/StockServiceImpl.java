package project.product.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.product.entity.Stock;
import project.product.repository.StockRepository;
import project.product.service.StockService;

import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {
    @Autowired
    private StockRepository stockRepo;

    @Override
    public Optional<Stock> findByProductDetailId(long id) {
        return stockRepo.findByProductDetailId(id);
    }

    @Override
    public Optional<Stock> getById(long id) {
        return stockRepo.findById(id);
    }

    @Override
    public Stock save(Stock stock) {
        return stockRepo.save(stock);
    }
}
