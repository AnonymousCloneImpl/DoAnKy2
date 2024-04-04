package project.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import project.dto.Pagination;
import project.dto.detail.LaptopDetailSummaryDto;
import project.dto.product.*;
import project.entity.product.Blog;
import project.entity.product.Producer;
import project.entity.product.Product;
import project.entity.product.Stock;
import project.repository.ProductRepository;
import project.service.product.StockService;

import java.util.*;

@Component
@Slf4j(topic = "PRODUCT-UTILS")
public class ProductUtils {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private StockService stockService;
	@Autowired
	private ModelMapper modelMapper;
	private ObjectMapper objectMapper;

	@PostConstruct
	public void init() {
		objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}

	public String getFirstImageUrl(String imageList) {
		return imageList.split("\\|")[0];
	}

	public Pagination convertPageProductToPaginationObject(Page<Product> products) {
		return Pagination.builder()
				.totalPageNumber(products.getTotalPages())
				.totalElement(products.getTotalElements())
				.elementPerPage(products.getNumberOfElements())
				.productSummaryDtoList(
						convertProductsToProductSummaryDtoList(
								products.getContent()
						))
				.build();
	}

	public List<ProductSummaryDto> convertProductsToProductSummaryDtoList(List<Product> productList) {
		return productList.stream().map((product -> {
					ProductSummaryDto dto = modelMapper.map(product, ProductSummaryDto.class);
					try {
						LaptopDetailSummaryDto detail = objectMapper.readValue(product.getProductDetails(), LaptopDetailSummaryDto.class);
						dto.setProductDetails(detail);
						dto.setImage(getFirstImageUrl(dto.getImage()));
					} catch (JsonProcessingException e) {
						throw new RuntimeException(e);
					}
					return dto;
				})
		).toList();
	}

	public List<ProducerDto> convertProducerListToProducerDtoList(List<Producer> producerList, ModelMapper modelMapper) {
		return producerList.stream().map((
				product -> {
					ProducerDto producerDto = modelMapper.map(product, ProducerDto.class);
					producerDto.setImage(getFirstImageUrl(producerDto.getImage()));
					return producerDto;
				}
		)).toList();
	}

	public Object getListConfiguration(String type) {
		Object filter = null;
		if (type.equalsIgnoreCase("laptop")) {
			filter = LaptopFilter.builder()
					.displayList(productRepo.findConfigurationType("screenSize"))
					.cpuList(productRepo.findConfigurationType("cpuType"))
					.ramList(productRepo.findConfigurationType("ram"))
					.build();
		}

		if (type.equalsIgnoreCase("mouse")) {
			filter = MouseFilter.builder()
//					.connection(productDetailService.getConnectionList())
					.build();
		}
		return filter;
	}

	public ProductDto createProductDto(Product p) {
		ProductDto productDto = new ProductDto();
		BeanUtils.copyProperties(p, productDto);
		return productDto;
	}

	public void setPurchaseComboItem(ProductDto productDto) {
		PurchaseComboItem purchaseComboItem = new PurchaseComboItem();
		List<Product> productList;
		String type = "";
		try {
			productList = new ArrayList<>();
			for (int i = 0; i < 3; i++) {
				if (i == 0) type = "mouse";
				if (i == 1) type = "keyboard";
				if (i == 2) type = "headphone";
				productList.add(productRepo.findMostPurchaseByType(type));
			}

			List<SimilarProductDto> spList = new ArrayList<>();
			SimilarProductDto sp;
			for (Product p : productList) {
				if (p != null) {
					sp = new SimilarProductDto();
					modelMapper.map(p, sp);
					sp.setImage(Arrays.stream(p.getImage().split("\\|")).findFirst().orElse(null));
					spList.add(sp);
				}
			}

			purchaseComboItem.setProductList(spList);
			productDto.setPurchaseComboItem(purchaseComboItem);
		} catch (IllegalAccessError e) {
			System.err.println("Purchase Combo Item Is Null!");
			purchaseComboItem.setProductList(new ArrayList<>());
		}
	}

	public void setBlogImageAndContent(BlogDto blogDto, Optional<Blog> blog) {
		String blogImageStr = "";
		String blogContentStr = "";
		if (blog.isPresent()) {
			blogImageStr = blog.get().getImage();
			blogContentStr = blog.get().getContent();
		}
		blogDto.setImageList(Optional.ofNullable(blogImageStr)
				.map(str -> List.of(str.split("\\|")))
				.orElse(Collections.emptyList()));
		blogDto.setContentList(Optional.ofNullable(blogContentStr)
				.map(str -> List.of(str.split("\\|")))
				.orElse(Collections.emptyList()));
		blogDto.setId(blog.get().getId());
		blogDto.setHeader(blog.get().getHeader());
	}

	public StockDto createStockDto(Stock stock, long id) {
		return StockDto.builder()
				.productId(id)
				.sold(stock.getSold())
				.quantity(stock.getQuantity())
				.build();
	}

	public List<SimilarProductDto> findTopSimilarProducts(Product product) {
		List<Product> productList = productRepo.findTopSimilarByType(product.getType(), product.getId(),
				PageRequest.of(0, 6));
		SimilarProductDto sp;
		List<SimilarProductDto> list = new ArrayList<>();
		for (Product p : productList) {
			sp = new SimilarProductDto();
			BeanUtils.copyProperties(p, sp);
			Stock stock = stockService.findByProductId(p.getId());
			StockDto stockDto = createStockDto(stock, p.getId());
			sp.setImage(List.of(p.getImage().split("\\|")).getFirst());
			sp.setStock(stockDto);
			list.add(sp);
		}
		return list;
	}

	public List<String> getConfigurationsByProductName(String name) {
		List<String> productDetails = productRepo.getProductDetailsByName(name);
		List<String> configurations = new ArrayList<>();
		for (String pDetail : productDetails) {
			ObjectMapper mapper = new ObjectMapper();
			try {
				JsonNode rootNode = mapper.readTree(pDetail);
				String ram = rootNode.get("ram").asText();
				String hardDrive = rootNode.get("hardDrive").asText();
				String cpu = rootNode.get("cpu").asText();
				String graphicsCard = rootNode.get("graphicsCard").asText();
				StringBuilder config = new StringBuilder();
				config.append(ram).append(" | ")
						.append(hardDrive).append(" | ")
						.append(cpu).append(" | ")
						.append(graphicsCard);
				configurations.add(config.toString());
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return configurations;
	}

}
