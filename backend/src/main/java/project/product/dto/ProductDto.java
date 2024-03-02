package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.product.entity.Product;
import project.product.entity.ProductDetail;
import project.product.entity.PurchaseComboItem;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private long id;
    private String producer;
    private String model;
    private String name;
    private String type;
    @JsonIgnoreProperties({"id", "product"})
    private ProductDetail productDetail;
    private Long price;
    private List<String> imageList;
    private byte discountPercentage;
    private BlogDto blog;
    private PurchaseComboItem purchaseComboItem;
    private List<SimilarProductDto> similarProductList;
    private StockDto stock;
    private List<String> configurationList;
}
