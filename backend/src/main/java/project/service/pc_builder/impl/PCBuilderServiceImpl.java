package project.service.pc_builder.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.const_.PC_PART_TYPE;
import project.dto.pc_builder.PCBuilderPart;
import project.dto.pc_builder.PCBuilderPartResponse;
import project.dto.product.StockDto;
import project.entity.product.Product;
import project.entity.product.Stock;
import project.repository.ProductRepository;
import project.repository.StockRepository;
import project.service.pc_builder.PCBuilderService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PCBuilderServiceImpl implements PCBuilderService {
  @Autowired
  public ProductRepository productRepo;
  @Autowired
  public StockRepository stockRepo;

  @Override
  public PCBuilderPartResponse getAllListPart() {
    return PCBuilderPartResponse.builder()
      .cpuList(getPartListByType(PC_PART_TYPE.CPU))
      .cpuCoolerList(getPartListByType(PC_PART_TYPE.CPU_COOLER))
      .motherBoardList(getPartListByType(PC_PART_TYPE.MOTHER_BOARD))
      .memoryList(getPartListByType(PC_PART_TYPE.MEMORY))
      .storageList(getPartListByType(PC_PART_TYPE.STORAGE))
      .gpuList(getPartListByType(PC_PART_TYPE.GPU))
      .caseList(getPartListByType(PC_PART_TYPE.CASE))
      .caseFanList(getPartListByType(PC_PART_TYPE.CASE_FAN))
      .psuList(getPartListByType(PC_PART_TYPE.PSU))
      .monitorList(getPartListByType(PC_PART_TYPE.MONITOR))
      .keyboardList(getPartListByType(PC_PART_TYPE.KEYBOARD))
      .mouseList(getPartListByType(PC_PART_TYPE.MOUSE))
      .build();
  }

  private List<PCBuilderPart> getPartListByType(PC_PART_TYPE type) {
    List<PCBuilderPart> partList = new ArrayList<>();
    PCBuilderPart pcBuilderPart = new PCBuilderPart();

    List<Product> productList = productRepo.getListPart(type.val);
    for (Product p : productList) {
      BeanUtils.copyProperties(p, pcBuilderPart);
      pcBuilderPart.setImage(List.of(p.getImage().split("\\|")).getFirst());

      Stock stock = stockRepo.findByProductId(p.getId());
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
