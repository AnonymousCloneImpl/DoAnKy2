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
import project.product.service.*;
import project.common.ProductUtils;
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
	@Autowired
	private BlogService blogService;

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

			Pagination pagination = productUtils
					.convertPageProductToPaginationObject(productPage, modelMapper);

			for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
				p.setImage(productUtils.getFirstImageUrl(p.getImage()));
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

			List<ProductSummaryDto> productSummaryDtoList = productUtils
					.convertProductsToProductSummaryDtoList(productList, modelMapper);

			productUtils.getConfigurationForDto(productSummaryDtoList);

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
	public Pagination getProductsByTypeWithPaging(HomePageData homePageData) {
		Specification<Product> spec = productSpecification.findByType(homePageData);

		Pageable pageable = PageRequest.of((homePageData.getPage() - 1), homePageData.getLimit() == null ? Pagination.PAGE_SIZE : homePageData.getLimit());

		try {
			Page<Product> productList = productRepo.findAll(spec, pageable);
			Pagination pagination = productUtils
					.convertPageProductToPaginationObject(productList, modelMapper);

			productUtils.getConfigurationForDto(pagination.getProductSummaryDtoList());

			pagination.setElementPerPage(productList.getNumberOfElements());

			return pagination;
		} catch (Exception e) {
			System.err.println("Error in getProductsByTypeWithPaging function : " + e.getMessage());
			return null;
		}
	}

	@Override
//	@Cacheable(key = "#name", value = "productByTypeAndName")
	public Optional<Object> getByProductTypeAndByName(String type, String name) {
		String namePath = name.replace("-", " ");
		Product p = productRepo.getByProductTypeAndByName(type, namePath);
		ProductDto productDto = productUtils.createProductDto(p);
		productUtils.setPurchaseComboItem(productDto);
		BlogDto blogDto = new BlogDto();
		Optional<Blog> blog = blogService.getBlogByProductId(p.getId());
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
