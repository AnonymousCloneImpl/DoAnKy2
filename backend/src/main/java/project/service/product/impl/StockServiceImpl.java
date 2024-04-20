package project.service.product.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.entity.product.Stock;
import project.repository.StockRepository;
import project.service.product.StockService;

@Service
public class StockServiceImpl implements StockService {
    @Autowired
    private StockRepository stockRepo;

    @Override
    public Stock findByProductId(long id) {
        return stockRepo.findByProductId(id);
    }

    @Override
    public Stock getById(long id) {
        return stockRepo.findByProductId(id);
    }

    @Override
    public void save(Stock stock) {
        stockRepo.save(stock);
    }
}
