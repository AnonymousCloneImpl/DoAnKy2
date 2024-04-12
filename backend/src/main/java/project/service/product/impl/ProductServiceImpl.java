package project.service.product.impl;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.common.ProductSpecification;
import project.common.ProductUtils;
import project.dto.Pagination;
import project.dto.StaticDataProductPage;
import project.dto.product.BlogDto;
import project.dto.product.ProductDto;
import project.dto.product.ProductSummaryDto;
import project.dto.product.StockDto;
import project.entity.product.Blog;
import project.entity.product.Producer;
import project.entity.product.Product;
import project.entity.product.Stock;
import project.repository.ProductRepository;
import project.service.product.BlogService;
import project.service.product.ProducerService;
import project.service.product.ProductService;
import project.service.product.StockService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j(topic = "PRODUCT_SERVICE")
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
                    .convertPageProductToPaginationObject(productPage);

            for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
                p.setImage(productUtils.getFirstImageUrl(p.getImage()));
            }

            pagination.setElementPerPage(limit);

            return pagination;
        } catch (Exception e) {
            log.error("Error in getWithPaging function : {}", e.getMessage());
            return null;
        }
    }

    @Override
    public StaticDataProductPage getStaticDataByType(String type, Integer limit) {
        try {
            List<Product> productList = productRepo.getTopSellerByType(type, PageRequest.of(0, limit));

            List<ProductSummaryDto> productSummaryDtoList = productUtils
                    .convertProductsToProductSummaryDtoList(productList);

            List<Producer> producerDtos = producerService.findProducersByProductType(type);

            Object filter = productUtils.getListConfiguration(type);

            return StaticDataProductPage.builder()
                    .productSummaryDtoList(productSummaryDtoList)
                    .producerList(productUtils.convertProducerListToProducerDtoList(producerDtos, modelMapper))
                    .filter(filter)
                    .build();
        } catch (Exception e) {
            log.error("Error in getStaticDataByType function : {}", e.getMessage());
            return null;
        }
    }

    @Override
    public Pagination getProductsByTypeWithPaging(String type, Integer page, Integer limit) {
        Specification<Product> spec = productSpecification.findByType(type);

        Pageable pageable = PageRequest.of(page == null ? 0 : page - 1, limit == null ? Pagination.PAGE_SIZE : limit);

        try {
            Page<Product> productList = productRepo.findAll(spec, pageable);
            Pagination pagination = productUtils
                    .convertPageProductToPaginationObject(productList);

            pagination.setElementPerPage(productList.getNumberOfElements());

            return pagination;
        } catch (Exception e) {
            log.error("Error in getProductsByTypeWithPaging function : {}", e.getMessage());
            return null;
        }
    }

    @Override
    @Cacheable(key = "#model", value = "productDetail")
    public Optional<Object> getByProductNameAndModel(String type, String namePath, String model) {
        if (type == null || namePath == null || type.isEmpty() || namePath.isEmpty()) {
            log.error("type or name is null");
            return Optional.empty();
        }

        String name = namePath.replace("-", " ");
        model = model.replace("-", " ");
        Product p = productRepo.getByProductNameAndModel(type, name, model);
        if (p == null) {
            log.error("can't find product: {}", name);
            return Optional.empty();
        }

        ProductDto productDto = productUtils.createProductDto(p);
        BlogDto blogDto = new BlogDto();
        Optional<Blog> blog = blogService.getBlogByProductId(p.getId());
        productUtils.setBlogImageAndContent(blogDto, blog);

        Stock stock = stockService.findByProductId(p.getId());
        StockDto stockDto = productUtils.createStockDto(stock, p.getId());

        Map<String, String> configurationMap = new HashMap<>();
        List<String> modelList = productRepo.getProductModelByName(p.getName());
        for (String pModel : modelList) {
            String config = productRepo.getConfigByModel(pModel);
            configurationMap.put(pModel, productUtils.getConfigurationsByProductConfig(config));
        }

        productDto.setProducer(p.getProducer().getName());
        productDto.setImageList(productUtils.splitStringToList(p.getImage()));
        productDto.setBlog(blogDto);
        productDto.setSimilarProductList(productUtils.findTopSimilarProducts(p));
        productDto.setStock(stockDto);
        productDto.setConfigurationMap(configurationMap);
        productUtils.setPurchaseComboItem(productDto);
        return Optional.of(productDto);
    }
}
