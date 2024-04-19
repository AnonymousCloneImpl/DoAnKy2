package project.service.pc_builder.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.cache.annotation.Cacheable;
import project.const_.PC_PART_TYPE;
import project.dto.product.StockDto;
import project.entity.product.Product;
import project.entity.product.Stock;
import project.model.pc_builder.PCBuilderPart;
import project.repository.ProductRepository;
import project.repository.StockRepository;
import project.service.product.ProductService;
import project.service.product.StockService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PCPartService {
    @Autowired
    public ProductService productService;
    @Autowired
    public StockService stockService;

    @Cacheable(value = "PCPartList", key = "#type.val")
    public List<PCBuilderPart> getPartListByType(PC_PART_TYPE type) {
        List<PCBuilderPart> partList = new ArrayList<>();

        List<Product> productList = productService.getListPart(type.val);
        for (Product p : productList) {
            PCBuilderPart pcBuilderPart = new PCBuilderPart();
            BeanUtils.copyProperties(p, pcBuilderPart);
            pcBuilderPart.setImage(List.of(p.getImage().split("\\|")).get(0));

            Stock stock = stockService.findByProductId(p.getId());
            StockDto stockDto = createStockDto(Optional.ofNullable(stock), p.getId());
            pcBuilderPart.setStock(stockDto);
            if (stock != null) {
                pcBuilderPart.setPrice(stock.getProduct().getPrice());
            }
            partList.add(pcBuilderPart);
        }
        return partList;
    }

    private StockDto createStockDto(Optional<Stock> stock, long id) {
        return StockDto.builder()
                .productId(id)
                .quantity(stock.map(Stock::getQuantity).orElse(0))
                .build();
    }
}
