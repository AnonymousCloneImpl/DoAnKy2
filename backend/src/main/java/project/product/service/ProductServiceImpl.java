package project.product.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.models.Pagination;
import project.product.dto.BlogDto;
import project.product.dto.ProductDto;
import project.product.entity.*;
import project.product.repository.BlogRepository;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;
import project.product.utils.ProductSpecification;
import project.product.utils.ProductUtils;
import project.search.dto.ProductSummaryDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private StockRepository stockRepo;
	@Autowired
	private BlogRepository blogRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProductSpecification productSpecification;

	@Deprecated
	@Override
	public Pagination getWithPaging(Integer page) {
		Pageable pageable = PageRequest.of((page - 1), Pagination.PAGE_SIZE);

		try {
			Page<Product> productPage = productRepo.findAll(pageable);

			Pagination pagination = ProductUtils
					.convertPageProductToPaginationObject(productPage, modelMapper);

			for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
				p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
			}
			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getWithPaging function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public List<ProductSummaryDto> getProductByTypeWithLimit(String type, int limit) {

		Pageable pageable = PageRequest.of(0, limit);
		try {
			List<Product> productList = productRepo.getByProductType(type, pageable);

			List<ProductSummaryDto> productSummaryDtoList = ProductUtils.convertProductsToProductSummaryDtoList(productList, modelMapper);

			for (ProductSummaryDto p : productSummaryDtoList) {
				p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
			}
			return productSummaryDtoList;
		} catch (Exception e) {
			System.err.println("Error in getProductByTypeWithLimit function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public List<ProductSummaryDto> getTopSellerByType(String type, Integer limit) {
		try {
			List<Product> productList = productRepo.getTopSellerByType(type, limit);

			List<ProductSummaryDto> productSummaryDtoList = ProductUtils.convertProductsToProductSummaryDtoList(productList, modelMapper);

			for (ProductSummaryDto summaryDto : productSummaryDtoList) {
				summaryDto.setImage(ProductUtils.getFirstImageUrl(summaryDto.getImage()));
			}

			return productSummaryDtoList;
		} catch (Exception e) {
			System.err.println("Error in getTopSellerByType function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public Pagination getProductsByTypeWithPaging(String type, Integer page) {
		Pageable pageable = PageRequest.of((int) (page - 1), Pagination.PAGE_SIZE);

		Specification<Product> spec = productSpecification.searchByType(type);

		try {
			Page<Product> productList = productRepo.findAll(spec, pageable);

			Pagination pagination = ProductUtils
					.convertPageProductToPaginationObject(productList, modelMapper);

			for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
				p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
			}

			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getProductsByTypeWithPaging function : " + e.getMessage());
			return null;
		}
	}

	@Transactional
	@Override
	public Optional<Object> getByProductTypeAndByName(String type, String name) {
		String outputString = name.replace("-", " ");

		Product product = productRepo.getByProductTypeAndByName(type, outputString);
		System.out.println(product.getName());
		ProductDto productDto = new ProductDto();
		BeanUtils.copyProperties(product, productDto);

		PurchaseComboItem purchaseComboItem = new PurchaseComboItem();
//		try {
//			purchaseComboItem.setProductList(
//					List.of(
//							productRepo.findMostPurchaseMouse(),
//							productRepo.findMostPurchaseKeyboard()
////							productRepo.findMostPurchaseHeadphone()
//					)
//			);
//			productDto.setPurchaseComboItem(purchaseComboItem);
//		} catch (IllegalAccessError e) {
//			System.err.println("Purchase Combo Item Is Null!");
//			purchaseComboItem.setProductList(new ArrayList<>());
//		}

		Blog blog = product.getBlog();
		String BlogImageStr = blog.getImage();
		String BlogContentStr = blog.getContent();
		BlogDto blogDto = new BlogDto();
		BeanUtils.copyProperties(blog, blogDto);

//		Optional<Stock> stock = stockRepo.findByProductId(product.getId());
		List<Integer> colorIdList = new ArrayList<>();
//		StockDto stockDto = StockDto.builder()
//				.productId(product.getId())
//				.colorIdList(colorIdList)
//				.sold(stock.get().getSold())
//				.quantity(stock.get().getQuantity())
//				.build();

		if (BlogImageStr != null) {
			blogDto.setImageList(List.of(BlogImageStr.split("\\|")));
			blogDto.setContentList(List.of(BlogContentStr.split("\\|")));
		}

		List<Product> similarProductList;
		similarProductList = productRepo.findTopSimilarByType(product.getType(), product.getId(), PageRequest.of(0, 6));
		String imageString = product.getImage();

		if (imageString != null) {
			productDto.setImageList(List.of(imageString.split("\\|")));
			productDto.setBlog(blogDto);
			productDto.setSimilarProductList(similarProductList);
//			productDto.setStock(stockDto);
		}
		return Optional.of(productDto);
	}

	@Override
	public List<ProductSummaryDto> getByName(String name, Integer limit) {
		Pageable pageable = PageRequest.of(0, limit);
		Page<Product> productList = productRepo.findAll(productSpecification.nameLike(name), pageable);

		List<ProductSummaryDto> productSummaryDtoList;

		if (!productList.isEmpty()) {
			productSummaryDtoList = ProductUtils
					.convertProductsToProductSummaryDtoList(productList.getContent(), modelMapper);
			return productSummaryDtoList;
		} else {
			System.err.println("Error in getProductsByTypeWithPaging function : productList is null");
			return null;
		}
	}
}
