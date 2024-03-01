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
import project.product.dto.StockDto;
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

    @Override
    public List<ProductSummaryDto> getAll() {
        return productRepo.findAll().stream().map((product
            -> modelMapper.map(product, ProductSummaryDto.class))
        ).toList();
    }

    @Deprecated
    @Override
    public Pagination getWithPaging(Long page) {
        Pageable pageable = PageRequest.of((int) (page - 1), Pagination.PAGE_SIZE);

        Page<Product> productPage = productRepo.findAll(pageable);

        Pagination pagination = Pagination.builder()
            .totalPageNumber(productPage.getTotalPages())
            .totalElement(productPage.getTotalElements())
            .elementPerPage(Pagination.PAGE_SIZE)
            .productSummaryDtoList(
                productPage.stream().map((product
                        -> modelMapper.map(product, ProductSummaryDto.class)))
                    .toList())
            .build();

        for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
            p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
        }

        return pagination;
    }

    @Override
    public List<ProductSummaryDto> getProductByTypeWithLimit(String type, int limit) {

        List<Product> productList = productRepo.getByProductType(type, limit);

        List<ProductSummaryDto> productSummaryDtoList =
            productList.stream().map((product -> modelMapper.map(product, ProductSummaryDto.class))).toList();

        for (ProductSummaryDto p : productSummaryDtoList) {
            p.setImage(ProductUtils.getFirstImageUrl(p.getImage()));
        }

        return productSummaryDtoList;
    }

    @Override
    public List<ProductSummaryDto> getTopSellerByType(String type, Integer limit) {
        List<Product> productList = productRepo.getTopSellerByType(type, limit);
        List<ProductSummaryDto> productSummaryDtoList = productList.stream().map((
            product -> modelMapper.map(product, ProductSummaryDto.class)
        )).toList();
        for (ProductSummaryDto productSummaryDto : productSummaryDtoList) {
            productSummaryDto.setImage(ProductUtils.getFirstImageUrl(productSummaryDto.getImage()));
        }
        return productSummaryDtoList;
    }

    @Override
    public Pagination getByProductTypeWithPaging(String type, Integer page) {
        Pageable pageable = PageRequest.of((int) (page - 1), Pagination.PAGE_SIZE);

        ProductSpecification<Product> searchSpecification = new ProductSpecification<Product>();

        Specification<Product> spec = searchSpecification.searchByType(type);

        Page<Product> productList = productRepo.findAll(spec, pageable);

        Pagination pagination = Pagination.builder()
            .totalPageNumber(productList.getTotalPages())
            .totalElement(productList.getTotalElements())
            .elementPerPage(Pagination.PAGE_SIZE)
            .productSummaryDtoList(
                productList.stream().map((product
                        -> modelMapper.map(product, ProductSummaryDto.class)))
                    .toList())
            .build();

        for (ProductSummaryDto p : pagination.getProductSummaryDtoList()) {
            p.setImage(p.getImage().split("\\|")[0]);
        }

        return pagination;
    }

    @Transactional
    @Override
    public Optional<Object> getByProductTypeAndByName(String type, String name) {
        String outputString = name.replace("-", " ");

        Product product = productRepo.getByProductTypeAndByName(type, outputString);

        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);

        PurchaseComboItem purchaseComboItem = new PurchaseComboItem();
        try {
            purchaseComboItem.setProductList(
                List.of(
                    productRepo.findMostPurchaseMouse(),
                    productRepo.findMostPurchaseKeyboard(),
                    productRepo.findMostPurchaseHeadphone()
                )
            );
            productDto.setPurchaseComboItem(purchaseComboItem);
        } catch (IllegalAccessError e) {
            System.err.println("Purchase Combo Item Is Null!");
            purchaseComboItem.setProductList(new ArrayList<>());
        }

        Blog blog = product.getBlog();
        String BlogImageStr = blog.getImage();
        String BlogContentStr = blog.getContent();
        BlogDto blogDto = new BlogDto();
        BeanUtils.copyProperties(blog, blogDto);

        Optional<Stock> stock = stockRepo.findByProductId(product.getId());
        List<Integer> colorIdList = new ArrayList<>();
        for (Color c : product.getColorList()) {
            colorIdList.add(c.getId());
        }
        StockDto stockDto = StockDto.builder()
            .productId(product.getId())
            .colorIdList(colorIdList)
            .sold(stock.get().getSold())
            .quantity(stock.get().getQuantity())
            .build();

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
            productDto.setStock(stockDto);
        }
        return Optional.of(productDto);
    }

    @Override
    public List<Product> getByName(Specification<Product> spec, String name) {
        return productRepo.findAll(nameLike(name));
    }

    @Override
    public Specification<Product> nameLike(String name) {
        return (root, query, criteriaBuilder)
            -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}
