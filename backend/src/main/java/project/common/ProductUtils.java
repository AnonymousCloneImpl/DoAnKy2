package project.common;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import project.product.models.Pagination;
import project.product.dto.*;
import project.product.entity.*;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;
import project.product.service.ProductDetailService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
@Slf4j(topic = "PRODUCT-UTILS")
public class ProductUtils {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private StockRepository stockRepo;
	@Autowired
	private ProductDetailService productDetailService;

	public String getFirstImageUrl(String imageList) {
		return imageList.split("\\|")[0];
	}

	public Pagination convertPageProductToPaginationObject(Page<Product> products, ModelMapper modelMapper) {
		return Pagination.builder()
				.totalPageNumber(products.getTotalPages())
				.totalElement(products.getTotalElements())
				.elementPerPage(Pagination.PAGE_SIZE)
				.productSummaryDtoList(
						convertProductsToProductSummaryDtoList(
								products.getContent(),
								modelMapper
						))
				.build();
	}

	public List<ProductSummaryDto> convertProductsToProductSummaryDtoList(
			List<Product> productList,
			ModelMapper modelMapper
	) {

		List<ProductSummaryDto> productSummaryDtoList = productList.stream().map((
				product -> modelMapper.map(product, ProductSummaryDto.class)
		)).toList();

		for (ProductSummaryDto summaryDto : productSummaryDtoList) {
			summaryDto.setImage(getFirstImageUrl(summaryDto.getImage()));
		}

		return productSummaryDtoList;
	}

	public void getConfigurationForDto(
			List<ProductSummaryDto> productSummaryDtoList
	) {
		for (ProductSummaryDto p : productSummaryDtoList) {
			ProductDetail detail = productDetailService.getByProductId(p.getId());
			p.setConfiguration(getDetailDto(p.getType().toLowerCase(), detail));
		}
	}

	public ProductDetailDto getDetailDto(String type, ProductDetail productDetail) {
		ProductDetailDto detailDto = new ProductDetailDto();
		Object detail = null;
		switch (type) {
			case "laptop" -> {
				detail = new LaptopDetail();
				BeanUtils.copyProperties(productDetail, detail);
			}
			case "keyboard" -> {
				detail = new KeyboardDetail();
				BeanUtils.copyProperties(productDetail, detail);
			}
			case "mouse" -> {
				detail = new MouseDetail();
				BeanUtils.copyProperties(productDetail, detail);
			}
			case "headphone" -> {
				detail = new HeadphoneDetailDto();
				BeanUtils.copyProperties(productDetail, detail);
			}
		}
		detailDto.setDetail(detail);
		return detailDto;
	}


	public ProductDto createProductDto(Product p) {
		ProductDto productDto = new ProductDto();
		BeanUtils.copyProperties(p, productDto);
		return productDto;
	}

	public void setPurchaseComboItem(ProductDto productDto) {
		PurchaseComboItem purchaseComboItem = new PurchaseComboItem();
		Pageable pageable = PageRequest.of(0, 1);
		try {
			String type = "";
			List<Product> productList = new ArrayList<>();
			for (int i = 0; i < 3; i++) {
				if (i == 0) {
					type = "mouse";
				}
				if (i == 1) {
					type = "keyboard";
				}
				if (i == 2) {
					type = "headphone";
				}
				productList.addAll(productRepo.findMostPurchaseByType(type, pageable));
			}
			purchaseComboItem.setProductList(productList);
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
	}

	public StockDto createStockDto(Optional<Stock> stock, long id) {
		return StockDto.builder()
				.productId(id)
				.sold(stock.map(Stock::getSold).orElse(0))
				.quantity(stock.map(Stock::getQuantity).orElse(0))
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
			Optional<Stock> stock = stockRepo.findByProductDetailId(p.getId());
			StockDto stockDto = createStockDto(stock, p.getId());
			sp.setImage(List.of(p.getImage().split("\\|")).getFirst());
			sp.setStock(stockDto);
			list.add(sp);
		}
		return list;
	}


	public void switchCase(String type, Product p, ProductDto productDto) {
		ProductDetail pDetail = productDetailService.getByProductId(p.getId());
		ModelMapper modelMapper = new ModelMapper();

		switch (type.toLowerCase()) {
			case "laptop" -> {
				LaptopDetailDto lDto = modelMapper.map(pDetail, LaptopDetailDto.class);
				productDto.setProductDetail(lDto);
			}
			case "keyboard" -> {
				KeyboardDetailDto kDto = modelMapper.map(pDetail, KeyboardDetailDto.class);
				productDto.setProductDetail(kDto);
			}
			case "mouse" -> {
				MouseDetailDto mDto = modelMapper.map(pDetail, MouseDetailDto.class);
				productDto.setProductDetail(mDto);
			}
			case "headphone" -> {
				HeadphoneDetailDto hDto = modelMapper.map(pDetail, HeadphoneDetailDto.class);
				productDto.setProductDetail(hDto);
			}
		}
	}
}
