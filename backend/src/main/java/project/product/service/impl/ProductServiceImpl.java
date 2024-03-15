package project.product.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.models.Pagination;
import project.product.dto.*;
import project.product.entity.*;
import project.product.repository.ProductRepository;
import project.product.service.ProducerService;
import project.product.service.ProductDetailService;
import project.product.service.ProductService;
import project.common.ProductUtils;
import project.product.service.StockService;
import project.search.specification.ProductSpecification;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private ProductSpecification productSpecification;
	@Autowired
	private StockService stockService;
	@Autowired
	private ProducerService producerService;
	@Autowired
	private ProductDetailService productDetailService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProductUtils productUtils;

	@Override
	public Optional<Product> getById(long id) {
		return productRepo.findById(id);
	}

	@Override
	public Page<Product> getAll(Specification<Product> specification, Pageable pageable) {
		return productRepo.findAll(specification, pageable);
	}

	@Override
	public List<Product> findAllByNameAndSortBySold(String name, Pageable pageable) {
		return productRepo.findAllByNameSortBySold(name, pageable);
	}

	@Override
	public Page<Product> getAllBySpecification(Specification<Product> spec, Pageable pageable) {
		return productRepo.findAll(spec, pageable);
	}

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
				p.setConfiguration(productDetailService.getById(p.getId()));
			}

			ProductUtils.getConfigurationForDto(productSummaryDtoList, productDetailService);

			List<ProductDetail> productDetailList = productDetailService.findAll(productSpecification.getByProductType(type));

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

			ProductUtils.getConfigurationForDto(pagination.getProductSummaryDtoList(), productDetailService);

			pagination.setElementPerPage(productList.getNumberOfElements());

			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getProductsByTypeWithPaging function : " + e.getMessage());
			return null;
		}
	}

	@Override
	public Optional<Object> getByProductTypeAndByName(String type, String name) {
		String namePath = name.replace("-", " ");
		Product p = productRepo.getByProductTypeAndByName(type, namePath);
		ProductDto productDto = productUtils.createProductDto(p);
		productUtils.setPurchaseComboItem(productDto);

		Blog blog = p.getBlog();
		BlogDto blogDto = productUtils.createBlogDto(blog);
		productUtils.setBlogImageAndContent(blogDto, blog);

		Optional<Stock> stock = stockService.findByProductDetailId(p.getId());
		StockDto stockDto = productUtils.createStockDto(stock, p.getId());

		productDto.setProducer(p.getProducer().getName());
		productDto.setImageList(List.of(p.getImage().split("\\|")));
		productDto.setBlog(blogDto);
		productDto.setSimilarProductList(productUtils.findTopSimilarProducts(p));
		productDto.setStock(stockDto);
		productDto.setConfigurationList(productRepo.getListConfiguration(namePath));

		productUtils.switchCase(type, p, productDto);
		return Optional.of(productDto);
	}
}
