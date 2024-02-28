package project.product.service;


import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.product.dto.BlogDto;
import project.product.dto.ProductDto;
import project.product.dto.StockDto;
import project.product.entity.*;
import project.product.repository.BlogRepository;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;
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
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    public List<ProductSummaryDto> getByProductType(String type, Long limit) {
        List<Product> productList = productRepo.getByProductType(type, limit);

        List<ProductSummaryDto> productSummaryDtoList = productList.stream()
            .map(product -> modelMapper.map(product, ProductSummaryDto.class))
            .toList();

        for (ProductSummaryDto p : productSummaryDtoList) {
            p.setImage(p.getImage().split("\\|")[0]);
        }

        return productSummaryDtoList;
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
        similarProductList = productRepo.findTop10SimilarByType(product.getType(), product.getId(), PageRequest.of(0, 10));
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
    public Optional<Product> getById(long id) {
        return productRepo.findById(id);
    }

    @Override
    public List<Product> getByName(Specification<Product> spec, String name) {
        return productRepo.findAll(nameLike(name));
    }

    @Override
    public boolean existById(long id) {
        return productRepo.existsById(id);
    }

    @Override
    public void deleteById(long id) {
        productRepo.deleteById(id);
    }

    @Override
    public Product insert(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        return productRepo.save(product);
    }

    @Override
    public Product updateById(Long id, ProductDto productDto) {
        Product product = productRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));

        modelMapper.map(productDto, product);
        return productRepo.save(product);
    }

    @Override
    public Specification<Product> nameLike(String name) {
        return (root, query, criteriaBuilder)
            -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}
