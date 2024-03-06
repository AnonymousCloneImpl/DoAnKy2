package project.pc_buider.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.const_.PC_PART_TYPE;
import project.pc_buider.dto.PCBuilderPartDto;
import project.pc_buider.dto.PCBuilderPartResponse;
import project.product.dto.StockDto;
import project.product.entity.Product;
import project.product.entity.Stock;
import project.product.repository.ProductDetailRepository;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PCBuilderServiceImpl implements PCBuilderService{
    @Autowired
    public ProductRepository productRepo;
    @Autowired
    public StockRepository stockRepo;
    @Autowired
    public ProductDetailRepository productDetailRepo;

    @Autowired
    public PCBuilderPartResponse getAllListPart() {
        PCBuilderPartResponse response = new PCBuilderPartResponse();
        response.setCpuList(getPartListByType(PC_PART_TYPE.CPU));
        response.setCpuCoolerList(getPartListByType(PC_PART_TYPE.CPU_COOLER));
        response.setMotherBoardList(getPartListByType(PC_PART_TYPE.MOTHER_BOARD));
        response.setMemoryList(getPartListByType(PC_PART_TYPE.MEMORY));
        response.setStorageList(getPartListByType(PC_PART_TYPE.STORAGE));
        response.setGpuList(getPartListByType(PC_PART_TYPE.GPU));
        response.setCaseList(getPartListByType(PC_PART_TYPE.CASE));
        response.setCaseFanList(getPartListByType(PC_PART_TYPE.CASE_FAN));
        response.setPsuList(getPartListByType(PC_PART_TYPE.PSU));
        response.setMoniterList(getPartListByType(PC_PART_TYPE.MONITOR));
        response.setKeyboardList(getPartListByType(PC_PART_TYPE.KEYBOARD));
        response.setMouseList(getPartListByType(PC_PART_TYPE.MOUSE));
        return response;
    }

    private List<PCBuilderPartDto> getPartListByType(PC_PART_TYPE type) {
        long startTime = System.currentTimeMillis();
        List<PCBuilderPartDto> partList = new ArrayList<>();
        PCBuilderPartDto pcBuilderPartDto = new PCBuilderPartDto();

        List<Product> productList = productRepo.getListPart(type.val);
        for (Product p : productList) {
            BeanUtils.copyProperties(p, pcBuilderPartDto);
            pcBuilderPartDto.setImage(List.of(p.getImage().split("\\|")).getFirst());

            long id = productDetailRepo.findByProductId(p.getId()).getId();
            Optional<Stock> stock = stockRepo.findByProductDetailId(id);
            StockDto stockDto = createStockDto(stock, p.getId());
            pcBuilderPartDto.setStock(stockDto);

            pcBuilderPartDto.setDetail(productDetailRepo.findPartDetailByProductId(p.getId()));
            partList.add(pcBuilderPartDto);
        }
        System.err.println(System.currentTimeMillis() - startTime);
        return partList;
    }

    private StockDto createStockDto(Optional<Stock> stock, long id) {
        return StockDto.builder()
            .productId(id)
            .quantity(stock.map(Stock::getQuantity).orElse(0))
            .build();
    }

}
