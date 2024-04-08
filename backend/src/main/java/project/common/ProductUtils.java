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

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
          LaptopDetailSummaryDto detail = objectMapper.readValue(product.getDetails(), LaptopDetailSummaryDto.class);
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

  public List<String> splitStringToList(String str) {
    return str != null ? List.of(str.split("\\|")) : List.of();
  }

  public ProductDto createProductDto(Product p) {
    ProductDto productDto = new ProductDto();
    BeanUtils.copyProperties(p, productDto);
    return productDto;
  }

  public void setPurchaseComboItem(ProductDto productDto) {
    PurchaseComboItem purchaseComboItem = new PurchaseComboItem();
    List<Product> productList = new ArrayList<>();
    String[] comboTypes = {"mouse", "keyboard", "headphone"};

    for (String type : comboTypes) {
      Product p = productRepo.findMostPurchaseByType(type);
      if (p != null) productList.add(p);
    }

    List<SimilarProductDto> spList = new ArrayList<>();
    for (Product p : productList) {
      SimilarProductDto sp = new SimilarProductDto();
      modelMapper.map(p, sp);
      sp.setImage(splitStringToList(p.getImage()).get(0));
      spList.add(sp);
    }

    purchaseComboItem.setProductList(spList);
    productDto.setPurchaseComboItem(purchaseComboItem);
  }

  public void setBlogImageAndContent(BlogDto blogDto, Optional<Blog> blog) {
    if (blog.isPresent()) {
      Blog b = blog.get();
      blogDto.setImageList(splitStringToList(b.getImage()));
      blogDto.setContentList(splitStringToList(b.getContent()));
      blogDto.setId(b.getId());
      blogDto.setHeader(b.getHeader());
    }
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
      if (stock != null) {
        StockDto stockDto = createStockDto(stock, p.getId());
        sp.setImage(splitStringToList(p.getImage()).get(0));
        sp.setStock(stockDto);
        list.add(sp);
      }
    }
    return list;
  }

  public List<String> getConfigurationsByProductName(String name) {
    List<String> productDetails = productRepo.getProductDetailsByName(name);
    List<String> configurations = new ArrayList<>();
    for (String pDetail : productDetails) {
      try {
        JsonNode rootNode = new ObjectMapper().readTree(pDetail);
        String ram = getNodeValueIgnoreCase(rootNode, "ram");
        String hardDrive = getNodeValueIgnoreCase(rootNode, "hardDrive");
        String cpu = getNodeValueIgnoreCase(rootNode, "cpu");
        String graphicsCard = getNodeValueIgnoreCase(rootNode, "graphicsCard");
        StringBuilder config = new StringBuilder();
        config.append(ram).append(" | ")
          .append(hardDrive).append(" | ")
          .append(cpu).append(" | ")
          .append(graphicsCard);
        configurations.add(config.toString());
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }
    return configurations;
  }

  private String getNodeValueIgnoreCase(JsonNode node, String key) {
    String lowercaseKey = key.toLowerCase();
    if (node.has(lowercaseKey)) {
      return node.get(lowercaseKey).asText();
    }
    for (JsonNode child : node) {
      if (child.isObject()) {
        String childName = child.fieldNames().next();
        if (childName.equalsIgnoreCase(key)) {
          return child.get(childName).asText();
        }
      }
    }
    return null;
  }

}
