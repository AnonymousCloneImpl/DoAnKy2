package project.product.dto;

import lombok.*;
import project.other_entity.Color;
import project.product.entity.Blog;
import project.product.entity.PurchaseComboItem;

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
    private String productDetail;
    private Long price;
    private List<String> imageList;
    private byte discountPercentage;
    private List<Color> colorList;
    private BlogDto blog;
    private List<PurchaseComboItem> purchaseComboItemList;
}
