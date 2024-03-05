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
import project.product.dto.*;
import project.product.entity.*;
import project.product.repository.ProductDetailRepository;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;
import project.specification.ProductSpecification;
import project.product.utils.ProductUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private ProductDetailRepository productDetailRepo;
	@Autowired
	private StockRepository stockRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProductSpecification productSpecification;
	@Autowired
	private ProducerService producerService;
	@Autowired
	private ProductDetailService productDetailService;

	@Deprecated
	@Override
	public Pagination getWithPaging(Integer page, Integer limit) {
		Pageable pageable = PageRequest.of((page - 1), Pagination.PAGE_SIZE);

		try {
			Page<Product> productPage = productRepo.findAll(pageable);

			Pagination pagination = ProductUtils
					.convertPageProductToPaginationObject(productPage, modelMapper);

			for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
				p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
			}

			pagination.setElementPerPage(limit);

			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getWithPaging function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public StaticDataProductPage getStaticDataByType(String type, Integer limit) {
		try {
			List<Product> productList = productRepo.getTopSellerByType(type, limit);

			List<ProductSummaryDto> productSummaryDtoList = ProductUtils
					.convertProductsToProductSummaryDtoList(productList, modelMapper);

			for (ProductSummaryDto p : productSummaryDtoList) {
				p.setConfiguration(productDetailRepo.findAllDetailByProductId(p.getId()));
			}

			ProductUtils.getConfigurationForDto(productSummaryDtoList, productDetailRepo);

			List<ProductDetail> productDetailList = productDetailRepo.findAll(productSpecification.getByProductType(type));

			return StaticDataProductPage.builder()
					.productSummaryDtoList(productSummaryDtoList)
					.producerList(producerService.findProducersByProductType(type))
					.cpuList(productDetailService.getCpuList())
					.ramList(productDetailService.getRamList())
					.build();
		} catch (Exception e) {
			System.err.println("Error in getStaticDataByType function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public Pagination getProductsByTypeWithPaging(SearchDto searchDto) {
		Specification<Product> spec = productSpecification.filterOfProduct(searchDto);

		Pageable pageable = PageRequest.of((searchDto.getPage() - 1), searchDto.getLimit() == null ? Pagination.PAGE_SIZE : searchDto.getLimit());

		try {
			Page<Product> productList = productRepo.findAll(spec, pageable);
			Pagination pagination = ProductUtils
					.convertPageProductToPaginationObject(productList, modelMapper);

			ProductUtils.getConfigurationForDto(pagination.getProductSummaryDtoList(), productDetailRepo);

			pagination.setElementPerPage(productList.getNumberOfElements());

			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getProductsByTypeWithPaging function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public List<ProductSummaryDto> getByName(String name, Integer limit) {
		if (limit == null) {
			limit = Pagination.PAGE_SIZE;
		}

		Page<Product> productList = productRepo
				.findAll(productSpecification.nameLike(name), PageRequest.of(0, limit));

		if (!productList.isEmpty()) {

			List<ProductSummaryDto> productSummaryDtoList = ProductUtils
					.convertProductsToProductSummaryDtoList(productList.getContent(), modelMapper);

			for (ProductSummaryDto p : productSummaryDtoList) {
				p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
			}
			return productSummaryDtoList;
		} else {
			System.err.println("Error in getByName function : productList is null");
			return null;
		}
	}

	@Transactional
	@Override
	public Optional<Object> getByProductTypeAndByName(String type, String name) {
		String namePath = name.replace("-", " ");
		Product p = productRepo.getByProductTypeAndByName(type, namePath);
		ProductDto productDto = createProductDto(p);
		setProductDetail(productDto, p);
		setPurchaseComboItem(productDto);

		Blog blog = p.getBlog();
		BlogDto blogDto = createBlogDto(blog);
		setBlogImageAndContent(blogDto, blog);

		Optional<Stock> stock = stockRepo.findByProductDetailId(p.getId());
		StockDto stockDto = createStockDto(stock, p.getId());

		productDto.setProducer(p.getProducer().getName());
		productDto.setImageList(List.of(p.getImage().split("\\|")));
		productDto.setBlog(blogDto);
		productDto.setSimilarProductList(findTopSimilarProducts(p));
		productDto.setStock(stockDto);
		productDto.setConfigurationList(productRepo.getListConfiguration(namePath));

		return Optional.of(productDto);
	}

	private ProductDto createProductDto(Product product) {
		ProductDto productDto = new ProductDto();
		BeanUtils.copyProperties(product, productDto);
		return productDto;
	}

	private void setProductDetail(ProductDto productDto, Product p) {
		ProductDetail detail = productDetailRepo.findByProductId(p.getId());
		productDto.setProductDetail(detail);
	}

	private void setPurchaseComboItem(ProductDto productDto) {
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

	private BlogDto createBlogDto(Blog blog) {
		BlogDto blogDto = new BlogDto();
		BeanUtils.copyProperties(blog, blogDto);
		return blogDto;
	}

	private void setBlogImageAndContent(BlogDto blogDto, Blog blog) {
		String blogImageStr = blog.getImage();
		String blogContentStr = blog.getContent();
		blogDto.setImageList(Optional.ofNullable(blogImageStr)
				.map(str -> List.of(str.split("\\|")))
				.orElse(Collections.emptyList()));
		blogDto.setContentList(Optional.ofNullable(blogContentStr)
				.map(str -> List.of(str.split("\\|")))
				.orElse(Collections.emptyList()));
	}

	private StockDto createStockDto(Optional<Stock> stock, Long productId) {
		return StockDto.builder()
				.productId(productId)
				.sold(stock.map(Stock::getSold).orElse(0))
				.quantity(stock.map(Stock::getQuantity).orElse(0))
				.build();
	}

	private List<SimilarProductDto> findTopSimilarProducts(Product product) {
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
}
