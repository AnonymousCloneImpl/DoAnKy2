package project.pc_buider.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.const_.PC_PART_TYPE;
import project.pc_buider.dto.PCBuilderPartDto;
import project.pc_buider.dto.PCBuilderPartResponse;
import project.pc_buider.service.PCBuilderService;
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
public class PCBuilderServiceImpl implements PCBuilderService {
	@Autowired
	public ProductRepository productRepo;
	@Autowired
	public StockRepository stockRepo;
	@Autowired
	public ProductDetailRepository productDetailRepo;

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
			.moniterList(getPartListByType(PC_PART_TYPE.MONITOR))
			.keyboardList(getPartListByType(PC_PART_TYPE.KEYBOARD))
			.mouseList(getPartListByType(PC_PART_TYPE.MOUSE))
			.build();
	}

	private List<PCBuilderPartDto> getPartListByType(PC_PART_TYPE type) {
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
		return partList;
	}

	private StockDto createStockDto(Optional<Stock> stock, long id) {
		return StockDto.builder()
				.productId(id)
				.quantity(stock.map(Stock::getQuantity).orElse(0))
				.build();
	}

}
